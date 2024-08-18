import {
  AdminAddUserToGroupCommandInput,
  AdminCreateUserCommandInput,
  CognitoIdentityProvider,
} from "@aws-sdk/client-cognito-identity-provider";
import { Injectable } from "@nestjs/common";

@Injectable()
export class CognitoService {
  private cognitoClient: CognitoIdentityProvider;
  constructor() {}

  public async createCognitoUser(
    username: string,
    email: string,
    userType: number,
    tenantId: string
  ) {
    try {
      let userData: AdminCreateUserCommandInput = {
        UserPoolId: process.env.COGNITO_USER_POOL_ID,
        Username: username,
        UserAttributes: [
          {
            Name: "email",
            Value: email,
          },
          {
            Name: "custom:tenantId",
            Value: tenantId,
          },
          {
            Name: "custom:userRole",
            Value: "TenantUser",
          },
          {
            Name: "email_verified",
            Value: "true",
          },
        ],
        DesiredDeliveryMediums: ["EMAIL"],
      };

      await this.cognitoClient.adminCreateUser(userData);

      const addToGroupData: AdminAddUserToGroupCommandInput = {
        UserPoolId: process.env.COGNITO_USER_POOL_ID,
        Username: username,
        GroupName: tenantId,
      };

      await this.cognitoClient.adminAddUserToGroup(addToGroupData);

      return;
    } catch (error) {
      console.log(error);
      throw new Error(`Cognito user creation failed: ${error.message}`);
    }
  }
}
