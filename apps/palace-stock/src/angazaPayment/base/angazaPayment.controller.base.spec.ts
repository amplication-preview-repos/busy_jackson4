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
import { AngazaPaymentController } from "../angazaPayment.controller";
import { AngazaPaymentService } from "../angazaPayment.service";

const nonExistingId = "nonExistingId";
const existingId = "existingId";
const CREATE_INPUT = {
  accountNumber: "exampleAccountNumber",
  accountQid: "exampleAccountQid",
  amount: "exampleAmount",
  angazaTransactionQid: "exampleAngazaTransactionQid",
  currency: "exampleCurrency",
  effectiveDate: new Date(),
  externalXref: "exampleExternalXref",
  fechaRegistro: new Date(),
  id: 42,
  isReversed: "exampleIsReversed",
  msisdn: "exampleMsisdn",
  payQid: "examplePayQid",
  uuidIdentifier: "exampleUuidIdentifier",
};
const CREATE_RESULT = {
  accountNumber: "exampleAccountNumber",
  accountQid: "exampleAccountQid",
  amount: "exampleAmount",
  angazaTransactionQid: "exampleAngazaTransactionQid",
  currency: "exampleCurrency",
  effectiveDate: new Date(),
  externalXref: "exampleExternalXref",
  fechaRegistro: new Date(),
  id: 42,
  isReversed: "exampleIsReversed",
  msisdn: "exampleMsisdn",
  payQid: "examplePayQid",
  uuidIdentifier: "exampleUuidIdentifier",
};
const FIND_MANY_RESULT = [
  {
    accountNumber: "exampleAccountNumber",
    accountQid: "exampleAccountQid",
    amount: "exampleAmount",
    angazaTransactionQid: "exampleAngazaTransactionQid",
    currency: "exampleCurrency",
    effectiveDate: new Date(),
    externalXref: "exampleExternalXref",
    fechaRegistro: new Date(),
    id: 42,
    isReversed: "exampleIsReversed",
    msisdn: "exampleMsisdn",
    payQid: "examplePayQid",
    uuidIdentifier: "exampleUuidIdentifier",
  },
];
const FIND_ONE_RESULT = {
  accountNumber: "exampleAccountNumber",
  accountQid: "exampleAccountQid",
  amount: "exampleAmount",
  angazaTransactionQid: "exampleAngazaTransactionQid",
  currency: "exampleCurrency",
  effectiveDate: new Date(),
  externalXref: "exampleExternalXref",
  fechaRegistro: new Date(),
  id: 42,
  isReversed: "exampleIsReversed",
  msisdn: "exampleMsisdn",
  payQid: "examplePayQid",
  uuidIdentifier: "exampleUuidIdentifier",
};

const service = {
  createAngazaPayment() {
    return CREATE_RESULT;
  },
  angazaPayments: () => FIND_MANY_RESULT,
  angazaPayment: ({ where }: { where: { id: string } }) => {
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

describe("AngazaPayment", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: AngazaPaymentService,
          useValue: service,
        },
      ],
      controllers: [AngazaPaymentController],
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

  test("POST /angazaPayments", async () => {
    await request(app.getHttpServer())
      .post("/angazaPayments")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        effectiveDate: CREATE_RESULT.effectiveDate.toISOString(),
        fechaRegistro: CREATE_RESULT.fechaRegistro.toISOString(),
      });
  });

  test("GET /angazaPayments", async () => {
    await request(app.getHttpServer())
      .get("/angazaPayments")
      .expect(HttpStatus.OK)
      .expect([
        {
          ...FIND_MANY_RESULT[0],
          effectiveDate: FIND_MANY_RESULT[0].effectiveDate.toISOString(),
          fechaRegistro: FIND_MANY_RESULT[0].fechaRegistro.toISOString(),
        },
      ]);
  });

  test("GET /angazaPayments/:id non existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/angazaPayments"}/${nonExistingId}`)
      .expect(HttpStatus.NOT_FOUND)
      .expect({
        statusCode: HttpStatus.NOT_FOUND,
        message: `No resource was found for {"${"id"}":"${nonExistingId}"}`,
        error: "Not Found",
      });
  });

  test("GET /angazaPayments/:id existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/angazaPayments"}/${existingId}`)
      .expect(HttpStatus.OK)
      .expect({
        ...FIND_ONE_RESULT,
        effectiveDate: FIND_ONE_RESULT.effectiveDate.toISOString(),
        fechaRegistro: FIND_ONE_RESULT.fechaRegistro.toISOString(),
      });
  });

  test("POST /angazaPayments existing resource", async () => {
    const agent = request(app.getHttpServer());
    await agent
      .post("/angazaPayments")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        effectiveDate: CREATE_RESULT.effectiveDate.toISOString(),
        fechaRegistro: CREATE_RESULT.fechaRegistro.toISOString(),
      })
      .then(function () {
        agent
          .post("/angazaPayments")
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
