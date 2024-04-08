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
import { AngazaAccountController } from "../angazaAccount.controller";
import { AngazaAccountService } from "../angazaAccount.service";

const nonExistingId = "nonExistingId";
const existingId = "existingId";
const CREATE_INPUT = {
  billingModel: "exampleBillingModel",
  clientQids: "exampleClientQids",
  cumulativeDaysDisabled: 42,
  currency: "exampleCurrency",
  downPayment: "exampleDownPayment",
  downPaymentDaysIncluded: "exampleDownPaymentDaysIncluded",
  fechaRegistro: new Date(),
  fullPrice: "exampleFullPrice",
  id: 42,
  latestPaymentWhen: "exampleLatestPaymentWhen",
  minimumPayment: "exampleMinimumPayment",
  paymentAmountPerPeriod: "examplePaymentAmountPerPeriod",
  paymentDueDate: new Date(),
  paymentPeriodInDays: "examplePaymentPeriodInDays",
  qid: "exampleQid",
  registrationDate: new Date(),
  status: "exampleStatus",
  totalPaid: "exampleTotalPaid",
  unitNumber: 42,
  uuidIdentifier: "exampleUuidIdentifier",
};
const CREATE_RESULT = {
  billingModel: "exampleBillingModel",
  clientQids: "exampleClientQids",
  cumulativeDaysDisabled: 42,
  currency: "exampleCurrency",
  downPayment: "exampleDownPayment",
  downPaymentDaysIncluded: "exampleDownPaymentDaysIncluded",
  fechaRegistro: new Date(),
  fullPrice: "exampleFullPrice",
  id: 42,
  latestPaymentWhen: "exampleLatestPaymentWhen",
  minimumPayment: "exampleMinimumPayment",
  paymentAmountPerPeriod: "examplePaymentAmountPerPeriod",
  paymentDueDate: new Date(),
  paymentPeriodInDays: "examplePaymentPeriodInDays",
  qid: "exampleQid",
  registrationDate: new Date(),
  status: "exampleStatus",
  totalPaid: "exampleTotalPaid",
  unitNumber: 42,
  uuidIdentifier: "exampleUuidIdentifier",
};
const FIND_MANY_RESULT = [
  {
    billingModel: "exampleBillingModel",
    clientQids: "exampleClientQids",
    cumulativeDaysDisabled: 42,
    currency: "exampleCurrency",
    downPayment: "exampleDownPayment",
    downPaymentDaysIncluded: "exampleDownPaymentDaysIncluded",
    fechaRegistro: new Date(),
    fullPrice: "exampleFullPrice",
    id: 42,
    latestPaymentWhen: "exampleLatestPaymentWhen",
    minimumPayment: "exampleMinimumPayment",
    paymentAmountPerPeriod: "examplePaymentAmountPerPeriod",
    paymentDueDate: new Date(),
    paymentPeriodInDays: "examplePaymentPeriodInDays",
    qid: "exampleQid",
    registrationDate: new Date(),
    status: "exampleStatus",
    totalPaid: "exampleTotalPaid",
    unitNumber: 42,
    uuidIdentifier: "exampleUuidIdentifier",
  },
];
const FIND_ONE_RESULT = {
  billingModel: "exampleBillingModel",
  clientQids: "exampleClientQids",
  cumulativeDaysDisabled: 42,
  currency: "exampleCurrency",
  downPayment: "exampleDownPayment",
  downPaymentDaysIncluded: "exampleDownPaymentDaysIncluded",
  fechaRegistro: new Date(),
  fullPrice: "exampleFullPrice",
  id: 42,
  latestPaymentWhen: "exampleLatestPaymentWhen",
  minimumPayment: "exampleMinimumPayment",
  paymentAmountPerPeriod: "examplePaymentAmountPerPeriod",
  paymentDueDate: new Date(),
  paymentPeriodInDays: "examplePaymentPeriodInDays",
  qid: "exampleQid",
  registrationDate: new Date(),
  status: "exampleStatus",
  totalPaid: "exampleTotalPaid",
  unitNumber: 42,
  uuidIdentifier: "exampleUuidIdentifier",
};

const service = {
  createAngazaAccount() {
    return CREATE_RESULT;
  },
  angazaAccounts: () => FIND_MANY_RESULT,
  angazaAccount: ({ where }: { where: { id: string } }) => {
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

describe("AngazaAccount", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: AngazaAccountService,
          useValue: service,
        },
      ],
      controllers: [AngazaAccountController],
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

  test("POST /angazaAccounts", async () => {
    await request(app.getHttpServer())
      .post("/angazaAccounts")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        fechaRegistro: CREATE_RESULT.fechaRegistro.toISOString(),
        paymentDueDate: CREATE_RESULT.paymentDueDate.toISOString(),
        registrationDate: CREATE_RESULT.registrationDate.toISOString(),
      });
  });

  test("GET /angazaAccounts", async () => {
    await request(app.getHttpServer())
      .get("/angazaAccounts")
      .expect(HttpStatus.OK)
      .expect([
        {
          ...FIND_MANY_RESULT[0],
          fechaRegistro: FIND_MANY_RESULT[0].fechaRegistro.toISOString(),
          paymentDueDate: FIND_MANY_RESULT[0].paymentDueDate.toISOString(),
          registrationDate: FIND_MANY_RESULT[0].registrationDate.toISOString(),
        },
      ]);
  });

  test("GET /angazaAccounts/:id non existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/angazaAccounts"}/${nonExistingId}`)
      .expect(HttpStatus.NOT_FOUND)
      .expect({
        statusCode: HttpStatus.NOT_FOUND,
        message: `No resource was found for {"${"id"}":"${nonExistingId}"}`,
        error: "Not Found",
      });
  });

  test("GET /angazaAccounts/:id existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/angazaAccounts"}/${existingId}`)
      .expect(HttpStatus.OK)
      .expect({
        ...FIND_ONE_RESULT,
        fechaRegistro: FIND_ONE_RESULT.fechaRegistro.toISOString(),
        paymentDueDate: FIND_ONE_RESULT.paymentDueDate.toISOString(),
        registrationDate: FIND_ONE_RESULT.registrationDate.toISOString(),
      });
  });

  test("POST /angazaAccounts existing resource", async () => {
    const agent = request(app.getHttpServer());
    await agent
      .post("/angazaAccounts")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        fechaRegistro: CREATE_RESULT.fechaRegistro.toISOString(),
        paymentDueDate: CREATE_RESULT.paymentDueDate.toISOString(),
        registrationDate: CREATE_RESULT.registrationDate.toISOString(),
      })
      .then(function () {
        agent
          .post("/angazaAccounts")
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
