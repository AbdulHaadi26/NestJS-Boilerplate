import { InvokeCommand, LambdaClient } from "@aws-sdk/client-lambda";
import { Injectable } from "@nestjs/common";

@Injectable()
export class LambdaService {
  private lambdaClient: LambdaClient;
  constructor() {
    this.lambdaClient = new LambdaClient({ region: process.env.AWS_REGION });
  }

  public async invokeEmailLambdaFunction(dataRefId: string, tenantId: string) {
    try {
      const invokeCommand = new InvokeCommand({
        FunctionName: process.env.LAMBDA_FUNCTION_NAME,
        InvocationType: "Event",
        Payload: JSON.stringify({
          dataRefId,
          tenantId,
        }),
      });

      const data = await this.lambdaClient.send(invokeCommand);
      console.log("Lambda function invoked successfully:", data);
    } catch (error) {
      console.error("Error invoking Lambda function:", error);
    }
  }
}
