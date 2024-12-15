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
import { PaycodeApiLogController } from "../paycodeApiLog.controller";
import { PaycodeApiLogService } from "../paycodeApiLog.service";

const nonExistingId = "nonExistingId";
const existingId = "existingId";
const CREATE_INPUT = {
  callDate: new Date(),
  calledMethod: "exampleCalledMethod",
  callTime: new Date(),
  calltrace: "exampleCalltrace",
  dataSend: "exampleDataSend",
  headers: "exampleHeaders",
  id: 42,
  response: "exampleResponse",
  responseDatetime: new Date(),
  url: "exampleUrl",
};
const CREATE_RESULT = {
  callDate: new Date(),
  calledMethod: "exampleCalledMethod",
  callTime: new Date(),
  calltrace: "exampleCalltrace",
  dataSend: "exampleDataSend",
  headers: "exampleHeaders",
  id: 42,
  response: "exampleResponse",
  responseDatetime: new Date(),
  url: "exampleUrl",
};
const FIND_MANY_RESULT = [
  {
    callDate: new Date(),
    calledMethod: "exampleCalledMethod",
    callTime: new Date(),
    calltrace: "exampleCalltrace",
    dataSend: "exampleDataSend",
    headers: "exampleHeaders",
    id: 42,
    response: "exampleResponse",
    responseDatetime: new Date(),
    url: "exampleUrl",
  },
];
const FIND_ONE_RESULT = {
  callDate: new Date(),
  calledMethod: "exampleCalledMethod",
  callTime: new Date(),
  calltrace: "exampleCalltrace",
  dataSend: "exampleDataSend",
  headers: "exampleHeaders",
  id: 42,
  response: "exampleResponse",
  responseDatetime: new Date(),
  url: "exampleUrl",
};

const service = {
  createPaycodeApiLog() {
    return CREATE_RESULT;
  },
  paycodeApiLogs: () => FIND_MANY_RESULT,
  paycodeApiLog: ({ where }: { where: { id: string } }) => {
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

describe("PaycodeApiLog", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: PaycodeApiLogService,
          useValue: service,
        },
      ],
      controllers: [PaycodeApiLogController],
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

  test("POST /paycodeApiLogs", async () => {
    await request(app.getHttpServer())
      .post("/paycodeApiLogs")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        callDate: CREATE_RESULT.callDate.toISOString(),
        callTime: CREATE_RESULT.callTime.toISOString(),
        responseDatetime: CREATE_RESULT.responseDatetime.toISOString(),
      });
  });

  test("GET /paycodeApiLogs", async () => {
    await request(app.getHttpServer())
      .get("/paycodeApiLogs")
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

  test("GET /paycodeApiLogs/:id non existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/paycodeApiLogs"}/${nonExistingId}`)
      .expect(HttpStatus.NOT_FOUND)
      .expect({
        statusCode: HttpStatus.NOT_FOUND,
        message: `No resource was found for {"${"id"}":"${nonExistingId}"}`,
        error: "Not Found",
      });
  });

  test("GET /paycodeApiLogs/:id existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/paycodeApiLogs"}/${existingId}`)
      .expect(HttpStatus.OK)
      .expect({
        ...FIND_ONE_RESULT,
        callDate: FIND_ONE_RESULT.callDate.toISOString(),
        callTime: FIND_ONE_RESULT.callTime.toISOString(),
        responseDatetime: FIND_ONE_RESULT.responseDatetime.toISOString(),
      });
  });

  test("POST /paycodeApiLogs existing resource", async () => {
    const agent = request(app.getHttpServer());
    await agent
      .post("/paycodeApiLogs")
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
          .post("/paycodeApiLogs")
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
