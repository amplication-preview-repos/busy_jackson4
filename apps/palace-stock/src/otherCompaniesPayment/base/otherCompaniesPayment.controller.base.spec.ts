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
import { OtherCompaniesPaymentController } from "../otherCompaniesPayment.controller";
import { OtherCompaniesPaymentService } from "../otherCompaniesPayment.service";

const nonExistingId = "nonExistingId";
const existingId = "existingId";
const CREATE_INPUT = {
  abonoExtra: 42.424242424,
  cambioDevuelto: 42.424242424,
  cantidadRecibida: 42.424242424,
  capitalPagado: 42.424242424,
  codigoBloqueo: "exampleCodigoBloqueo",
  desctoAplicado: 42.424242424,
  desdeWebhook: "true",
  fechaPago: new Date(),
  fechaProxVenc: new Date(),
  fechaVenc: new Date(),
  formaPago: "exampleFormaPago",
  horaPago: new Date(),
  id: 42,
  interesPagado: 42.424242424,
  numPago: 42,
  opcionCambio: "exampleOpcionCambio",
  opcionPago: "exampleOpcionPago",
  pagosAdelantados: 42,
  receivedUserId: 42,
};
const CREATE_RESULT = {
  abonoExtra: 42.424242424,
  cambioDevuelto: 42.424242424,
  cantidadRecibida: 42.424242424,
  capitalPagado: 42.424242424,
  codigoBloqueo: "exampleCodigoBloqueo",
  desctoAplicado: 42.424242424,
  desdeWebhook: "true",
  fechaPago: new Date(),
  fechaProxVenc: new Date(),
  fechaVenc: new Date(),
  formaPago: "exampleFormaPago",
  horaPago: new Date(),
  id: 42,
  interesPagado: 42.424242424,
  numPago: 42,
  opcionCambio: "exampleOpcionCambio",
  opcionPago: "exampleOpcionPago",
  pagosAdelantados: 42,
  receivedUserId: 42,
};
const FIND_MANY_RESULT = [
  {
    abonoExtra: 42.424242424,
    cambioDevuelto: 42.424242424,
    cantidadRecibida: 42.424242424,
    capitalPagado: 42.424242424,
    codigoBloqueo: "exampleCodigoBloqueo",
    desctoAplicado: 42.424242424,
    desdeWebhook: "true",
    fechaPago: new Date(),
    fechaProxVenc: new Date(),
    fechaVenc: new Date(),
    formaPago: "exampleFormaPago",
    horaPago: new Date(),
    id: 42,
    interesPagado: 42.424242424,
    numPago: 42,
    opcionCambio: "exampleOpcionCambio",
    opcionPago: "exampleOpcionPago",
    pagosAdelantados: 42,
    receivedUserId: 42,
  },
];
const FIND_ONE_RESULT = {
  abonoExtra: 42.424242424,
  cambioDevuelto: 42.424242424,
  cantidadRecibida: 42.424242424,
  capitalPagado: 42.424242424,
  codigoBloqueo: "exampleCodigoBloqueo",
  desctoAplicado: 42.424242424,
  desdeWebhook: "true",
  fechaPago: new Date(),
  fechaProxVenc: new Date(),
  fechaVenc: new Date(),
  formaPago: "exampleFormaPago",
  horaPago: new Date(),
  id: 42,
  interesPagado: 42.424242424,
  numPago: 42,
  opcionCambio: "exampleOpcionCambio",
  opcionPago: "exampleOpcionPago",
  pagosAdelantados: 42,
  receivedUserId: 42,
};

const service = {
  createOtherCompaniesPayment() {
    return CREATE_RESULT;
  },
  otherCompaniesPayments: () => FIND_MANY_RESULT,
  otherCompaniesPayment: ({ where }: { where: { id: string } }) => {
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

describe("OtherCompaniesPayment", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: OtherCompaniesPaymentService,
          useValue: service,
        },
      ],
      controllers: [OtherCompaniesPaymentController],
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

  test("POST /otherCompaniesPayments", async () => {
    await request(app.getHttpServer())
      .post("/otherCompaniesPayments")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        fechaPago: CREATE_RESULT.fechaPago.toISOString(),
        fechaProxVenc: CREATE_RESULT.fechaProxVenc.toISOString(),
        fechaVenc: CREATE_RESULT.fechaVenc.toISOString(),
        horaPago: CREATE_RESULT.horaPago.toISOString(),
      });
  });

  test("GET /otherCompaniesPayments", async () => {
    await request(app.getHttpServer())
      .get("/otherCompaniesPayments")
      .expect(HttpStatus.OK)
      .expect([
        {
          ...FIND_MANY_RESULT[0],
          fechaPago: FIND_MANY_RESULT[0].fechaPago.toISOString(),
          fechaProxVenc: FIND_MANY_RESULT[0].fechaProxVenc.toISOString(),
          fechaVenc: FIND_MANY_RESULT[0].fechaVenc.toISOString(),
          horaPago: FIND_MANY_RESULT[0].horaPago.toISOString(),
        },
      ]);
  });

  test("GET /otherCompaniesPayments/:id non existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/otherCompaniesPayments"}/${nonExistingId}`)
      .expect(HttpStatus.NOT_FOUND)
      .expect({
        statusCode: HttpStatus.NOT_FOUND,
        message: `No resource was found for {"${"id"}":"${nonExistingId}"}`,
        error: "Not Found",
      });
  });

  test("GET /otherCompaniesPayments/:id existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/otherCompaniesPayments"}/${existingId}`)
      .expect(HttpStatus.OK)
      .expect({
        ...FIND_ONE_RESULT,
        fechaPago: FIND_ONE_RESULT.fechaPago.toISOString(),
        fechaProxVenc: FIND_ONE_RESULT.fechaProxVenc.toISOString(),
        fechaVenc: FIND_ONE_RESULT.fechaVenc.toISOString(),
        horaPago: FIND_ONE_RESULT.horaPago.toISOString(),
      });
  });

  test("POST /otherCompaniesPayments existing resource", async () => {
    const agent = request(app.getHttpServer());
    await agent
      .post("/otherCompaniesPayments")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        fechaPago: CREATE_RESULT.fechaPago.toISOString(),
        fechaProxVenc: CREATE_RESULT.fechaProxVenc.toISOString(),
        fechaVenc: CREATE_RESULT.fechaVenc.toISOString(),
        horaPago: CREATE_RESULT.horaPago.toISOString(),
      })
      .then(function () {
        agent
          .post("/otherCompaniesPayments")
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
