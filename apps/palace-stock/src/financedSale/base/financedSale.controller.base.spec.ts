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
import { FinancedSaleController } from "../financedSale.controller";
import { FinancedSaleService } from "../financedSale.service";

const nonExistingId = "nonExistingId";
const existingId = "existingId";
const CREATE_INPUT = {
  adminAppUnregistered: 42,
  ajusteEnganche: "exampleAjusteEnganche",
  ajustePrecioVenta: "exampleAjustePrecioVenta",
  altaPagoRecurrente: new Date(),
  authUserId: 42,
  bloqueoProgramado: new Date(),
  canceledUserId: 42,
  codigoArtIccid: "exampleCodigoArtIccid",
  codigoBloqueo: "exampleCodigoBloqueo",
  comentarios: "exampleComentarios",
  comentariosDescuento: "exampleComentariosDescuento",
  createdUserId: 42,
  customerPagoRecurrente: "exampleCustomerPagoRecurrente",
  desctoPagoOportuno: 42,
  descuentoEspecial: 42,
  enganche: 42.424242424,
  fechaCancelo: new Date(),
  fechaFinanc: new Date(),
  fechaPrimerPago: new Date(),
  fechaRegistro: new Date(),
  forceAdvancePayments: 42,
  formaPago: "exampleFormaPago",
  iccid: "exampleIccid",
  id: 42,
  idPlan: 42,
  imei: 42242424,
  imei2: "exampleImei2",
  mensajeAdvertenciaVenta: "exampleMensajeAdvertenciaVenta",
  montoDescuento: 42.424242424,
  montoFinanciado: 42.424242424,
  montoPago: 42.424242424,
  montoPagoInicial: 42.424242424,
  msisdn: "exampleMsisdn",
  numPagos: 42,
  numPagosDescuento: "exampleNumPagosDescuento",
  paymentAgreement: 42.424242424,
  porcentajeDescEng: 42,
  precioLista: 42.424242424,
  promotionId: 42,
  proveedorBloqueo: "exampleProveedorBloqueo",
  proveedorPagoRecurrente: "exampleProveedorPagoRecurrente",
  rangoFinalDescuento: new Date(),
  rangoInicialDescuento: new Date(),
  rutaArchivoDescuento: "exampleRutaArchivoDescuento",
  rutaFirma: "exampleRutaFirma",
  tasaInteres: 42.424242424,
  tasaInteresAnual: 42,
  telefono: "exampleTelefono",
  timeToReconfigNextlock: new Date(),
  tokenPagoRecurrente: "exampleTokenPagoRecurrente",
  ubicacion: "exampleUbicacion",
  ubicacionLatitud: 42.424242424,
  ubicacionLongitud: 42.424242424,
  ubicacionMapa: "exampleUbicacionMapa",
  ultimaConexion: new Date(),
  ultimaLocacion: "exampleUltimaLocacion",
  unenrolledUserId: 42,
};
const CREATE_RESULT = {
  adminAppUnregistered: 42,
  ajusteEnganche: "exampleAjusteEnganche",
  ajustePrecioVenta: "exampleAjustePrecioVenta",
  altaPagoRecurrente: new Date(),
  authUserId: 42,
  bloqueoProgramado: new Date(),
  canceledUserId: 42,
  codigoArtIccid: "exampleCodigoArtIccid",
  codigoBloqueo: "exampleCodigoBloqueo",
  comentarios: "exampleComentarios",
  comentariosDescuento: "exampleComentariosDescuento",
  createdUserId: 42,
  customerPagoRecurrente: "exampleCustomerPagoRecurrente",
  desctoPagoOportuno: 42,
  descuentoEspecial: 42,
  enganche: 42.424242424,
  fechaCancelo: new Date(),
  fechaFinanc: new Date(),
  fechaPrimerPago: new Date(),
  fechaRegistro: new Date(),
  forceAdvancePayments: 42,
  formaPago: "exampleFormaPago",
  iccid: "exampleIccid",
  id: 42,
  idPlan: 42,
  imei: 42242424,
  imei2: "exampleImei2",
  mensajeAdvertenciaVenta: "exampleMensajeAdvertenciaVenta",
  montoDescuento: 42.424242424,
  montoFinanciado: 42.424242424,
  montoPago: 42.424242424,
  montoPagoInicial: 42.424242424,
  msisdn: "exampleMsisdn",
  numPagos: 42,
  numPagosDescuento: "exampleNumPagosDescuento",
  paymentAgreement: 42.424242424,
  porcentajeDescEng: 42,
  precioLista: 42.424242424,
  promotionId: 42,
  proveedorBloqueo: "exampleProveedorBloqueo",
  proveedorPagoRecurrente: "exampleProveedorPagoRecurrente",
  rangoFinalDescuento: new Date(),
  rangoInicialDescuento: new Date(),
  rutaArchivoDescuento: "exampleRutaArchivoDescuento",
  rutaFirma: "exampleRutaFirma",
  tasaInteres: 42.424242424,
  tasaInteresAnual: 42,
  telefono: "exampleTelefono",
  timeToReconfigNextlock: new Date(),
  tokenPagoRecurrente: "exampleTokenPagoRecurrente",
  ubicacion: "exampleUbicacion",
  ubicacionLatitud: 42.424242424,
  ubicacionLongitud: 42.424242424,
  ubicacionMapa: "exampleUbicacionMapa",
  ultimaConexion: new Date(),
  ultimaLocacion: "exampleUltimaLocacion",
  unenrolledUserId: 42,
};
const FIND_MANY_RESULT = [
  {
    adminAppUnregistered: 42,
    ajusteEnganche: "exampleAjusteEnganche",
    ajustePrecioVenta: "exampleAjustePrecioVenta",
    altaPagoRecurrente: new Date(),
    authUserId: 42,
    bloqueoProgramado: new Date(),
    canceledUserId: 42,
    codigoArtIccid: "exampleCodigoArtIccid",
    codigoBloqueo: "exampleCodigoBloqueo",
    comentarios: "exampleComentarios",
    comentariosDescuento: "exampleComentariosDescuento",
    createdUserId: 42,
    customerPagoRecurrente: "exampleCustomerPagoRecurrente",
    desctoPagoOportuno: 42,
    descuentoEspecial: 42,
    enganche: 42.424242424,
    fechaCancelo: new Date(),
    fechaFinanc: new Date(),
    fechaPrimerPago: new Date(),
    fechaRegistro: new Date(),
    forceAdvancePayments: 42,
    formaPago: "exampleFormaPago",
    iccid: "exampleIccid",
    id: 42,
    idPlan: 42,
    imei: 42242424,
    imei2: "exampleImei2",
    mensajeAdvertenciaVenta: "exampleMensajeAdvertenciaVenta",
    montoDescuento: 42.424242424,
    montoFinanciado: 42.424242424,
    montoPago: 42.424242424,
    montoPagoInicial: 42.424242424,
    msisdn: "exampleMsisdn",
    numPagos: 42,
    numPagosDescuento: "exampleNumPagosDescuento",
    paymentAgreement: 42.424242424,
    porcentajeDescEng: 42,
    precioLista: 42.424242424,
    promotionId: 42,
    proveedorBloqueo: "exampleProveedorBloqueo",
    proveedorPagoRecurrente: "exampleProveedorPagoRecurrente",
    rangoFinalDescuento: new Date(),
    rangoInicialDescuento: new Date(),
    rutaArchivoDescuento: "exampleRutaArchivoDescuento",
    rutaFirma: "exampleRutaFirma",
    tasaInteres: 42.424242424,
    tasaInteresAnual: 42,
    telefono: "exampleTelefono",
    timeToReconfigNextlock: new Date(),
    tokenPagoRecurrente: "exampleTokenPagoRecurrente",
    ubicacion: "exampleUbicacion",
    ubicacionLatitud: 42.424242424,
    ubicacionLongitud: 42.424242424,
    ubicacionMapa: "exampleUbicacionMapa",
    ultimaConexion: new Date(),
    ultimaLocacion: "exampleUltimaLocacion",
    unenrolledUserId: 42,
  },
];
const FIND_ONE_RESULT = {
  adminAppUnregistered: 42,
  ajusteEnganche: "exampleAjusteEnganche",
  ajustePrecioVenta: "exampleAjustePrecioVenta",
  altaPagoRecurrente: new Date(),
  authUserId: 42,
  bloqueoProgramado: new Date(),
  canceledUserId: 42,
  codigoArtIccid: "exampleCodigoArtIccid",
  codigoBloqueo: "exampleCodigoBloqueo",
  comentarios: "exampleComentarios",
  comentariosDescuento: "exampleComentariosDescuento",
  createdUserId: 42,
  customerPagoRecurrente: "exampleCustomerPagoRecurrente",
  desctoPagoOportuno: 42,
  descuentoEspecial: 42,
  enganche: 42.424242424,
  fechaCancelo: new Date(),
  fechaFinanc: new Date(),
  fechaPrimerPago: new Date(),
  fechaRegistro: new Date(),
  forceAdvancePayments: 42,
  formaPago: "exampleFormaPago",
  iccid: "exampleIccid",
  id: 42,
  idPlan: 42,
  imei: 42242424,
  imei2: "exampleImei2",
  mensajeAdvertenciaVenta: "exampleMensajeAdvertenciaVenta",
  montoDescuento: 42.424242424,
  montoFinanciado: 42.424242424,
  montoPago: 42.424242424,
  montoPagoInicial: 42.424242424,
  msisdn: "exampleMsisdn",
  numPagos: 42,
  numPagosDescuento: "exampleNumPagosDescuento",
  paymentAgreement: 42.424242424,
  porcentajeDescEng: 42,
  precioLista: 42.424242424,
  promotionId: 42,
  proveedorBloqueo: "exampleProveedorBloqueo",
  proveedorPagoRecurrente: "exampleProveedorPagoRecurrente",
  rangoFinalDescuento: new Date(),
  rangoInicialDescuento: new Date(),
  rutaArchivoDescuento: "exampleRutaArchivoDescuento",
  rutaFirma: "exampleRutaFirma",
  tasaInteres: 42.424242424,
  tasaInteresAnual: 42,
  telefono: "exampleTelefono",
  timeToReconfigNextlock: new Date(),
  tokenPagoRecurrente: "exampleTokenPagoRecurrente",
  ubicacion: "exampleUbicacion",
  ubicacionLatitud: 42.424242424,
  ubicacionLongitud: 42.424242424,
  ubicacionMapa: "exampleUbicacionMapa",
  ultimaConexion: new Date(),
  ultimaLocacion: "exampleUltimaLocacion",
  unenrolledUserId: 42,
};

const service = {
  createFinancedSale() {
    return CREATE_RESULT;
  },
  financedSales: () => FIND_MANY_RESULT,
  financedSale: ({ where }: { where: { id: string } }) => {
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

describe("FinancedSale", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: FinancedSaleService,
          useValue: service,
        },
      ],
      controllers: [FinancedSaleController],
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

  test("POST /financedSales", async () => {
    await request(app.getHttpServer())
      .post("/financedSales")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        altaPagoRecurrente: CREATE_RESULT.altaPagoRecurrente.toISOString(),
        bloqueoProgramado: CREATE_RESULT.bloqueoProgramado.toISOString(),
        fechaCancelo: CREATE_RESULT.fechaCancelo.toISOString(),
        fechaFinanc: CREATE_RESULT.fechaFinanc.toISOString(),
        fechaPrimerPago: CREATE_RESULT.fechaPrimerPago.toISOString(),
        fechaRegistro: CREATE_RESULT.fechaRegistro.toISOString(),
        rangoFinalDescuento: CREATE_RESULT.rangoFinalDescuento.toISOString(),
        rangoInicialDescuento:
          CREATE_RESULT.rangoInicialDescuento.toISOString(),
        timeToReconfigNextlock:
          CREATE_RESULT.timeToReconfigNextlock.toISOString(),
        ultimaConexion: CREATE_RESULT.ultimaConexion.toISOString(),
      });
  });

  test("GET /financedSales", async () => {
    await request(app.getHttpServer())
      .get("/financedSales")
      .expect(HttpStatus.OK)
      .expect([
        {
          ...FIND_MANY_RESULT[0],
          altaPagoRecurrente:
            FIND_MANY_RESULT[0].altaPagoRecurrente.toISOString(),
          bloqueoProgramado:
            FIND_MANY_RESULT[0].bloqueoProgramado.toISOString(),
          fechaCancelo: FIND_MANY_RESULT[0].fechaCancelo.toISOString(),
          fechaFinanc: FIND_MANY_RESULT[0].fechaFinanc.toISOString(),
          fechaPrimerPago: FIND_MANY_RESULT[0].fechaPrimerPago.toISOString(),
          fechaRegistro: FIND_MANY_RESULT[0].fechaRegistro.toISOString(),
          rangoFinalDescuento:
            FIND_MANY_RESULT[0].rangoFinalDescuento.toISOString(),
          rangoInicialDescuento:
            FIND_MANY_RESULT[0].rangoInicialDescuento.toISOString(),
          timeToReconfigNextlock:
            FIND_MANY_RESULT[0].timeToReconfigNextlock.toISOString(),
          ultimaConexion: FIND_MANY_RESULT[0].ultimaConexion.toISOString(),
        },
      ]);
  });

  test("GET /financedSales/:id non existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/financedSales"}/${nonExistingId}`)
      .expect(HttpStatus.NOT_FOUND)
      .expect({
        statusCode: HttpStatus.NOT_FOUND,
        message: `No resource was found for {"${"id"}":"${nonExistingId}"}`,
        error: "Not Found",
      });
  });

  test("GET /financedSales/:id existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/financedSales"}/${existingId}`)
      .expect(HttpStatus.OK)
      .expect({
        ...FIND_ONE_RESULT,
        altaPagoRecurrente: FIND_ONE_RESULT.altaPagoRecurrente.toISOString(),
        bloqueoProgramado: FIND_ONE_RESULT.bloqueoProgramado.toISOString(),
        fechaCancelo: FIND_ONE_RESULT.fechaCancelo.toISOString(),
        fechaFinanc: FIND_ONE_RESULT.fechaFinanc.toISOString(),
        fechaPrimerPago: FIND_ONE_RESULT.fechaPrimerPago.toISOString(),
        fechaRegistro: FIND_ONE_RESULT.fechaRegistro.toISOString(),
        rangoFinalDescuento: FIND_ONE_RESULT.rangoFinalDescuento.toISOString(),
        rangoInicialDescuento:
          FIND_ONE_RESULT.rangoInicialDescuento.toISOString(),
        timeToReconfigNextlock:
          FIND_ONE_RESULT.timeToReconfigNextlock.toISOString(),
        ultimaConexion: FIND_ONE_RESULT.ultimaConexion.toISOString(),
      });
  });

  test("POST /financedSales existing resource", async () => {
    const agent = request(app.getHttpServer());
    await agent
      .post("/financedSales")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        altaPagoRecurrente: CREATE_RESULT.altaPagoRecurrente.toISOString(),
        bloqueoProgramado: CREATE_RESULT.bloqueoProgramado.toISOString(),
        fechaCancelo: CREATE_RESULT.fechaCancelo.toISOString(),
        fechaFinanc: CREATE_RESULT.fechaFinanc.toISOString(),
        fechaPrimerPago: CREATE_RESULT.fechaPrimerPago.toISOString(),
        fechaRegistro: CREATE_RESULT.fechaRegistro.toISOString(),
        rangoFinalDescuento: CREATE_RESULT.rangoFinalDescuento.toISOString(),
        rangoInicialDescuento:
          CREATE_RESULT.rangoInicialDescuento.toISOString(),
        timeToReconfigNextlock:
          CREATE_RESULT.timeToReconfigNextlock.toISOString(),
        ultimaConexion: CREATE_RESULT.ultimaConexion.toISOString(),
      })
      .then(function () {
        agent
          .post("/financedSales")
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
