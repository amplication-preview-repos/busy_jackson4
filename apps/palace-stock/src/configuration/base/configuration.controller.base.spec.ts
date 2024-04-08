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
import { ConfigurationController } from "../configuration.controller";
import { ConfigurationService } from "../configuration.service";

const nonExistingId = "nonExistingId";
const existingId = "existingId";
const CREATE_INPUT = {
  angazaConf: "exampleAngazaConf",
  aspectoConf: "exampleAspectoConf",
  cartaLiquidacionDeuda: "exampleCartaLiquidacionDeuda",
  claveEmpresa: "exampleClaveEmpresa",
  conektaConf: "exampleConektaConf",
  contactoAutSuperior: "exampleContactoAutSuperior",
  contratoEmpresa: "exampleContratoEmpresa",
  contratoEmpresaPdf: "exampleContratoEmpresaPdf",
  correoEmpresa: "exampleCorreoEmpresa",
  correoEnviosConf: "exampleCorreoEnviosConf",
  createdUserId: 42,
  descripcionEmpresa: "exampleDescripcionEmpresa",
  desctoEspecialConf: "exampleDesctoEspecialConf",
  direccionEmpresa: "exampleDireccionEmpresa",
  escrituraPublica: "exampleEscrituraPublica",
  facturacionConf: "exampleFacturacionConf",
  fechaRegistro: new Date(),
  firmaRepresentante: "exampleFirmaRepresentante",
  googleConf: "exampleGoogleConf",
  id: 42,
  linkSucursalesMaps: "exampleLinkSucursalesMaps",
  mediosContacto: "exampleMediosContacto",
  nombreEmpresa: "exampleNombreEmpresa",
  notarioPublico: "exampleNotarioPublico",
  nubariumConf: "exampleNubariumConf",
  nuovoConf: "exampleNuovoConf",
  pagosConf: "examplePagosConf",
  paycodeConf: "examplePaycodeConf",
  razonSocialEmpresa: "exampleRazonSocialEmpresa",
  recompraAppConf: "exampleRecompraAppConf",
  registroPublico: "exampleRegistroPublico",
  representanteEmpresa: "exampleRepresentanteEmpresa",
  rfcEmpresa: "exampleRfcEmpresa",
  scoreMaxConf: "exampleScoreMaxConf",
  sistemaConf: "exampleSistemaConf",
  sitioEmpresa: "exampleSitioEmpresa",
  smsMasivosConf: "exampleSmsMasivosConf",
  stripeConf: "exampleStripeConf",
  wtelecomRecargasConf: "exampleWtelecomRecargasConf",
};
const CREATE_RESULT = {
  angazaConf: "exampleAngazaConf",
  aspectoConf: "exampleAspectoConf",
  cartaLiquidacionDeuda: "exampleCartaLiquidacionDeuda",
  claveEmpresa: "exampleClaveEmpresa",
  conektaConf: "exampleConektaConf",
  contactoAutSuperior: "exampleContactoAutSuperior",
  contratoEmpresa: "exampleContratoEmpresa",
  contratoEmpresaPdf: "exampleContratoEmpresaPdf",
  correoEmpresa: "exampleCorreoEmpresa",
  correoEnviosConf: "exampleCorreoEnviosConf",
  createdUserId: 42,
  descripcionEmpresa: "exampleDescripcionEmpresa",
  desctoEspecialConf: "exampleDesctoEspecialConf",
  direccionEmpresa: "exampleDireccionEmpresa",
  escrituraPublica: "exampleEscrituraPublica",
  facturacionConf: "exampleFacturacionConf",
  fechaRegistro: new Date(),
  firmaRepresentante: "exampleFirmaRepresentante",
  googleConf: "exampleGoogleConf",
  id: 42,
  linkSucursalesMaps: "exampleLinkSucursalesMaps",
  mediosContacto: "exampleMediosContacto",
  nombreEmpresa: "exampleNombreEmpresa",
  notarioPublico: "exampleNotarioPublico",
  nubariumConf: "exampleNubariumConf",
  nuovoConf: "exampleNuovoConf",
  pagosConf: "examplePagosConf",
  paycodeConf: "examplePaycodeConf",
  razonSocialEmpresa: "exampleRazonSocialEmpresa",
  recompraAppConf: "exampleRecompraAppConf",
  registroPublico: "exampleRegistroPublico",
  representanteEmpresa: "exampleRepresentanteEmpresa",
  rfcEmpresa: "exampleRfcEmpresa",
  scoreMaxConf: "exampleScoreMaxConf",
  sistemaConf: "exampleSistemaConf",
  sitioEmpresa: "exampleSitioEmpresa",
  smsMasivosConf: "exampleSmsMasivosConf",
  stripeConf: "exampleStripeConf",
  wtelecomRecargasConf: "exampleWtelecomRecargasConf",
};
const FIND_MANY_RESULT = [
  {
    angazaConf: "exampleAngazaConf",
    aspectoConf: "exampleAspectoConf",
    cartaLiquidacionDeuda: "exampleCartaLiquidacionDeuda",
    claveEmpresa: "exampleClaveEmpresa",
    conektaConf: "exampleConektaConf",
    contactoAutSuperior: "exampleContactoAutSuperior",
    contratoEmpresa: "exampleContratoEmpresa",
    contratoEmpresaPdf: "exampleContratoEmpresaPdf",
    correoEmpresa: "exampleCorreoEmpresa",
    correoEnviosConf: "exampleCorreoEnviosConf",
    createdUserId: 42,
    descripcionEmpresa: "exampleDescripcionEmpresa",
    desctoEspecialConf: "exampleDesctoEspecialConf",
    direccionEmpresa: "exampleDireccionEmpresa",
    escrituraPublica: "exampleEscrituraPublica",
    facturacionConf: "exampleFacturacionConf",
    fechaRegistro: new Date(),
    firmaRepresentante: "exampleFirmaRepresentante",
    googleConf: "exampleGoogleConf",
    id: 42,
    linkSucursalesMaps: "exampleLinkSucursalesMaps",
    mediosContacto: "exampleMediosContacto",
    nombreEmpresa: "exampleNombreEmpresa",
    notarioPublico: "exampleNotarioPublico",
    nubariumConf: "exampleNubariumConf",
    nuovoConf: "exampleNuovoConf",
    pagosConf: "examplePagosConf",
    paycodeConf: "examplePaycodeConf",
    razonSocialEmpresa: "exampleRazonSocialEmpresa",
    recompraAppConf: "exampleRecompraAppConf",
    registroPublico: "exampleRegistroPublico",
    representanteEmpresa: "exampleRepresentanteEmpresa",
    rfcEmpresa: "exampleRfcEmpresa",
    scoreMaxConf: "exampleScoreMaxConf",
    sistemaConf: "exampleSistemaConf",
    sitioEmpresa: "exampleSitioEmpresa",
    smsMasivosConf: "exampleSmsMasivosConf",
    stripeConf: "exampleStripeConf",
    wtelecomRecargasConf: "exampleWtelecomRecargasConf",
  },
];
const FIND_ONE_RESULT = {
  angazaConf: "exampleAngazaConf",
  aspectoConf: "exampleAspectoConf",
  cartaLiquidacionDeuda: "exampleCartaLiquidacionDeuda",
  claveEmpresa: "exampleClaveEmpresa",
  conektaConf: "exampleConektaConf",
  contactoAutSuperior: "exampleContactoAutSuperior",
  contratoEmpresa: "exampleContratoEmpresa",
  contratoEmpresaPdf: "exampleContratoEmpresaPdf",
  correoEmpresa: "exampleCorreoEmpresa",
  correoEnviosConf: "exampleCorreoEnviosConf",
  createdUserId: 42,
  descripcionEmpresa: "exampleDescripcionEmpresa",
  desctoEspecialConf: "exampleDesctoEspecialConf",
  direccionEmpresa: "exampleDireccionEmpresa",
  escrituraPublica: "exampleEscrituraPublica",
  facturacionConf: "exampleFacturacionConf",
  fechaRegistro: new Date(),
  firmaRepresentante: "exampleFirmaRepresentante",
  googleConf: "exampleGoogleConf",
  id: 42,
  linkSucursalesMaps: "exampleLinkSucursalesMaps",
  mediosContacto: "exampleMediosContacto",
  nombreEmpresa: "exampleNombreEmpresa",
  notarioPublico: "exampleNotarioPublico",
  nubariumConf: "exampleNubariumConf",
  nuovoConf: "exampleNuovoConf",
  pagosConf: "examplePagosConf",
  paycodeConf: "examplePaycodeConf",
  razonSocialEmpresa: "exampleRazonSocialEmpresa",
  recompraAppConf: "exampleRecompraAppConf",
  registroPublico: "exampleRegistroPublico",
  representanteEmpresa: "exampleRepresentanteEmpresa",
  rfcEmpresa: "exampleRfcEmpresa",
  scoreMaxConf: "exampleScoreMaxConf",
  sistemaConf: "exampleSistemaConf",
  sitioEmpresa: "exampleSitioEmpresa",
  smsMasivosConf: "exampleSmsMasivosConf",
  stripeConf: "exampleStripeConf",
  wtelecomRecargasConf: "exampleWtelecomRecargasConf",
};

const service = {
  createConfiguration() {
    return CREATE_RESULT;
  },
  configurations: () => FIND_MANY_RESULT,
  configuration: ({ where }: { where: { id: string } }) => {
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

describe("Configuration", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: ConfigurationService,
          useValue: service,
        },
      ],
      controllers: [ConfigurationController],
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

  test("POST /configurations", async () => {
    await request(app.getHttpServer())
      .post("/configurations")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        fechaRegistro: CREATE_RESULT.fechaRegistro.toISOString(),
      });
  });

  test("GET /configurations", async () => {
    await request(app.getHttpServer())
      .get("/configurations")
      .expect(HttpStatus.OK)
      .expect([
        {
          ...FIND_MANY_RESULT[0],
          fechaRegistro: FIND_MANY_RESULT[0].fechaRegistro.toISOString(),
        },
      ]);
  });

  test("GET /configurations/:id non existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/configurations"}/${nonExistingId}`)
      .expect(HttpStatus.NOT_FOUND)
      .expect({
        statusCode: HttpStatus.NOT_FOUND,
        message: `No resource was found for {"${"id"}":"${nonExistingId}"}`,
        error: "Not Found",
      });
  });

  test("GET /configurations/:id existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/configurations"}/${existingId}`)
      .expect(HttpStatus.OK)
      .expect({
        ...FIND_ONE_RESULT,
        fechaRegistro: FIND_ONE_RESULT.fechaRegistro.toISOString(),
      });
  });

  test("POST /configurations existing resource", async () => {
    const agent = request(app.getHttpServer());
    await agent
      .post("/configurations")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        fechaRegistro: CREATE_RESULT.fechaRegistro.toISOString(),
      })
      .then(function () {
        agent
          .post("/configurations")
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
