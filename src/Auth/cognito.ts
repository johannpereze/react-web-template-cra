import { CognitoUserPool } from "amazon-cognito-identity-js";

export interface CognitoSignUpResponse {
  user: User;
  userConfirmed: boolean;
  userSub: string;
  codeDeliveryDetails: CodeDeliveryDetails;
}

export interface CodeDeliveryDetails {
  AttributeName: string;
  DeliveryMedium: string;
  Destination: string;
}

export interface User {
  username: string;
  pool: Pool;
  Session: null;
  client: Client;
  signInUserSession: null;
  authenticationFlowType: string;
  storage: Storage;
  keyPrefix: string;
  userDataKey: string;
}

export interface Client {
  endpoint: string;
  fetchOptions: FetchOptions;
}

export interface FetchOptions {}

export interface Pool {
  userPoolId: string;
  clientId: string;
  client: Client;
  advancedSecurityDataCollectionFlag: boolean;
  storage: Storage;
}

export interface Storage {
  "persist:root": string;
  i18nextLng: string;
}

const POOL_DATA = {
  UserPoolId: "us-east-1_CLjwXgfXu",
  ClientId: "7dm1bavsf21h3nl07do5c9ho8o",
};

const userPool = new CognitoUserPool(POOL_DATA);

export default userPool;
