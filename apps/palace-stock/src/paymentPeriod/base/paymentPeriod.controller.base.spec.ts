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
import { PaymentPeriodController } from "../paymentPeriod.controller";
import { PaymentPeriodService } from "../paymentPeriod.service";

const nonExistingId = "nonExistingId";
const existingId = "existingId";
const CREATE_INPUT = {
  id: 42,
  interesAnualGeneral: 42,
  meses: 42,
  plazo: 42,
  rangoFinal: 42.424242424,
  rangoInicial: 42.424242424,
};
const CREATE_RESULT = {
  id: 42,
  interesAnualGeneral: 42,
  meses: 42,
  plazo: 42,
  rangoFinal: 42.424242424,
  rangoInicial: 42.424242424,
};
const FIND_MANY_RESULT = [
  {
    id: 42,
    interesAnualGeneral: 42,
    meses: 42,
    plazo: 42,
    rangoFinal: 42.424242424,
    rangoInicial: 42.424242424,
  },
];
const FIND_ONE_RESULT = {
  id: 42,
  interesAnualGeneral: 42,
  meses: 42,
  plazo: 42,
  rangoFinal: 42.424242424,
  rangoInicial: 42.424242424,
};

const service = {
  createPaymentPeriod() {
    return CREATE_RESULT;
  },
  paymentPeriods: () => FIND_MANY_RESULT,
  paymentPeriod: ({ where }: { where: { id: string } }) => {
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

describe("PaymentPeriod", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: PaymentPeriodService,
          useValue: service,
        },
      ],
      controllers: [PaymentPeriodController],
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

  test("POST /paymentPeriods", async () => {
    await request(app.getHttpServer())
      .post("/paymentPeriods")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect(CREATE_RESULT);
  });

  test("GET /paymentPeriods", async () => {
    await request(app.getHttpServer())
      .get("/paymentPeriods")
      .expect(HttpStatus.OK)
      .expect([FIND_MANY_RESULT[0]]);
  });

  test("GET /paymentPeriods/:id non existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/paymentPeriods"}/${nonExistingId}`)
      .expect(HttpStatus.NOT_FOUND)
      .expect({
        statusCode: HttpStatus.NOT_FOUND,
        message: `No resource was found for {"${"id"}":"${nonExistingId}"}`,
        error: "Not Found",
      });
  });

  test("GET /paymentPeriods/:id existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/paymentPeriods"}/${existingId}`)
      .expect(HttpStatus.OK)
      .expect(FIND_ONE_RESULT);
  });

  test("POST /paymentPeriods existing resource", async () => {
    const agent = request(app.getHttpServer());
    await agent
      .post("/paymentPeriods")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect(CREATE_RESULT)
      .then(function () {
        agent
          .post("/paymentPeriods")
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
