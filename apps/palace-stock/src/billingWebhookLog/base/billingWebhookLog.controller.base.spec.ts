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
import { BillingWebhookLogController } from "../billingWebhookLog.controller";
import { BillingWebhookLogService } from "../billingWebhookLog.service";

const nonExistingId = "nonExistingId";
const existingId = "existingId";
const CREATE_INPUT = {
  fechaRegistro: new Date(),
  id: 42,
  referenceId: "exampleReferenceId",
  response: "exampleResponse",
};
const CREATE_RESULT = {
  fechaRegistro: new Date(),
  id: 42,
  referenceId: "exampleReferenceId",
  response: "exampleResponse",
};
const FIND_MANY_RESULT = [
  {
    fechaRegistro: new Date(),
    id: 42,
    referenceId: "exampleReferenceId",
    response: "exampleResponse",
  },
];
const FIND_ONE_RESULT = {
  fechaRegistro: new Date(),
  id: 42,
  referenceId: "exampleReferenceId",
  response: "exampleResponse",
};

const service = {
  createBillingWebhookLog() {
    return CREATE_RESULT;
  },
  billingWebhookLogs: () => FIND_MANY_RESULT,
  billingWebhookLog: ({ where }: { where: { id: string } }) => {
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

describe("BillingWebhookLog", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: BillingWebhookLogService,
          useValue: service,
        },
      ],
      controllers: [BillingWebhookLogController],
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

  test("POST /billingWebhookLogs", async () => {
    await request(app.getHttpServer())
      .post("/billingWebhookLogs")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        fechaRegistro: CREATE_RESULT.fechaRegistro.toISOString(),
      });
  });

  test("GET /billingWebhookLogs", async () => {
    await request(app.getHttpServer())
      .get("/billingWebhookLogs")
      .expect(HttpStatus.OK)
      .expect([
        {
          ...FIND_MANY_RESULT[0],
          fechaRegistro: FIND_MANY_RESULT[0].fechaRegistro.toISOString(),
        },
      ]);
  });

  test("GET /billingWebhookLogs/:id non existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/billingWebhookLogs"}/${nonExistingId}`)
      .expect(HttpStatus.NOT_FOUND)
      .expect({
        statusCode: HttpStatus.NOT_FOUND,
        message: `No resource was found for {"${"id"}":"${nonExistingId}"}`,
        error: "Not Found",
      });
  });

  test("GET /billingWebhookLogs/:id existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/billingWebhookLogs"}/${existingId}`)
      .expect(HttpStatus.OK)
      .expect({
        ...FIND_ONE_RESULT,
        fechaRegistro: FIND_ONE_RESULT.fechaRegistro.toISOString(),
      });
  });

  test("POST /billingWebhookLogs existing resource", async () => {
    const agent = request(app.getHttpServer());
    await agent
      .post("/billingWebhookLogs")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        fechaRegistro: CREATE_RESULT.fechaRegistro.toISOString(),
      })
      .then(function () {
        agent
          .post("/billingWebhookLogs")
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
