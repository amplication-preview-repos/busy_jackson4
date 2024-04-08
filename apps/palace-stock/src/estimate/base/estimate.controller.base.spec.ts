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
import { EstimateController } from "../estimate.controller";
import { EstimateService } from "../estimate.service";

const nonExistingId = "nonExistingId";
const existingId = "existingId";
const CREATE_INPUT = {
  createdUserId: 42,
  desctoPagoOportuno: 42,
  enganche: 42.424242424,
  fechaCotiz: new Date(),
  id: 42,
  interesAnual: 42.424242424,
  interesSemanalMultiplo: 42.424242424,
  montoPago: 42.424242424,
  motivoRechazo: "exampleMotivoRechazo",
  nombreCompletoCliente: "exampleNombreCompletoCliente",
  numPagos: 42,
  observacionesCotizacion: "exampleObservacionesCotizacion",
  pagoSemanalIdeal: 42.424242424,
  precioLista: 42.424242424,
  productoInteres: "exampleProductoInteres",
  telefonoCliente: "exampleTelefonoCliente",
};
const CREATE_RESULT = {
  createdUserId: 42,
  desctoPagoOportuno: 42,
  enganche: 42.424242424,
  fechaCotiz: new Date(),
  id: 42,
  interesAnual: 42.424242424,
  interesSemanalMultiplo: 42.424242424,
  montoPago: 42.424242424,
  motivoRechazo: "exampleMotivoRechazo",
  nombreCompletoCliente: "exampleNombreCompletoCliente",
  numPagos: 42,
  observacionesCotizacion: "exampleObservacionesCotizacion",
  pagoSemanalIdeal: 42.424242424,
  precioLista: 42.424242424,
  productoInteres: "exampleProductoInteres",
  telefonoCliente: "exampleTelefonoCliente",
};
const FIND_MANY_RESULT = [
  {
    createdUserId: 42,
    desctoPagoOportuno: 42,
    enganche: 42.424242424,
    fechaCotiz: new Date(),
    id: 42,
    interesAnual: 42.424242424,
    interesSemanalMultiplo: 42.424242424,
    montoPago: 42.424242424,
    motivoRechazo: "exampleMotivoRechazo",
    nombreCompletoCliente: "exampleNombreCompletoCliente",
    numPagos: 42,
    observacionesCotizacion: "exampleObservacionesCotizacion",
    pagoSemanalIdeal: 42.424242424,
    precioLista: 42.424242424,
    productoInteres: "exampleProductoInteres",
    telefonoCliente: "exampleTelefonoCliente",
  },
];
const FIND_ONE_RESULT = {
  createdUserId: 42,
  desctoPagoOportuno: 42,
  enganche: 42.424242424,
  fechaCotiz: new Date(),
  id: 42,
  interesAnual: 42.424242424,
  interesSemanalMultiplo: 42.424242424,
  montoPago: 42.424242424,
  motivoRechazo: "exampleMotivoRechazo",
  nombreCompletoCliente: "exampleNombreCompletoCliente",
  numPagos: 42,
  observacionesCotizacion: "exampleObservacionesCotizacion",
  pagoSemanalIdeal: 42.424242424,
  precioLista: 42.424242424,
  productoInteres: "exampleProductoInteres",
  telefonoCliente: "exampleTelefonoCliente",
};

const service = {
  createEstimate() {
    return CREATE_RESULT;
  },
  estimates: () => FIND_MANY_RESULT,
  estimate: ({ where }: { where: { id: string } }) => {
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

describe("Estimate", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: EstimateService,
          useValue: service,
        },
      ],
      controllers: [EstimateController],
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

  test("POST /estimates", async () => {
    await request(app.getHttpServer())
      .post("/estimates")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        fechaCotiz: CREATE_RESULT.fechaCotiz.toISOString(),
      });
  });

  test("GET /estimates", async () => {
    await request(app.getHttpServer())
      .get("/estimates")
      .expect(HttpStatus.OK)
      .expect([
        {
          ...FIND_MANY_RESULT[0],
          fechaCotiz: FIND_MANY_RESULT[0].fechaCotiz.toISOString(),
        },
      ]);
  });

  test("GET /estimates/:id non existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/estimates"}/${nonExistingId}`)
      .expect(HttpStatus.NOT_FOUND)
      .expect({
        statusCode: HttpStatus.NOT_FOUND,
        message: `No resource was found for {"${"id"}":"${nonExistingId}"}`,
        error: "Not Found",
      });
  });

  test("GET /estimates/:id existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/estimates"}/${existingId}`)
      .expect(HttpStatus.OK)
      .expect({
        ...FIND_ONE_RESULT,
        fechaCotiz: FIND_ONE_RESULT.fechaCotiz.toISOString(),
      });
  });

  test("POST /estimates existing resource", async () => {
    const agent = request(app.getHttpServer());
    await agent
      .post("/estimates")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        fechaCotiz: CREATE_RESULT.fechaCotiz.toISOString(),
      })
      .then(function () {
        agent
          .post("/estimates")
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
