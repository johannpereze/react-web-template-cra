import { CognitoUserPool } from "amazon-cognito-identity-js";

const POOL_DATA = {
  UserPoolId: "us-east-1_CLjwXgfXu",
  ClientId: "7dm1bavsf21h3nl07do5c9ho8o",
};

const userPool = new CognitoUserPool(POOL_DATA);

export default userPool;
