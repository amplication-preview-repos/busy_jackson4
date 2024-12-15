import { Test } from "@nestjs/testing";
import {
  INestApplication,
  HttpStatus,
  ExecutionContext,
  CallHandler,
} from "@nestjs/common";
import request from "supertest";
import { ACGuard } from "nest-access-control";
import { DefaultAuthGuard } from "../../auth/defaultAuth.guard";
import { ACLModule } from "../../auth/acl.module";
import { AclFilterResponseInterceptor } from "../../interceptors/aclFilterResponse.interceptor";
import { AclValidateRequestInterceptor } from "../../interceptors/aclValidateRequest.interceptor";
import { map } from "rxjs";
import { BillingApiLogController } from "../billingApiLog.controller";
import { BillingApiLogService } from "../billingApiLog.service";

const nonExistingId = "nonExistingId";
const existingId = "existingId";
const CREATE_INPUT = {
  billingId: 42,
  callDate: new Date(),
  calledMethod: "exampleCalledMethod",
  callTime: new Date(),
  calltrace: "exampleCalltrace",
  complementId: 42,
  dataSend: "exampleDataSend",
  headers: "exampleHeaders",
  id: 42,
  referenceId: "exampleReferenceId",
  response: "exampleResponse",
  responseDatetime: new Date(),
  url: "exampleUrl",
};
const CREATE_RESULT = {
  billingId: 42,
  callDate: new Date(),
  calledMethod: "exampleCalledMethod",
  callTime: new Date(),
  calltrace: "exampleCalltrace",
  complementId: 42,
  dataSend: "exampleDataSend",
  headers: "exampleHeaders",
  id: 42,
  referenceId: "exampleReferenceId",
  response: "exampleResponse",
  responseDatetime: new Date(),
  url: "exampleUrl",
};
const FIND_MANY_RESULT = [
  {
    billingId: 42,
    callDate: new Date(),
    calledMethod: "exampleCalledMethod",
    callTime: new Date(),
    calltrace: "exampleCalltrace",
    complementId: 42,
    dataSend: "exampleDataSend",
    headers: "exampleHeaders",
    id: 42,
    referenceId: "exampleReferenceId",
    response: "exampleResponse",
    responseDatetime: new Date(),
    url: "exampleUrl",
  },
];
const FIND_ONE_RESULT = {
  billingId: 42,
  callDate: new Date(),
  calledMethod: "exampleCalledMethod",
  callTime: new Date(),
  calltrace: "exampleCalltrace",
  complementId: 42,
  dataSend: "exampleDataSend",
  headers: "exampleHeaders",
  id: 42,
  referenceId: "exampleReferenceId",
  response: "exampleResponse",
  responseDatetime: new Date(),
  url: "exampleUrl",
};

const service = {
  createBillingApiLog() {
    return CREATE_RESULT;
  },
  billingApiLogs: () => FIND_MANY_RESULT,
  billingApiLog: ({ where }: { where: { id: string } }) => {
    switch (where.id) {
      case existingId:
        return FIND_ONE_RESULT;
      case nonExistingId:
        return null;
    }
  },
};

const basicAuthGuard = {
  canActivate: (context: ExecutionContext) => {
    const argumentHost = context.switchToHttp();
    const request = argumentHost.getRequest();
    request.user = {
      roles: ["user"],
    };
    return true;
  },
};

const acGuard = {
  canActivate: () => {
    return true;
  },
};

const aclFilterResponseInterceptor = {
  intercept: (context: ExecutionContext, next: CallHandler) => {
    return next.handle().pipe(
      map((data) => {
        return data;
      })
    );
  },
};
const aclValidateRequestInterceptor = {
  intercept: (context: ExecutionContext, next: CallHandler) => {
    return next.handle();
  },
};

describe("BillingApiLog", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: BillingApiLogService,
          useValue: service,
        },
      ],
      controllers: [BillingApiLogController],
      imports: [ACLModule],
    })
      .overrideGuard(DefaultAuthGuard)
      .useValue(basicAuthGuard)
      .overrideGuard(ACGuard)
      .useValue(acGuard)
      .overrideInterceptor(AclFilterResponseInterceptor)
      .useValue(aclFilterResponseInterceptor)
      .overrideInterceptor(AclValidateRequestInterceptor)
      .useValue(aclValidateRequestInterceptor)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  test("POST /billingApiLogs", async () => {
    await request(app.getHttpServer())
      .post("/billingApiLogs")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        callDate: CREATE_RESULT.callDate.toISOString(),
        callTime: CREATE_RESULT.callTime.toISOString(),
        responseDatetime: CREATE_RESULT.responseDatetime.toISOString(),
      });
  });

  test("GET /billingApiLogs", async () => {
    await request(app.getHttpServer())
      .get("/billingApiLogs")
      .expect(HttpStatus.OK)
      .expect([
        {
          ...FIND_MANY_RESULT[0],
          callDate: FIND_MANY_RESULT[0].callDate.toISOString(),
          callTime: FIND_MANY_RESULT[0].callTime.toISOString(),
          responseDatetime: FIND_MANY_RESULT[0].responseDatetime.toISOString(),
        },
      ]);
  });

  test("GET /billingApiLogs/:id non existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/billingApiLogs"}/${nonExistingId}`)
      .expect(HttpStatus.NOT_FOUND)
      .expect({
        statusCode: HttpStatus.NOT_FOUND,
        message: `No resource was found for {"${"id"}":"${nonExistingId}"}`,
        error: "Not Found",
      });
  });

  test("GET /billingApiLogs/:id existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/billingApiLogs"}/${existingId}`)
      .expect(HttpStatus.OK)
      .expect({
        ...FIND_ONE_RESULT,
        callDate: FIND_ONE_RESULT.callDate.toISOString(),
        callTime: FIND_ONE_RESULT.callTime.toISOString(),
        responseDatetime: FIND_ONE_RESULT.responseDatetime.toISOString(),
      });
  });

  test("POST /billingApiLogs existing resource", async () => {
    const agent = request(app.getHttpServer());
    await agent
      .post("/billingApiLogs")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        callDate: CREATE_RESULT.callDate.toISOString(),
        callTime: CREATE_RESULT.callTime.toISOString(),
        responseDatetime: CREATE_RESULT.responseDatetime.toISOString(),
      })
      .then(function () {
        agent
          .post("/billingApiLogs")
          .send(CREATE_INPUT)
          .expect(HttpStatus.CONFLICT)
          .expect({
            statusCode: HttpStatus.CONFLICT,
          });
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
