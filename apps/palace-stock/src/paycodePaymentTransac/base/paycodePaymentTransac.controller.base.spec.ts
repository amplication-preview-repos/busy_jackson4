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
import { PaycodePaymentTransacController } from "../paycodePaymentTransac.controller";
import { PaycodePaymentTransacService } from "../paycodePaymentTransac.service";

const nonExistingId = "nonExistingId";
const existingId = "existingId";
const CREATE_INPUT = {
  bank: "exampleBank",
  beneficiary: "exampleBeneficiary",
  clabe: "exampleClabe",
  concept: "exampleConcept",
  datosPago: "exampleDatosPago",
  displayMessage: "exampleDisplayMessage",
  estatusCobro: "exampleEstatusCobro",
  fechaRegistro: new Date(),
  habilitarPagoRecurrente: 42,
  id: 42,
  referenceNumber: "exampleReferenceNumber",
  trackCode: "exampleTrackCode",
};
const CREATE_RESULT = {
  bank: "exampleBank",
  beneficiary: "exampleBeneficiary",
  clabe: "exampleClabe",
  concept: "exampleConcept",
  datosPago: "exampleDatosPago",
  displayMessage: "exampleDisplayMessage",
  estatusCobro: "exampleEstatusCobro",
  fechaRegistro: new Date(),
  habilitarPagoRecurrente: 42,
  id: 42,
  referenceNumber: "exampleReferenceNumber",
  trackCode: "exampleTrackCode",
};
const FIND_MANY_RESULT = [
  {
    bank: "exampleBank",
    beneficiary: "exampleBeneficiary",
    clabe: "exampleClabe",
    concept: "exampleConcept",
    datosPago: "exampleDatosPago",
    displayMessage: "exampleDisplayMessage",
    estatusCobro: "exampleEstatusCobro",
    fechaRegistro: new Date(),
    habilitarPagoRecurrente: 42,
    id: 42,
    referenceNumber: "exampleReferenceNumber",
    trackCode: "exampleTrackCode",
  },
];
const FIND_ONE_RESULT = {
  bank: "exampleBank",
  beneficiary: "exampleBeneficiary",
  clabe: "exampleClabe",
  concept: "exampleConcept",
  datosPago: "exampleDatosPago",
  displayMessage: "exampleDisplayMessage",
  estatusCobro: "exampleEstatusCobro",
  fechaRegistro: new Date(),
  habilitarPagoRecurrente: 42,
  id: 42,
  referenceNumber: "exampleReferenceNumber",
  trackCode: "exampleTrackCode",
};

const service = {
  createPaycodePaymentTransac() {
    return CREATE_RESULT;
  },
  paycodePaymentTransacs: () => FIND_MANY_RESULT,
  paycodePaymentTransac: ({ where }: { where: { id: string } }) => {
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

describe("PaycodePaymentTransac", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: PaycodePaymentTransacService,
          useValue: service,
        },
      ],
      controllers: [PaycodePaymentTransacController],
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

  test("POST /paycodePaymentTransacs", async () => {
    await request(app.getHttpServer())
      .post("/paycodePaymentTransacs")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        fechaRegistro: CREATE_RESULT.fechaRegistro.toISOString(),
      });
  });

  test("GET /paycodePaymentTransacs", async () => {
    await request(app.getHttpServer())
      .get("/paycodePaymentTransacs")
      .expect(HttpStatus.OK)
      .expect([
        {
          ...FIND_MANY_RESULT[0],
          fechaRegistro: FIND_MANY_RESULT[0].fechaRegistro.toISOString(),
        },
      ]);
  });

  test("GET /paycodePaymentTransacs/:id non existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/paycodePaymentTransacs"}/${nonExistingId}`)
      .expect(HttpStatus.NOT_FOUND)
      .expect({
        statusCode: HttpStatus.NOT_FOUND,
        message: `No resource was found for {"${"id"}":"${nonExistingId}"}`,
        error: "Not Found",
      });
  });

  test("GET /paycodePaymentTransacs/:id existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/paycodePaymentTransacs"}/${existingId}`)
      .expect(HttpStatus.OK)
      .expect({
        ...FIND_ONE_RESULT,
        fechaRegistro: FIND_ONE_RESULT.fechaRegistro.toISOString(),
      });
  });

  test("POST /paycodePaymentTransacs existing resource", async () => {
    const agent = request(app.getHttpServer());
    await agent
      .post("/paycodePaymentTransacs")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        fechaRegistro: CREATE_RESULT.fechaRegistro.toISOString(),
      })
      .then(function () {
        agent
          .post("/paycodePaymentTransacs")
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
