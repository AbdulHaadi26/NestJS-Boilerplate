import {
  SQSClient,
  SendMessageBatchCommand,
  SendMessageCommand,
} from "@aws-sdk/client-sqs";
import { Injectable } from "@nestjs/common";
import { v4 as uuidv4 } from "uuid";
import { SQSEventType, SQSParamType, SQSRecordTyoe } from "../types";

@Injectable()
export class QueueService {
  private sqsClient: SQSClient;
  constructor() {
    this.sqsClient = new SQSClient({
      region: process.env.AWS_REGION,
    });
  }

  public async send(type: SQSEventType, param: SQSParamType) {
    try {
      const { id, tenantId } = param;
      const params = {
        DelaySeconds: 0,
        MessageAttributes: {
          refId: {
            DataType: "String",
            StringValue: `${id}`,
          },
          tenantId: {
            DataType: "String",
            StringValue: `${tenantId}`,
          },
        },
        MessageBody: type,
        QueueUrl: process.env.QUEUE_URL,
      };

      console.log("Sending message");

      const command = new SendMessageCommand(params);
      const result = await this.sqsClient.send(command);
      console.log(JSON.stringify(result), "result");

      console.log(`Message sent:`, result.MessageId);
    } catch (error) {
      console.log(error);
    }
  }

  public async sendBatch(type: SQSEventType, arr: SQSParamType[]) {
    try {
      const enteries = [];

      arr.forEach((data) => {
        let messageAttributes: any = {
          refId: {
            DataType: "Number",
            StringValue: `${data.id}`,
          },
          tenantId: {
            DataType: "String",
            StringValue: `${data.tenantId}`,
          },
        };

        enteries.push({
          Id: uuidv4(),
          DelaySeconds: 0,
          MessageAttributes: messageAttributes,
          MessageBody: type,
        });
      });

      const input = {
        Entries: enteries,
        QueueUrl: process.env.QUEUE_URL,
      };

      console.log("BATCH");
      console.log(input);

      const command = new SendMessageBatchCommand(input);
      const result = await this.sqsClient.send(command);
      console.log(JSON.stringify(result), "result");
    } catch (error) {
      console.error("Error sending batch message:", error);
    }
  }

  async process(record: SQSRecordTyoe): Promise<void> {
    try {
      console.log(record, "Process Message Record");
      const event = record.body;
      const tenantId = record?.messageAttributes?.tenantId?.stringValue;
      const dataRefId = record?.messageAttributes?.refId?.stringValue;

      // Perform actions based on event type
    } catch (error) {
      console.error("Error processing message:", error);
    }
  }
}
