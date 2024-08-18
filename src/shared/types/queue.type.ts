enum SQSEventType {
  EMPLOYEE_ANALYTICS = "EMPLOYEE_ANALYTICS",
}

type SQSParamType = {
  id: number;
  tenantId: string;
};

type SQSRecordTyoe = {
  body: string;
  messageAttributes: {
    refId: {
      stringValue: string;
    };
    tenantId: {
      stringValue: string;
    };
  };
};

export { SQSEventType, SQSParamType, SQSRecordTyoe };
