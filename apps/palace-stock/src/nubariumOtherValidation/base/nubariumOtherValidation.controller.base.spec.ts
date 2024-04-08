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
import { NubariumOtherValidationController } from "../nubariumOtherValidation.controller";
import { NubariumOtherValidationService } from "../nubariumOtherValidation.service";

const nonExistingId = "nonExistingId";
const existingId = "existingId";
const CREATE_INPUT = {
  correlationId: "exampleCorrelationId",
  correo: "exampleCorreo",
  customerId: 42,
  eaAdvice: "exampleEaAdvice",
  eaAdviceId: "exampleEaAdviceId",
  eaReason: "exampleEaReason",
  eaReasonId: "exampleEaReasonId",
  eaRiskBand: "exampleEaRiskBand",
  eaRiskBandId: "exampleEaRiskBandId",
  eaScore: "exampleEaScore",
  eaStatusId: "exampleEaStatusId",
  fechaRegistro: new Date(),
  fraudRisk: "exampleFraudRisk",
  fraudType: "exampleFraudType",
  id: 42,
  telefono: "exampleTelefono",
};
const CREATE_RESULT = {
  correlationId: "exampleCorrelationId",
  correo: "exampleCorreo",
  customerId: 42,
  eaAdvice: "exampleEaAdvice",
  eaAdviceId: "exampleEaAdviceId",
  eaReason: "exampleEaReason",
  eaReasonId: "exampleEaReasonId",
  eaRiskBand: "exampleEaRiskBand",
  eaRiskBandId: "exampleEaRiskBandId",
  eaScore: "exampleEaScore",
  eaStatusId: "exampleEaStatusId",
  fechaRegistro: new Date(),
  fraudRisk: "exampleFraudRisk",
  fraudType: "exampleFraudType",
  id: 42,
  telefono: "exampleTelefono",
};
const FIND_MANY_RESULT = [
  {
    correlationId: "exampleCorrelationId",
    correo: "exampleCorreo",
    customerId: 42,
    eaAdvice: "exampleEaAdvice",
    eaAdviceId: "exampleEaAdviceId",
    eaReason: "exampleEaReason",
    eaReasonId: "exampleEaReasonId",
    eaRiskBand: "exampleEaRiskBand",
    eaRiskBandId: "exampleEaRiskBandId",
    eaScore: "exampleEaScore",
    eaStatusId: "exampleEaStatusId",
    fechaRegistro: new Date(),
    fraudRisk: "exampleFraudRisk",
    fraudType: "exampleFraudType",
    id: 42,
    telefono: "exampleTelefono",
  },
];
const FIND_ONE_RESULT = {
  correlationId: "exampleCorrelationId",
  correo: "exampleCorreo",
  customerId: 42,
  eaAdvice: "exampleEaAdvice",
  eaAdviceId: "exampleEaAdviceId",
  eaReason: "exampleEaReason",
  eaReasonId: "exampleEaReasonId",
  eaRiskBand: "exampleEaRiskBand",
  eaRiskBandId: "exampleEaRiskBandId",
  eaScore: "exampleEaScore",
  eaStatusId: "exampleEaStatusId",
  fechaRegistro: new Date(),
  fraudRisk: "exampleFraudRisk",
  fraudType: "exampleFraudType",
  id: 42,
  telefono: "exampleTelefono",
};

const service = {
  createNubariumOtherValidation() {
    return CREATE_RESULT;
  },
  nubariumOtherValidations: () => FIND_MANY_RESULT,
  nubariumOtherValidation: ({ where }: { where: { id: string } }) => {
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

describe("NubariumOtherValidation", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: NubariumOtherValidationService,
          useValue: service,
        },
      ],
      controllers: [NubariumOtherValidationController],
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

  test("POST /nubariumOtherValidations", async () => {
    await request(app.getHttpServer())
      .post("/nubariumOtherValidations")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        fechaRegistro: CREATE_RESULT.fechaRegistro.toISOString(),
      });
  });

  test("GET /nubariumOtherValidations", async () => {
    await request(app.getHttpServer())
      .get("/nubariumOtherValidations")
      .expect(HttpStatus.OK)
      .expect([
        {
          ...FIND_MANY_RESULT[0],
          fechaRegistro: FIND_MANY_RESULT[0].fechaRegistro.toISOString(),
        },
      ]);
  });

  test("GET /nubariumOtherValidations/:id non existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/nubariumOtherValidations"}/${nonExistingId}`)
      .expect(HttpStatus.NOT_FOUND)
      .expect({
        statusCode: HttpStatus.NOT_FOUND,
        message: `No resource was found for {"${"id"}":"${nonExistingId}"}`,
        error: "Not Found",
      });
  });

  test("GET /nubariumOtherValidations/:id existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/nubariumOtherValidations"}/${existingId}`)
      .expect(HttpStatus.OK)
      .expect({
        ...FIND_ONE_RESULT,
        fechaRegistro: FIND_ONE_RESULT.fechaRegistro.toISOString(),
      });
  });

  test("POST /nubariumOtherValidations existing resource", async () => {
    const agent = request(app.getHttpServer());
    await agent
      .post("/nubariumOtherValidations")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        fechaRegistro: CREATE_RESULT.fechaRegistro.toISOString(),
      })
      .then(function () {
        agent
          .post("/nubariumOtherValidations")
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
