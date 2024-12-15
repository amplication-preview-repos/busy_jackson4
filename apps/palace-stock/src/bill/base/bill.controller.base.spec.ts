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
import { BillController } from "../bill.controller";
import { BillService } from "../bill.service";

const nonExistingId = "nonExistingId";
const existingId = "existingId";
const CREATE_INPUT = {
  billConcept: "exampleBillConcept",
  billingId: 42,
  canceledUserId: 42,
  clientCode: "exampleClientCode",
  codigoConcepto: "exampleCodigoConcepto",
  complementId: 42,
  createdUserId: 42,
  engancheFinanc: 42.424242424,
  fechaActualizacion: new Date(),
  fechaCancelacion: new Date(),
  fechaRegistro: new Date(),
  folio: 42,
  horaRegistro: new Date(),
  id: 42,
  mensajeEstatus: "exampleMensajeEstatus",
  montoFactura: 42.424242424,
  referenceId: "exampleReferenceId",
  rutaPdf: "exampleRutaPdf",
  rutaXml: "exampleRutaXml",
  saldoFactura: 42.424242424,
  saldoFacturaTemp: 42.424242424,
  serie: "exampleSerie",
  stampedAt: new Date(),
  updatedUserId: 42,
};
const CREATE_RESULT = {
  billConcept: "exampleBillConcept",
  billingId: 42,
  canceledUserId: 42,
  clientCode: "exampleClientCode",
  codigoConcepto: "exampleCodigoConcepto",
  complementId: 42,
  createdUserId: 42,
  engancheFinanc: 42.424242424,
  fechaActualizacion: new Date(),
  fechaCancelacion: new Date(),
  fechaRegistro: new Date(),
  folio: 42,
  horaRegistro: new Date(),
  id: 42,
  mensajeEstatus: "exampleMensajeEstatus",
  montoFactura: 42.424242424,
  referenceId: "exampleReferenceId",
  rutaPdf: "exampleRutaPdf",
  rutaXml: "exampleRutaXml",
  saldoFactura: 42.424242424,
  saldoFacturaTemp: 42.424242424,
  serie: "exampleSerie",
  stampedAt: new Date(),
  updatedUserId: 42,
};
const FIND_MANY_RESULT = [
  {
    billConcept: "exampleBillConcept",
    billingId: 42,
    canceledUserId: 42,
    clientCode: "exampleClientCode",
    codigoConcepto: "exampleCodigoConcepto",
    complementId: 42,
    createdUserId: 42,
    engancheFinanc: 42.424242424,
    fechaActualizacion: new Date(),
    fechaCancelacion: new Date(),
    fechaRegistro: new Date(),
    folio: 42,
    horaRegistro: new Date(),
    id: 42,
    mensajeEstatus: "exampleMensajeEstatus",
    montoFactura: 42.424242424,
    referenceId: "exampleReferenceId",
    rutaPdf: "exampleRutaPdf",
    rutaXml: "exampleRutaXml",
    saldoFactura: 42.424242424,
    saldoFacturaTemp: 42.424242424,
    serie: "exampleSerie",
    stampedAt: new Date(),
    updatedUserId: 42,
  },
];
const FIND_ONE_RESULT = {
  billConcept: "exampleBillConcept",
  billingId: 42,
  canceledUserId: 42,
  clientCode: "exampleClientCode",
  codigoConcepto: "exampleCodigoConcepto",
  complementId: 42,
  createdUserId: 42,
  engancheFinanc: 42.424242424,
  fechaActualizacion: new Date(),
  fechaCancelacion: new Date(),
  fechaRegistro: new Date(),
  folio: 42,
  horaRegistro: new Date(),
  id: 42,
  mensajeEstatus: "exampleMensajeEstatus",
  montoFactura: 42.424242424,
  referenceId: "exampleReferenceId",
  rutaPdf: "exampleRutaPdf",
  rutaXml: "exampleRutaXml",
  saldoFactura: 42.424242424,
  saldoFacturaTemp: 42.424242424,
  serie: "exampleSerie",
  stampedAt: new Date(),
  updatedUserId: 42,
};

const service = {
  createBill() {
    return CREATE_RESULT;
  },
  bills: () => FIND_MANY_RESULT,
  bill: ({ where }: { where: { id: string } }) => {
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

describe("Bill", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: BillService,
          useValue: service,
        },
      ],
      controllers: [BillController],
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

  test("POST /bills", async () => {
    await request(app.getHttpServer())
      .post("/bills")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        fechaActualizacion: CREATE_RESULT.fechaActualizacion.toISOString(),
        fechaCancelacion: CREATE_RESULT.fechaCancelacion.toISOString(),
        fechaRegistro: CREATE_RESULT.fechaRegistro.toISOString(),
        horaRegistro: CREATE_RESULT.horaRegistro.toISOString(),
        stampedAt: CREATE_RESULT.stampedAt.toISOString(),
      });
  });

  test("GET /bills", async () => {
    await request(app.getHttpServer())
      .get("/bills")
      .expect(HttpStatus.OK)
      .expect([
        {
          ...FIND_MANY_RESULT[0],
          fechaActualizacion:
            FIND_MANY_RESULT[0].fechaActualizacion.toISOString(),
          fechaCancelacion: FIND_MANY_RESULT[0].fechaCancelacion.toISOString(),
          fechaRegistro: FIND_MANY_RESULT[0].fechaRegistro.toISOString(),
          horaRegistro: FIND_MANY_RESULT[0].horaRegistro.toISOString(),
          stampedAt: FIND_MANY_RESULT[0].stampedAt.toISOString(),
        },
      ]);
  });

  test("GET /bills/:id non existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/bills"}/${nonExistingId}`)
      .expect(HttpStatus.NOT_FOUND)
      .expect({
        statusCode: HttpStatus.NOT_FOUND,
        message: `No resource was found for {"${"id"}":"${nonExistingId}"}`,
        error: "Not Found",
      });
  });

  test("GET /bills/:id existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/bills"}/${existingId}`)
      .expect(HttpStatus.OK)
      .expect({
        ...FIND_ONE_RESULT,
        fechaActualizacion: FIND_ONE_RESULT.fechaActualizacion.toISOString(),
        fechaCancelacion: FIND_ONE_RESULT.fechaCancelacion.toISOString(),
        fechaRegistro: FIND_ONE_RESULT.fechaRegistro.toISOString(),
        horaRegistro: FIND_ONE_RESULT.horaRegistro.toISOString(),
        stampedAt: FIND_ONE_RESULT.stampedAt.toISOString(),
      });
  });

  test("POST /bills existing resource", async () => {
    const agent = request(app.getHttpServer());
    await agent
      .post("/bills")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        fechaActualizacion: CREATE_RESULT.fechaActualizacion.toISOString(),
        fechaCancelacion: CREATE_RESULT.fechaCancelacion.toISOString(),
        fechaRegistro: CREATE_RESULT.fechaRegistro.toISOString(),
        horaRegistro: CREATE_RESULT.horaRegistro.toISOString(),
        stampedAt: CREATE_RESULT.stampedAt.toISOString(),
      })
      .then(function () {
        agent
          .post("/bills")
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
