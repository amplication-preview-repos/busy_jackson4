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
import { ConektaPaymentTransacController } from "../conektaPaymentTransac.controller";
import { ConektaPaymentTransacService } from "../conektaPaymentTransac.service";

const nonExistingId = "nonExistingId";
const existingId = "existingId";
const CREATE_INPUT = {
  amount: 42,
  authCode: "exampleAuthCode",
  clabe: "exampleClabe",
  createdAt: new Date(),
  datosPago: "exampleDatosPago",
  expiresAt: new Date(),
  fechaActualizacion: new Date(),
  fechaRegistro: new Date(),
  habilitarPagoRecurrente: 42,
  id: 42,
  issuer: "exampleIssuer",
  last4: "exampleLast4",
  metodoPago: "exampleMetodoPago",
  orderId: "exampleOrderId",
  payStatus: "examplePayStatus",
  reference: "exampleReference",
  rutaRef: "exampleRutaRef",
  updatedAt: new Date(),
};
const CREATE_RESULT = {
  amount: 42,
  authCode: "exampleAuthCode",
  clabe: "exampleClabe",
  createdAt: new Date(),
  datosPago: "exampleDatosPago",
  expiresAt: new Date(),
  fechaActualizacion: new Date(),
  fechaRegistro: new Date(),
  habilitarPagoRecurrente: 42,
  id: 42,
  issuer: "exampleIssuer",
  last4: "exampleLast4",
  metodoPago: "exampleMetodoPago",
  orderId: "exampleOrderId",
  payStatus: "examplePayStatus",
  reference: "exampleReference",
  rutaRef: "exampleRutaRef",
  updatedAt: new Date(),
};
const FIND_MANY_RESULT = [
  {
    amount: 42,
    authCode: "exampleAuthCode",
    clabe: "exampleClabe",
    createdAt: new Date(),
    datosPago: "exampleDatosPago",
    expiresAt: new Date(),
    fechaActualizacion: new Date(),
    fechaRegistro: new Date(),
    habilitarPagoRecurrente: 42,
    id: 42,
    issuer: "exampleIssuer",
    last4: "exampleLast4",
    metodoPago: "exampleMetodoPago",
    orderId: "exampleOrderId",
    payStatus: "examplePayStatus",
    reference: "exampleReference",
    rutaRef: "exampleRutaRef",
    updatedAt: new Date(),
  },
];
const FIND_ONE_RESULT = {
  amount: 42,
  authCode: "exampleAuthCode",
  clabe: "exampleClabe",
  createdAt: new Date(),
  datosPago: "exampleDatosPago",
  expiresAt: new Date(),
  fechaActualizacion: new Date(),
  fechaRegistro: new Date(),
  habilitarPagoRecurrente: 42,
  id: 42,
  issuer: "exampleIssuer",
  last4: "exampleLast4",
  metodoPago: "exampleMetodoPago",
  orderId: "exampleOrderId",
  payStatus: "examplePayStatus",
  reference: "exampleReference",
  rutaRef: "exampleRutaRef",
  updatedAt: new Date(),
};

const service = {
  createConektaPaymentTransac() {
    return CREATE_RESULT;
  },
  conektaPaymentTransacs: () => FIND_MANY_RESULT,
  conektaPaymentTransac: ({ where }: { where: { id: string } }) => {
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

describe("ConektaPaymentTransac", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: ConektaPaymentTransacService,
          useValue: service,
        },
      ],
      controllers: [ConektaPaymentTransacController],
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

  test("POST /conektaPaymentTransacs", async () => {
    await request(app.getHttpServer())
      .post("/conektaPaymentTransacs")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        createdAt: CREATE_RESULT.createdAt.toISOString(),
        expiresAt: CREATE_RESULT.expiresAt.toISOString(),
        fechaActualizacion: CREATE_RESULT.fechaActualizacion.toISOString(),
        fechaRegistro: CREATE_RESULT.fechaRegistro.toISOString(),
        updatedAt: CREATE_RESULT.updatedAt.toISOString(),
      });
  });

  test("GET /conektaPaymentTransacs", async () => {
    await request(app.getHttpServer())
      .get("/conektaPaymentTransacs")
      .expect(HttpStatus.OK)
      .expect([
        {
          ...FIND_MANY_RESULT[0],
          createdAt: FIND_MANY_RESULT[0].createdAt.toISOString(),
          expiresAt: FIND_MANY_RESULT[0].expiresAt.toISOString(),
          fechaActualizacion:
            FIND_MANY_RESULT[0].fechaActualizacion.toISOString(),
          fechaRegistro: FIND_MANY_RESULT[0].fechaRegistro.toISOString(),
          updatedAt: FIND_MANY_RESULT[0].updatedAt.toISOString(),
        },
      ]);
  });

  test("GET /conektaPaymentTransacs/:id non existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/conektaPaymentTransacs"}/${nonExistingId}`)
      .expect(HttpStatus.NOT_FOUND)
      .expect({
        statusCode: HttpStatus.NOT_FOUND,
        message: `No resource was found for {"${"id"}":"${nonExistingId}"}`,
        error: "Not Found",
      });
  });

  test("GET /conektaPaymentTransacs/:id existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/conektaPaymentTransacs"}/${existingId}`)
      .expect(HttpStatus.OK)
      .expect({
        ...FIND_ONE_RESULT,
        createdAt: FIND_ONE_RESULT.createdAt.toISOString(),
        expiresAt: FIND_ONE_RESULT.expiresAt.toISOString(),
        fechaActualizacion: FIND_ONE_RESULT.fechaActualizacion.toISOString(),
        fechaRegistro: FIND_ONE_RESULT.fechaRegistro.toISOString(),
        updatedAt: FIND_ONE_RESULT.updatedAt.toISOString(),
      });
  });

  test("POST /conektaPaymentTransacs existing resource", async () => {
    const agent = request(app.getHttpServer());
    await agent
      .post("/conektaPaymentTransacs")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        createdAt: CREATE_RESULT.createdAt.toISOString(),
        expiresAt: CREATE_RESULT.expiresAt.toISOString(),
        fechaActualizacion: CREATE_RESULT.fechaActualizacion.toISOString(),
        fechaRegistro: CREATE_RESULT.fechaRegistro.toISOString(),
        updatedAt: CREATE_RESULT.updatedAt.toISOString(),
      })
      .then(function () {
        agent
          .post("/conektaPaymentTransacs")
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
