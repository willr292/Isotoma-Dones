import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { AmplifyConfig } from "@aws-amplify/core/lib-esm/types";
import Amplify, { Auth } from "aws-amplify";
import { AuthOptions, createAuthLink } from "aws-appsync-auth-link";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
require("dotenv").config();

const url = process.env.REACT_APP_APPSYNC_URL!;
const region = "eu-west-2";
const amplifyConfig: AmplifyConfig = {
  Auth: {
    region: region,
    userPoolId: process.env.REACT_APP_USERPOOL_ID!,
    userPoolWebClientId: process.env.REACT_APP_USERPOOL_CLIENT_ID!,
  },
};
Amplify.configure(amplifyConfig);
Auth.configure();

const auth: AuthOptions = {
  type: "AMAZON_COGNITO_USER_POOLS",
  jwtToken: async () => {
    try {
      return (await Auth.currentSession()).getIdToken().getJwtToken();
    } catch (e) {
      console.error(e);
      return "";
    }
  },
};
const link = ApolloLink.from([
  createAuthLink({ url, region, auth }),
  createHttpLink({ uri: url }),
]);
const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Router>
        <App />
      </Router>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
