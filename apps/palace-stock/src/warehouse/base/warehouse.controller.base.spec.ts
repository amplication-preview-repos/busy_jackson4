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
import { WarehouseController } from "../warehouse.controller";
import { WarehouseService } from "../warehouse.service";

const nonExistingId = "nonExistingId";
const existingId = "existingId";
const CREATE_INPUT = {
  ajusteDesctoFinanc: "exampleAjusteDesctoFinanc",
  ajusteMontoFijoEnganche: 42.424242424,
  autorizarIneErroneaNubarium: 42,
  autorizarNombresSinCoincidencia: 42,
  autorizarSelfieSinCoincidencia: 42,
  bloqueoVentaComputadora: 42,
  catalogoCodigoPostal: "exampleCatalogoCodigoPostal",
  confSaltarValidacionesPrestamosPersonales:
    "exampleConfSaltarValidacionesPrestamosPersonales",
  contratoAlmacen: "exampleContratoAlmacen",
  contratoAlmacenPdf: "exampleContratoAlmacenPdf",
  createdUserId: 42,
  desctoPagoOportuno: 42,
  desctoPagoOportunoPrestamos: 42,
  descuentoEspecial: 42,
  domicilioFiscal: "exampleDomicilioFiscal",
  dontLockDevices: "true",
  fechaRegistro: new Date(),
  forceAdvancePayments: 42,
  habilitarBloqueoClienteCp: 42,
  habilitarPrestamoEquipos: 42,
  horaInicioPagos: new Date(),
  horaLimitePagos: new Date(),
  id: 42,
  incluirEngancheCorte: 42,
  promocionTemporal: "examplePromocionTemporal",
  referenciaPago: "true",
  sendSmsUnlinkDevicesNuovo: 42,
  telefonoValidacion: "exampleTelefonoValidacion",
  ubicacion: "exampleUbicacion",
  whouseName: "exampleWhouseName",
  whouseNo: 42,
};
const CREATE_RESULT = {
  ajusteDesctoFinanc: "exampleAjusteDesctoFinanc",
  ajusteMontoFijoEnganche: 42.424242424,
  autorizarIneErroneaNubarium: 42,
  autorizarNombresSinCoincidencia: 42,
  autorizarSelfieSinCoincidencia: 42,
  bloqueoVentaComputadora: 42,
  catalogoCodigoPostal: "exampleCatalogoCodigoPostal",
  confSaltarValidacionesPrestamosPersonales:
    "exampleConfSaltarValidacionesPrestamosPersonales",
  contratoAlmacen: "exampleContratoAlmacen",
  contratoAlmacenPdf: "exampleContratoAlmacenPdf",
  createdUserId: 42,
  desctoPagoOportuno: 42,
  desctoPagoOportunoPrestamos: 42,
  descuentoEspecial: 42,
  domicilioFiscal: "exampleDomicilioFiscal",
  dontLockDevices: "true",
  fechaRegistro: new Date(),
  forceAdvancePayments: 42,
  habilitarBloqueoClienteCp: 42,
  habilitarPrestamoEquipos: 42,
  horaInicioPagos: new Date(),
  horaLimitePagos: new Date(),
  id: 42,
  incluirEngancheCorte: 42,
  promocionTemporal: "examplePromocionTemporal",
  referenciaPago: "true",
  sendSmsUnlinkDevicesNuovo: 42,
  telefonoValidacion: "exampleTelefonoValidacion",
  ubicacion: "exampleUbicacion",
  whouseName: "exampleWhouseName",
  whouseNo: 42,
};
const FIND_MANY_RESULT = [
  {
    ajusteDesctoFinanc: "exampleAjusteDesctoFinanc",
    ajusteMontoFijoEnganche: 42.424242424,
    autorizarIneErroneaNubarium: 42,
    autorizarNombresSinCoincidencia: 42,
    autorizarSelfieSinCoincidencia: 42,
    bloqueoVentaComputadora: 42,
    catalogoCodigoPostal: "exampleCatalogoCodigoPostal",
    confSaltarValidacionesPrestamosPersonales:
      "exampleConfSaltarValidacionesPrestamosPersonales",
    contratoAlmacen: "exampleContratoAlmacen",
    contratoAlmacenPdf: "exampleContratoAlmacenPdf",
    createdUserId: 42,
    desctoPagoOportuno: 42,
    desctoPagoOportunoPrestamos: 42,
    descuentoEspecial: 42,
    domicilioFiscal: "exampleDomicilioFiscal",
    dontLockDevices: "true",
    fechaRegistro: new Date(),
    forceAdvancePayments: 42,
    habilitarBloqueoClienteCp: 42,
    habilitarPrestamoEquipos: 42,
    horaInicioPagos: new Date(),
    horaLimitePagos: new Date(),
    id: 42,
    incluirEngancheCorte: 42,
    promocionTemporal: "examplePromocionTemporal",
    referenciaPago: "true",
    sendSmsUnlinkDevicesNuovo: 42,
    telefonoValidacion: "exampleTelefonoValidacion",
    ubicacion: "exampleUbicacion",
    whouseName: "exampleWhouseName",
    whouseNo: 42,
  },
];
const FIND_ONE_RESULT = {
  ajusteDesctoFinanc: "exampleAjusteDesctoFinanc",
  ajusteMontoFijoEnganche: 42.424242424,
  autorizarIneErroneaNubarium: 42,
  autorizarNombresSinCoincidencia: 42,
  autorizarSelfieSinCoincidencia: 42,
  bloqueoVentaComputadora: 42,
  catalogoCodigoPostal: "exampleCatalogoCodigoPostal",
  confSaltarValidacionesPrestamosPersonales:
    "exampleConfSaltarValidacionesPrestamosPersonales",
  contratoAlmacen: "exampleContratoAlmacen",
  contratoAlmacenPdf: "exampleContratoAlmacenPdf",
  createdUserId: 42,
  desctoPagoOportuno: 42,
  desctoPagoOportunoPrestamos: 42,
  descuentoEspecial: 42,
  domicilioFiscal: "exampleDomicilioFiscal",
  dontLockDevices: "true",
  fechaRegistro: new Date(),
  forceAdvancePayments: 42,
  habilitarBloqueoClienteCp: 42,
  habilitarPrestamoEquipos: 42,
  horaInicioPagos: new Date(),
  horaLimitePagos: new Date(),
  id: 42,
  incluirEngancheCorte: 42,
  promocionTemporal: "examplePromocionTemporal",
  referenciaPago: "true",
  sendSmsUnlinkDevicesNuovo: 42,
  telefonoValidacion: "exampleTelefonoValidacion",
  ubicacion: "exampleUbicacion",
  whouseName: "exampleWhouseName",
  whouseNo: 42,
};

const service = {
  createWarehouse() {
    return CREATE_RESULT;
  },
  warehouses: () => FIND_MANY_RESULT,
  warehouse: ({ where }: { where: { id: string } }) => {
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

describe("Warehouse", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: WarehouseService,
          useValue: service,
        },
      ],
      controllers: [WarehouseController],
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

  test("POST /warehouses", async () => {
    await request(app.getHttpServer())
      .post("/warehouses")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        fechaRegistro: CREATE_RESULT.fechaRegistro.toISOString(),
        horaInicioPagos: CREATE_RESULT.horaInicioPagos.toISOString(),
        horaLimitePagos: CREATE_RESULT.horaLimitePagos.toISOString(),
      });
  });

  test("GET /warehouses", async () => {
    await request(app.getHttpServer())
      .get("/warehouses")
      .expect(HttpStatus.OK)
      .expect([
        {
          ...FIND_MANY_RESULT[0],
          fechaRegistro: FIND_MANY_RESULT[0].fechaRegistro.toISOString(),
          horaInicioPagos: FIND_MANY_RESULT[0].horaInicioPagos.toISOString(),
          horaLimitePagos: FIND_MANY_RESULT[0].horaLimitePagos.toISOString(),
        },
      ]);
  });

  test("GET /warehouses/:id non existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/warehouses"}/${nonExistingId}`)
      .expect(HttpStatus.NOT_FOUND)
      .expect({
        statusCode: HttpStatus.NOT_FOUND,
        message: `No resource was found for {"${"id"}":"${nonExistingId}"}`,
        error: "Not Found",
      });
  });

  test("GET /warehouses/:id existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/warehouses"}/${existingId}`)
      .expect(HttpStatus.OK)
      .expect({
        ...FIND_ONE_RESULT,
        fechaRegistro: FIND_ONE_RESULT.fechaRegistro.toISOString(),
        horaInicioPagos: FIND_ONE_RESULT.horaInicioPagos.toISOString(),
        horaLimitePagos: FIND_ONE_RESULT.horaLimitePagos.toISOString(),
      });
  });

  test("POST /warehouses existing resource", async () => {
    const agent = request(app.getHttpServer());
    await agent
      .post("/warehouses")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        fechaRegistro: CREATE_RESULT.fechaRegistro.toISOString(),
        horaInicioPagos: CREATE_RESULT.horaInicioPagos.toISOString(),
        horaLimitePagos: CREATE_RESULT.horaLimitePagos.toISOString(),
      })
      .then(function () {
        agent
          .post("/warehouses")
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
