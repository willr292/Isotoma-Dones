import * as AWS from "aws-sdk";

async function createUser(user: UserCreateInput) {
  var params = {
    UserPoolId: "eu-west-2_1jdqlNjvz",
    Username: user.username,
    ForceAliasCreation: false,
    TemporaryPassword: user.password,
    DesiredDeliveryMediums: ["EMAIL"],
    MessageAction: "RESEND",
    UserAttributes: [
      {
        Name: "email",
        Value: user.email,
      },
      {
        Name: "email_verified",
        Value: "true",
      },
    ],
  };
  console.log(params);
  const cognitoidentityserviceprovider =
    new AWS.CognitoIdentityServiceProvider();
  try {
    const data = await cognitoidentityserviceprovider
      .adminCreateUser(params)
      .promise();
    console.log(data);
    if (user.admin) {
      var adminParams = {
        GroupName: "admin",
        UserPoolId: "eu-west-2_1jdqlNjvz",
        Username: user.username,
      };
      await cognitoidentityserviceprovider
        .adminAddUserToGroup(adminParams)
        .promise();
    }
    return "Success";
  } catch (error) {
    console.log(error);
    throw new Error("User was not created");
  }
}

export default createUser;
