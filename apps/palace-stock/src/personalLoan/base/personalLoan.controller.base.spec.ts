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
import { PersonalLoanController } from "../personalLoan.controller";
import { PersonalLoanService } from "../personalLoan.service";

const nonExistingId = "nonExistingId";
const existingId = "existingId";
const CREATE_INPUT = {
  codigoBloqueo: "exampleCodigoBloqueo",
  comentarios: "exampleComentarios",
  deletedUserId: 42,
  desctoPagoOportuno: 42,
  fechaCancelacion: new Date(),
  fechaPrestamo: new Date(),
  fechaPrimerPago: new Date(),
  fechaRegistro: new Date(),
  id: 42,
  montoFinanciado: 42.424242424,
  montoPago: 42.424242424,
  montoPagoInicial: 42.424242424,
  plazo: 42,
  requestedUserId: 42,
  tasaInteres: 42.424242424,
  tasaInteresAnual: 42,
  telefonoEnvioToken: "exampleTelefonoEnvioToken",
  tokenEnviado: "exampleTokenEnviado",
  updatedAt: new Date(),
  updatedUserId: 42,
  vendorLock: "exampleVendorLock",
  warningAlert: "exampleWarningAlert",
};
const CREATE_RESULT = {
  codigoBloqueo: "exampleCodigoBloqueo",
  comentarios: "exampleComentarios",
  deletedUserId: 42,
  desctoPagoOportuno: 42,
  fechaCancelacion: new Date(),
  fechaPrestamo: new Date(),
  fechaPrimerPago: new Date(),
  fechaRegistro: new Date(),
  id: 42,
  montoFinanciado: 42.424242424,
  montoPago: 42.424242424,
  montoPagoInicial: 42.424242424,
  plazo: 42,
  requestedUserId: 42,
  tasaInteres: 42.424242424,
  tasaInteresAnual: 42,
  telefonoEnvioToken: "exampleTelefonoEnvioToken",
  tokenEnviado: "exampleTokenEnviado",
  updatedAt: new Date(),
  updatedUserId: 42,
  vendorLock: "exampleVendorLock",
  warningAlert: "exampleWarningAlert",
};
const FIND_MANY_RESULT = [
  {
    codigoBloqueo: "exampleCodigoBloqueo",
    comentarios: "exampleComentarios",
    deletedUserId: 42,
    desctoPagoOportuno: 42,
    fechaCancelacion: new Date(),
    fechaPrestamo: new Date(),
    fechaPrimerPago: new Date(),
    fechaRegistro: new Date(),
    id: 42,
    montoFinanciado: 42.424242424,
    montoPago: 42.424242424,
    montoPagoInicial: 42.424242424,
    plazo: 42,
    requestedUserId: 42,
    tasaInteres: 42.424242424,
    tasaInteresAnual: 42,
    telefonoEnvioToken: "exampleTelefonoEnvioToken",
    tokenEnviado: "exampleTokenEnviado",
    updatedAt: new Date(),
    updatedUserId: 42,
    vendorLock: "exampleVendorLock",
    warningAlert: "exampleWarningAlert",
  },
];
const FIND_ONE_RESULT = {
  codigoBloqueo: "exampleCodigoBloqueo",
  comentarios: "exampleComentarios",
  deletedUserId: 42,
  desctoPagoOportuno: 42,
  fechaCancelacion: new Date(),
  fechaPrestamo: new Date(),
  fechaPrimerPago: new Date(),
  fechaRegistro: new Date(),
  id: 42,
  montoFinanciado: 42.424242424,
  montoPago: 42.424242424,
  montoPagoInicial: 42.424242424,
  plazo: 42,
  requestedUserId: 42,
  tasaInteres: 42.424242424,
  tasaInteresAnual: 42,
  telefonoEnvioToken: "exampleTelefonoEnvioToken",
  tokenEnviado: "exampleTokenEnviado",
  updatedAt: new Date(),
  updatedUserId: 42,
  vendorLock: "exampleVendorLock",
  warningAlert: "exampleWarningAlert",
};

const service = {
  createPersonalLoan() {
    return CREATE_RESULT;
  },
  personalLoans: () => FIND_MANY_RESULT,
  personalLoan: ({ where }: { where: { id: string } }) => {
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

describe("PersonalLoan", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: PersonalLoanService,
          useValue: service,
        },
      ],
      controllers: [PersonalLoanController],
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

  test("POST /personalLoans", async () => {
    await request(app.getHttpServer())
      .post("/personalLoans")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        fechaCancelacion: CREATE_RESULT.fechaCancelacion.toISOString(),
        fechaPrestamo: CREATE_RESULT.fechaPrestamo.toISOString(),
        fechaPrimerPago: CREATE_RESULT.fechaPrimerPago.toISOString(),
        fechaRegistro: CREATE_RESULT.fechaRegistro.toISOString(),
        updatedAt: CREATE_RESULT.updatedAt.toISOString(),
      });
  });

  test("GET /personalLoans", async () => {
    await request(app.getHttpServer())
      .get("/personalLoans")
      .expect(HttpStatus.OK)
      .expect([
        {
          ...FIND_MANY_RESULT[0],
          fechaCancelacion: FIND_MANY_RESULT[0].fechaCancelacion.toISOString(),
          fechaPrestamo: FIND_MANY_RESULT[0].fechaPrestamo.toISOString(),
          fechaPrimerPago: FIND_MANY_RESULT[0].fechaPrimerPago.toISOString(),
          fechaRegistro: FIND_MANY_RESULT[0].fechaRegistro.toISOString(),
          updatedAt: FIND_MANY_RESULT[0].updatedAt.toISOString(),
        },
      ]);
  });

  test("GET /personalLoans/:id non existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/personalLoans"}/${nonExistingId}`)
      .expect(HttpStatus.NOT_FOUND)
      .expect({
        statusCode: HttpStatus.NOT_FOUND,
        message: `No resource was found for {"${"id"}":"${nonExistingId}"}`,
        error: "Not Found",
      });
  });

  test("GET /personalLoans/:id existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/personalLoans"}/${existingId}`)
      .expect(HttpStatus.OK)
      .expect({
        ...FIND_ONE_RESULT,
        fechaCancelacion: FIND_ONE_RESULT.fechaCancelacion.toISOString(),
        fechaPrestamo: FIND_ONE_RESULT.fechaPrestamo.toISOString(),
        fechaPrimerPago: FIND_ONE_RESULT.fechaPrimerPago.toISOString(),
        fechaRegistro: FIND_ONE_RESULT.fechaRegistro.toISOString(),
        updatedAt: FIND_ONE_RESULT.updatedAt.toISOString(),
      });
  });

  test("POST /personalLoans existing resource", async () => {
    const agent = request(app.getHttpServer());
    await agent
      .post("/personalLoans")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        fechaCancelacion: CREATE_RESULT.fechaCancelacion.toISOString(),
        fechaPrestamo: CREATE_RESULT.fechaPrestamo.toISOString(),
        fechaPrimerPago: CREATE_RESULT.fechaPrimerPago.toISOString(),
        fechaRegistro: CREATE_RESULT.fechaRegistro.toISOString(),
        updatedAt: CREATE_RESULT.updatedAt.toISOString(),
      })
      .then(function () {
        agent
          .post("/personalLoans")
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
