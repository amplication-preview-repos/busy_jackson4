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
import { CustomerController } from "../customer.controller";
import { CustomerService } from "../customer.service";

const nonExistingId = "nonExistingId";
const existingId = "existingId";
const CREATE_INPUT = {
  antiguedadTrabajo: "exampleAntiguedadTrabajo",
  apellido1Cliente: "exampleApellido1Cliente",
  apellido2Cliente: "exampleApellido2Cliente",
  billingCfdiUseId: 42,
  billingFiscalRegimeId: 42,
  ciudadActualCte: "exampleCiudadActualCte",
  ciudadCte: "exampleCiudadCte",
  ciudadRazSoc: "exampleCiudadRazSoc",
  clabePaycode: "exampleClabePaycode",
  claveIdCliente: "exampleClaveIdCliente",
  coloniaActualCte: "exampleColoniaActualCte",
  coloniaCte: "exampleColoniaCte",
  coloniaRazSoc: "exampleColoniaRazSoc",
  conekta: "true",
  correoCte: "exampleCorreoCte",
  correoRazSoc: "exampleCorreoRazSoc",
  cpActualCte: "exampleCpActualCte",
  cpCte: "exampleCpCte",
  cpRazSoc: "exampleCpRazSoc",
  curpCliente: "exampleCurpCliente",
  direccionActualCte: "exampleDireccionActualCte",
  direccionCte: "exampleDireccionCte",
  direccionRazSoc: "exampleDireccionRazSoc",
  domicilioTrabajo: "exampleDomicilioTrabajo",
  edadCliente: "exampleEdadCliente",
  enganchePromoLealtad: 42.424242424,
  estadoRepActualCte: "exampleEstadoRepActualCte",
  estadoRepCte: "exampleEstadoRepCte",
  estadoRepRazSoc: "exampleEstadoRepRazSoc",
  estatusSeguroVida: "true",
  fechaActivacionSeguro: new Date(),
  fechaAltaCliente: new Date(),
  fechaRegistro: new Date(),
  fechaUltCambio: new Date(),
  folioSeguroVida: "exampleFolioSeguroVida",
  id: 42,
  lugarTrabajo: "exampleLugarTrabajo",
  montoDisponibleEnganche: 42.424242424,
  nombreCompletoCliente: "exampleNombreCompletoCliente",
  nombresCliente: "exampleNombresCliente",
  nomRef1Cliente: "exampleNomRef1Cliente",
  nomRef2Cliente: "exampleNomRef2Cliente",
  nubariumScore: "exampleNubariumScore",
  numExtCte: "exampleNumExtCte",
  numExtRazSoc: "exampleNumExtRazSoc",
  numIntCte: "exampleNumIntCte",
  numIntRazSoc: "exampleNumIntRazSoc",
  numTelCte: "exampleNumTelCte",
  numTelFijoCte: "exampleNumTelFijoCte",
  numTelRazSoc: "exampleNumTelRazSoc",
  paisRazSoc: "examplePaisRazSoc",
  puestoTrabajo: "examplePuestoTrabajo",
  qidAngaza: "exampleQidAngaza",
  razonSocialCte: "exampleRazonSocialCte",
  rfcCte: "exampleRfcCte",
  rfcPersonalCte: "exampleRfcPersonalCte",
  rutaFirma: "exampleRutaFirma",
  salarioMensualTrabajo: 42.424242424,
  scoreMaxValue: "exampleScoreMaxValue",
  secondaryTelephoneNumber: "exampleSecondaryTelephoneNumber",
  telRef1Cliente: "exampleTelRef1Cliente",
  telRef2Cliente: "exampleTelRef2Cliente",
  tipoIdCliente: "exampleTipoIdCliente",
};
const CREATE_RESULT = {
  antiguedadTrabajo: "exampleAntiguedadTrabajo",
  apellido1Cliente: "exampleApellido1Cliente",
  apellido2Cliente: "exampleApellido2Cliente",
  billingCfdiUseId: 42,
  billingFiscalRegimeId: 42,
  ciudadActualCte: "exampleCiudadActualCte",
  ciudadCte: "exampleCiudadCte",
  ciudadRazSoc: "exampleCiudadRazSoc",
  clabePaycode: "exampleClabePaycode",
  claveIdCliente: "exampleClaveIdCliente",
  coloniaActualCte: "exampleColoniaActualCte",
  coloniaCte: "exampleColoniaCte",
  coloniaRazSoc: "exampleColoniaRazSoc",
  conekta: "true",
  correoCte: "exampleCorreoCte",
  correoRazSoc: "exampleCorreoRazSoc",
  cpActualCte: "exampleCpActualCte",
  cpCte: "exampleCpCte",
  cpRazSoc: "exampleCpRazSoc",
  curpCliente: "exampleCurpCliente",
  direccionActualCte: "exampleDireccionActualCte",
  direccionCte: "exampleDireccionCte",
  direccionRazSoc: "exampleDireccionRazSoc",
  domicilioTrabajo: "exampleDomicilioTrabajo",
  edadCliente: "exampleEdadCliente",
  enganchePromoLealtad: 42.424242424,
  estadoRepActualCte: "exampleEstadoRepActualCte",
  estadoRepCte: "exampleEstadoRepCte",
  estadoRepRazSoc: "exampleEstadoRepRazSoc",
  estatusSeguroVida: "true",
  fechaActivacionSeguro: new Date(),
  fechaAltaCliente: new Date(),
  fechaRegistro: new Date(),
  fechaUltCambio: new Date(),
  folioSeguroVida: "exampleFolioSeguroVida",
  id: 42,
  lugarTrabajo: "exampleLugarTrabajo",
  montoDisponibleEnganche: 42.424242424,
  nombreCompletoCliente: "exampleNombreCompletoCliente",
  nombresCliente: "exampleNombresCliente",
  nomRef1Cliente: "exampleNomRef1Cliente",
  nomRef2Cliente: "exampleNomRef2Cliente",
  nubariumScore: "exampleNubariumScore",
  numExtCte: "exampleNumExtCte",
  numExtRazSoc: "exampleNumExtRazSoc",
  numIntCte: "exampleNumIntCte",
  numIntRazSoc: "exampleNumIntRazSoc",
  numTelCte: "exampleNumTelCte",
  numTelFijoCte: "exampleNumTelFijoCte",
  numTelRazSoc: "exampleNumTelRazSoc",
  paisRazSoc: "examplePaisRazSoc",
  puestoTrabajo: "examplePuestoTrabajo",
  qidAngaza: "exampleQidAngaza",
  razonSocialCte: "exampleRazonSocialCte",
  rfcCte: "exampleRfcCte",
  rfcPersonalCte: "exampleRfcPersonalCte",
  rutaFirma: "exampleRutaFirma",
  salarioMensualTrabajo: 42.424242424,
  scoreMaxValue: "exampleScoreMaxValue",
  secondaryTelephoneNumber: "exampleSecondaryTelephoneNumber",
  telRef1Cliente: "exampleTelRef1Cliente",
  telRef2Cliente: "exampleTelRef2Cliente",
  tipoIdCliente: "exampleTipoIdCliente",
};
const FIND_MANY_RESULT = [
  {
    antiguedadTrabajo: "exampleAntiguedadTrabajo",
    apellido1Cliente: "exampleApellido1Cliente",
    apellido2Cliente: "exampleApellido2Cliente",
    billingCfdiUseId: 42,
    billingFiscalRegimeId: 42,
    ciudadActualCte: "exampleCiudadActualCte",
    ciudadCte: "exampleCiudadCte",
    ciudadRazSoc: "exampleCiudadRazSoc",
    clabePaycode: "exampleClabePaycode",
    claveIdCliente: "exampleClaveIdCliente",
    coloniaActualCte: "exampleColoniaActualCte",
    coloniaCte: "exampleColoniaCte",
    coloniaRazSoc: "exampleColoniaRazSoc",
    conekta: "true",
    correoCte: "exampleCorreoCte",
    correoRazSoc: "exampleCorreoRazSoc",
    cpActualCte: "exampleCpActualCte",
    cpCte: "exampleCpCte",
    cpRazSoc: "exampleCpRazSoc",
    curpCliente: "exampleCurpCliente",
    direccionActualCte: "exampleDireccionActualCte",
    direccionCte: "exampleDireccionCte",
    direccionRazSoc: "exampleDireccionRazSoc",
    domicilioTrabajo: "exampleDomicilioTrabajo",
    edadCliente: "exampleEdadCliente",
    enganchePromoLealtad: 42.424242424,
    estadoRepActualCte: "exampleEstadoRepActualCte",
    estadoRepCte: "exampleEstadoRepCte",
    estadoRepRazSoc: "exampleEstadoRepRazSoc",
    estatusSeguroVida: "true",
    fechaActivacionSeguro: new Date(),
    fechaAltaCliente: new Date(),
    fechaRegistro: new Date(),
    fechaUltCambio: new Date(),
    folioSeguroVida: "exampleFolioSeguroVida",
    id: 42,
    lugarTrabajo: "exampleLugarTrabajo",
    montoDisponibleEnganche: 42.424242424,
    nombreCompletoCliente: "exampleNombreCompletoCliente",
    nombresCliente: "exampleNombresCliente",
    nomRef1Cliente: "exampleNomRef1Cliente",
    nomRef2Cliente: "exampleNomRef2Cliente",
    nubariumScore: "exampleNubariumScore",
    numExtCte: "exampleNumExtCte",
    numExtRazSoc: "exampleNumExtRazSoc",
    numIntCte: "exampleNumIntCte",
    numIntRazSoc: "exampleNumIntRazSoc",
    numTelCte: "exampleNumTelCte",
    numTelFijoCte: "exampleNumTelFijoCte",
    numTelRazSoc: "exampleNumTelRazSoc",
    paisRazSoc: "examplePaisRazSoc",
    puestoTrabajo: "examplePuestoTrabajo",
    qidAngaza: "exampleQidAngaza",
    razonSocialCte: "exampleRazonSocialCte",
    rfcCte: "exampleRfcCte",
    rfcPersonalCte: "exampleRfcPersonalCte",
    rutaFirma: "exampleRutaFirma",
    salarioMensualTrabajo: 42.424242424,
    scoreMaxValue: "exampleScoreMaxValue",
    secondaryTelephoneNumber: "exampleSecondaryTelephoneNumber",
    telRef1Cliente: "exampleTelRef1Cliente",
    telRef2Cliente: "exampleTelRef2Cliente",
    tipoIdCliente: "exampleTipoIdCliente",
  },
];
const FIND_ONE_RESULT = {
  antiguedadTrabajo: "exampleAntiguedadTrabajo",
  apellido1Cliente: "exampleApellido1Cliente",
  apellido2Cliente: "exampleApellido2Cliente",
  billingCfdiUseId: 42,
  billingFiscalRegimeId: 42,
  ciudadActualCte: "exampleCiudadActualCte",
  ciudadCte: "exampleCiudadCte",
  ciudadRazSoc: "exampleCiudadRazSoc",
  clabePaycode: "exampleClabePaycode",
  claveIdCliente: "exampleClaveIdCliente",
  coloniaActualCte: "exampleColoniaActualCte",
  coloniaCte: "exampleColoniaCte",
  coloniaRazSoc: "exampleColoniaRazSoc",
  conekta: "true",
  correoCte: "exampleCorreoCte",
  correoRazSoc: "exampleCorreoRazSoc",
  cpActualCte: "exampleCpActualCte",
  cpCte: "exampleCpCte",
  cpRazSoc: "exampleCpRazSoc",
  curpCliente: "exampleCurpCliente",
  direccionActualCte: "exampleDireccionActualCte",
  direccionCte: "exampleDireccionCte",
  direccionRazSoc: "exampleDireccionRazSoc",
  domicilioTrabajo: "exampleDomicilioTrabajo",
  edadCliente: "exampleEdadCliente",
  enganchePromoLealtad: 42.424242424,
  estadoRepActualCte: "exampleEstadoRepActualCte",
  estadoRepCte: "exampleEstadoRepCte",
  estadoRepRazSoc: "exampleEstadoRepRazSoc",
  estatusSeguroVida: "true",
  fechaActivacionSeguro: new Date(),
  fechaAltaCliente: new Date(),
  fechaRegistro: new Date(),
  fechaUltCambio: new Date(),
  folioSeguroVida: "exampleFolioSeguroVida",
  id: 42,
  lugarTrabajo: "exampleLugarTrabajo",
  montoDisponibleEnganche: 42.424242424,
  nombreCompletoCliente: "exampleNombreCompletoCliente",
  nombresCliente: "exampleNombresCliente",
  nomRef1Cliente: "exampleNomRef1Cliente",
  nomRef2Cliente: "exampleNomRef2Cliente",
  nubariumScore: "exampleNubariumScore",
  numExtCte: "exampleNumExtCte",
  numExtRazSoc: "exampleNumExtRazSoc",
  numIntCte: "exampleNumIntCte",
  numIntRazSoc: "exampleNumIntRazSoc",
  numTelCte: "exampleNumTelCte",
  numTelFijoCte: "exampleNumTelFijoCte",
  numTelRazSoc: "exampleNumTelRazSoc",
  paisRazSoc: "examplePaisRazSoc",
  puestoTrabajo: "examplePuestoTrabajo",
  qidAngaza: "exampleQidAngaza",
  razonSocialCte: "exampleRazonSocialCte",
  rfcCte: "exampleRfcCte",
  rfcPersonalCte: "exampleRfcPersonalCte",
  rutaFirma: "exampleRutaFirma",
  salarioMensualTrabajo: 42.424242424,
  scoreMaxValue: "exampleScoreMaxValue",
  secondaryTelephoneNumber: "exampleSecondaryTelephoneNumber",
  telRef1Cliente: "exampleTelRef1Cliente",
  telRef2Cliente: "exampleTelRef2Cliente",
  tipoIdCliente: "exampleTipoIdCliente",
};

const service = {
  createCustomer() {
    return CREATE_RESULT;
  },
  customers: () => FIND_MANY_RESULT,
  customer: ({ where }: { where: { id: string } }) => {
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

describe("Customer", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: CustomerService,
          useValue: service,
        },
      ],
      controllers: [CustomerController],
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

  test("POST /customers", async () => {
    await request(app.getHttpServer())
      .post("/customers")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        fechaActivacionSeguro:
          CREATE_RESULT.fechaActivacionSeguro.toISOString(),
        fechaAltaCliente: CREATE_RESULT.fechaAltaCliente.toISOString(),
        fechaRegistro: CREATE_RESULT.fechaRegistro.toISOString(),
        fechaUltCambio: CREATE_RESULT.fechaUltCambio.toISOString(),
      });
  });

  test("GET /customers", async () => {
    await request(app.getHttpServer())
      .get("/customers")
      .expect(HttpStatus.OK)
      .expect([
        {
          ...FIND_MANY_RESULT[0],
          fechaActivacionSeguro:
            FIND_MANY_RESULT[0].fechaActivacionSeguro.toISOString(),
          fechaAltaCliente: FIND_MANY_RESULT[0].fechaAltaCliente.toISOString(),
          fechaRegistro: FIND_MANY_RESULT[0].fechaRegistro.toISOString(),
          fechaUltCambio: FIND_MANY_RESULT[0].fechaUltCambio.toISOString(),
        },
      ]);
  });

  test("GET /customers/:id non existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/customers"}/${nonExistingId}`)
      .expect(HttpStatus.NOT_FOUND)
      .expect({
        statusCode: HttpStatus.NOT_FOUND,
        message: `No resource was found for {"${"id"}":"${nonExistingId}"}`,
        error: "Not Found",
      });
  });

  test("GET /customers/:id existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/customers"}/${existingId}`)
      .expect(HttpStatus.OK)
      .expect({
        ...FIND_ONE_RESULT,
        fechaActivacionSeguro:
          FIND_ONE_RESULT.fechaActivacionSeguro.toISOString(),
        fechaAltaCliente: FIND_ONE_RESULT.fechaAltaCliente.toISOString(),
        fechaRegistro: FIND_ONE_RESULT.fechaRegistro.toISOString(),
        fechaUltCambio: FIND_ONE_RESULT.fechaUltCambio.toISOString(),
      });
  });

  test("POST /customers existing resource", async () => {
    const agent = request(app.getHttpServer());
    await agent
      .post("/customers")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        fechaActivacionSeguro:
          CREATE_RESULT.fechaActivacionSeguro.toISOString(),
        fechaAltaCliente: CREATE_RESULT.fechaAltaCliente.toISOString(),
        fechaRegistro: CREATE_RESULT.fechaRegistro.toISOString(),
        fechaUltCambio: CREATE_RESULT.fechaUltCambio.toISOString(),
      })
      .then(function () {
        agent
          .post("/customers")
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
