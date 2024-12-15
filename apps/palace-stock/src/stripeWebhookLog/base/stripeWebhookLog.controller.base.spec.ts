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
import { StripeWebhookLogController } from "../stripeWebhookLog.controller";
import { StripeWebhookLogService } from "../stripeWebhookLog.service";

const nonExistingId = "nonExistingId";
const existingId = "existingId";
const CREATE_INPUT = {
  eventId: "exampleEventId",
  eventStatus: "exampleEventStatus",
  eventType: "exampleEventType",
  fechaRegistro: new Date(),
  id: 42,
  paymentIntentId: "examplePaymentIntentId",
  response: "exampleResponse",
};
const CREATE_RESULT = {
  eventId: "exampleEventId",
  eventStatus: "exampleEventStatus",
  eventType: "exampleEventType",
  fechaRegistro: new Date(),
  id: 42,
  paymentIntentId: "examplePaymentIntentId",
  response: "exampleResponse",
};
const FIND_MANY_RESULT = [
  {
    eventId: "exampleEventId",
    eventStatus: "exampleEventStatus",
    eventType: "exampleEventType",
    fechaRegistro: new Date(),
    id: 42,
    paymentIntentId: "examplePaymentIntentId",
    response: "exampleResponse",
  },
];
const FIND_ONE_RESULT = {
  eventId: "exampleEventId",
  eventStatus: "exampleEventStatus",
  eventType: "exampleEventType",
  fechaRegistro: new Date(),
  id: 42,
  paymentIntentId: "examplePaymentIntentId",
  response: "exampleResponse",
};

const service = {
  createStripeWebhookLog() {
    return CREATE_RESULT;
  },
  stripeWebhookLogs: () => FIND_MANY_RESULT,
  stripeWebhookLog: ({ where }: { where: { id: string } }) => {
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

describe("StripeWebhookLog", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: StripeWebhookLogService,
          useValue: service,
        },
      ],
      controllers: [StripeWebhookLogController],
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

  test("POST /stripeWebhookLogs", async () => {
    await request(app.getHttpServer())
      .post("/stripeWebhookLogs")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        fechaRegistro: CREATE_RESULT.fechaRegistro.toISOString(),
      });
  });

  test("GET /stripeWebhookLogs", async () => {
    await request(app.getHttpServer())
      .get("/stripeWebhookLogs")
      .expect(HttpStatus.OK)
      .expect([
        {
          ...FIND_MANY_RESULT[0],
          fechaRegistro: FIND_MANY_RESULT[0].fechaRegistro.toISOString(),
        },
      ]);
  });

  test("GET /stripeWebhookLogs/:id non existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/stripeWebhookLogs"}/${nonExistingId}`)
      .expect(HttpStatus.NOT_FOUND)
      .expect({
        statusCode: HttpStatus.NOT_FOUND,
        message: `No resource was found for {"${"id"}":"${nonExistingId}"}`,
        error: "Not Found",
      });
  });

  test("GET /stripeWebhookLogs/:id existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/stripeWebhookLogs"}/${existingId}`)
      .expect(HttpStatus.OK)
      .expect({
        ...FIND_ONE_RESULT,
        fechaRegistro: FIND_ONE_RESULT.fechaRegistro.toISOString(),
      });
  });

  test("POST /stripeWebhookLogs existing resource", async () => {
    const agent = request(app.getHttpServer());
    await agent
      .post("/stripeWebhookLogs")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        fechaRegistro: CREATE_RESULT.fechaRegistro.toISOString(),
      })
      .then(function () {
        agent
          .post("/stripeWebhookLogs")
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
