import * as appsync from "@aws-cdk/aws-appsync";
import * as cognito from "@aws-cdk/aws-cognito";
import * as ddb from "@aws-cdk/aws-dynamodb";
import * as iam from "@aws-cdk/aws-iam";
import * as lambda from "@aws-cdk/aws-lambda";
import { NodejsFunction } from "@aws-cdk/aws-lambda-nodejs";
import * as cdk from "@aws-cdk/core";
import * as path from "path";

export class AmplifyInfraStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    const userPool = new cognito.UserPool(this, "userpool", {
      userPoolName: "my-user-pool",
      selfSignUpEnabled: false,
      autoVerify: { email: true },
      accountRecovery: cognito.AccountRecovery.EMAIL_ONLY,
      signInAliases: { email: true },
    });

    new cdk.CfnOutput(this, "User Pool", {
      value: userPool.userPoolId,
    });

    const adminGroup = new cognito.CfnUserPoolGroup(this, "AdminGroup", {
      groupName: "admin",
      userPoolId: userPool.userPoolId,
    });

    const userPoolClient = new cognito.UserPoolClient(this, "Client", {
      userPool: userPool,
    });

    new cdk.CfnOutput(this, "User Pool Client Id", {
      value: userPoolClient.userPoolClientId,
    });

    const api = new appsync.GraphqlApi(this, "Api", {
      name: "cdk-notes-appsync-api",
      schema: appsync.Schema.fromAsset("graphql/schema.graphql"),
      authorizationConfig: {
        defaultAuthorization: {
          authorizationType: appsync.AuthorizationType.USER_POOL,
          userPoolConfig: {
            userPool,
          },
        },
      },
      xrayEnabled: true,
    });

    // Prints out the AppSync GraphQL endpoint to the terminal
    new cdk.CfnOutput(this, "GraphQLAPIURL", {
      value: api.graphqlUrl,
    });

    // Prints out the AppSync GraphQL API key to the terminal
    new cdk.CfnOutput(this, "GraphQLAPIKey", {
      value: api.apiKey || "",
    });

    // Prints out the stack region to the terminal
    new cdk.CfnOutput(this, "Stack Region", {
      value: this.region,
    });

    const notesLambda = new NodejsFunction(this, "AppSyncNotesHandler", {
      runtime: lambda.Runtime.NODEJS_12_X,
      handler: "handler",
      //role: adminRole,
      //code: lambda.Code.fromAsset("lambda-fns"),
      entry: path.join(__dirname, `/../lambda-fns/main.js`),
      memorySize: 1024,
    });

    notesLambda.role?.attachInlinePolicy(
      new iam.Policy(this, "userpool-policy", {
        statements: [
          new iam.PolicyStatement({
            actions: [
              "cognito-idp:AdminCreateUser",
              "cognito-idp:AdminAddUserToGroup",
            ],
            resources: [userPool.userPoolArn],
          }),
        ],
      })
    );

    // Set the new Lambda function as a data source for the AppSync API
    const lambdaDs = api.addLambdaDataSource("lambdaDatasource", notesLambda);

    lambdaDs.createResolver({
      typeName: "Query",
      fieldName: "getNoteById",
    });

    lambdaDs.createResolver({
      typeName: "Query",
      fieldName: "listNotes",
    });

    lambdaDs.createResolver({
      typeName: "Query",
      fieldName: "listNotesByDate",
    });

    lambdaDs.createResolver({
      typeName: "Query",
      fieldName: "getCommentsByNoteId",
    });

    lambdaDs.createResolver({
      typeName: "Mutation",
      fieldName: "createNote",
    });

    lambdaDs.createResolver({
      typeName: "Mutation",
      fieldName: "deleteNote",
    });

    lambdaDs.createResolver({
      typeName: "Mutation",
      fieldName: "updateNote",
    });

    lambdaDs.createResolver({
      typeName: "Mutation",
      fieldName: "createUser",
    });

    lambdaDs.createResolver({
      typeName: "Mutation",
      fieldName: "addLike",
    });

    lambdaDs.createResolver({
      typeName: "Mutation",
      fieldName: "addComment",
    });

    const notesTable = new ddb.Table(this, "newCDKNotesTable", {
      billingMode: ddb.BillingMode.PAY_PER_REQUEST,
      partitionKey: {
        name: "pk",
        type: ddb.AttributeType.STRING,
      },
      sortKey: { name: "sk", type: ddb.AttributeType.STRING },
    });
    // enable the Lambda function to access the DynamoDB table (using IAM)
    notesTable.grantFullAccess(notesLambda);

    // Create an environment variable that we will use in the function code
    notesLambda.addEnvironment("NOTES_TABLE", notesTable.tableName);

    notesTable.addGlobalSecondaryIndex({
      indexName: "dateIndex",
      partitionKey: { name: "createdAt", type: ddb.AttributeType.STRING },
      sortKey: { name: "sk", type: ddb.AttributeType.STRING },
      projectionType: ddb.ProjectionType.ALL,
    });
  }
}
