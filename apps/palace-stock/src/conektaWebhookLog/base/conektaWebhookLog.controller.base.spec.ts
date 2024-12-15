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
import { ConektaWebhookLogController } from "../conektaWebhookLog.controller";
import { ConektaWebhookLogService } from "../conektaWebhookLog.service";

const nonExistingId = "nonExistingId";
const existingId = "existingId";
const CREATE_INPUT = {
  createdAt: new Date(),
  eventType: "exampleEventType",
  id: 42,
  idWebhook: "exampleIdWebhook",
  response: "exampleResponse",
};
const CREATE_RESULT = {
  createdAt: new Date(),
  eventType: "exampleEventType",
  id: 42,
  idWebhook: "exampleIdWebhook",
  response: "exampleResponse",
};
const FIND_MANY_RESULT = [
  {
    createdAt: new Date(),
    eventType: "exampleEventType",
    id: 42,
    idWebhook: "exampleIdWebhook",
    response: "exampleResponse",
  },
];
const FIND_ONE_RESULT = {
  createdAt: new Date(),
  eventType: "exampleEventType",
  id: 42,
  idWebhook: "exampleIdWebhook",
  response: "exampleResponse",
};

const service = {
  createConektaWebhookLog() {
    return CREATE_RESULT;
  },
  conektaWebhookLogs: () => FIND_MANY_RESULT,
  conektaWebhookLog: ({ where }: { where: { id: string } }) => {
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

describe("ConektaWebhookLog", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: ConektaWebhookLogService,
          useValue: service,
        },
      ],
      controllers: [ConektaWebhookLogController],
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

  test("POST /conektaWebhookLogs", async () => {
    await request(app.getHttpServer())
      .post("/conektaWebhookLogs")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        createdAt: CREATE_RESULT.createdAt.toISOString(),
      });
  });

  test("GET /conektaWebhookLogs", async () => {
    await request(app.getHttpServer())
      .get("/conektaWebhookLogs")
      .expect(HttpStatus.OK)
      .expect([
        {
          ...FIND_MANY_RESULT[0],
          createdAt: FIND_MANY_RESULT[0].createdAt.toISOString(),
        },
      ]);
  });

  test("GET /conektaWebhookLogs/:id non existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/conektaWebhookLogs"}/${nonExistingId}`)
      .expect(HttpStatus.NOT_FOUND)
      .expect({
        statusCode: HttpStatus.NOT_FOUND,
        message: `No resource was found for {"${"id"}":"${nonExistingId}"}`,
        error: "Not Found",
      });
  });

  test("GET /conektaWebhookLogs/:id existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/conektaWebhookLogs"}/${existingId}`)
      .expect(HttpStatus.OK)
      .expect({
        ...FIND_ONE_RESULT,
        createdAt: FIND_ONE_RESULT.createdAt.toISOString(),
      });
  });

  test("POST /conektaWebhookLogs existing resource", async () => {
    const agent = request(app.getHttpServer());
    await agent
      .post("/conektaWebhookLogs")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        createdAt: CREATE_RESULT.createdAt.toISOString(),
      })
      .then(function () {
        agent
          .post("/conektaWebhookLogs")
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
