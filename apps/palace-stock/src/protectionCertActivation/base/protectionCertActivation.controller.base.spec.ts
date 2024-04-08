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
import { ProtectionCertActivationController } from "../protectionCertActivation.controller";
import { ProtectionCertActivationService } from "../protectionCertActivation.service";

const nonExistingId = "nonExistingId";
const existingId = "existingId";
const CREATE_INPUT = {
  authUserId: 42,
  codigoBloqueo: "exampleCodigoBloqueo",
  codigoBloqueoApartado: "exampleCodigoBloqueoApartado",
  codigoSerie: "exampleCodigoSerie",
  codigoSerieApartado: "exampleCodigoSerieApartado",
  comentario: "exampleComentario",
  deductPaymentId: 42,
  devolvioEquipoApartado: "exampleDevolvioEquipoApartado",
  diffPaymentId: 42,
  estatusCertProtec: "exampleEstatusCertProtec",
  estatusReparacion: "exampleEstatusReparacion",
  fechaAct: new Date(),
  fechaAutorizacion: new Date(),
  fechaUltActualizacion: new Date(),
  id: 42,
  idUsrAct: 42,
  pagoDeducible: 42.424242424,
  pagoDiferencia: 42.424242424,
  precioLista: 42.424242424,
  precioListaApartado: 42.424242424,
  precioReparacion: 42.424242424,
  protectionCertId: 42,
  tipoProtec: "exampleTipoProtec",
  updatedUserId: 42,
};
const CREATE_RESULT = {
  authUserId: 42,
  codigoBloqueo: "exampleCodigoBloqueo",
  codigoBloqueoApartado: "exampleCodigoBloqueoApartado",
  codigoSerie: "exampleCodigoSerie",
  codigoSerieApartado: "exampleCodigoSerieApartado",
  comentario: "exampleComentario",
  deductPaymentId: 42,
  devolvioEquipoApartado: "exampleDevolvioEquipoApartado",
  diffPaymentId: 42,
  estatusCertProtec: "exampleEstatusCertProtec",
  estatusReparacion: "exampleEstatusReparacion",
  fechaAct: new Date(),
  fechaAutorizacion: new Date(),
  fechaUltActualizacion: new Date(),
  id: 42,
  idUsrAct: 42,
  pagoDeducible: 42.424242424,
  pagoDiferencia: 42.424242424,
  precioLista: 42.424242424,
  precioListaApartado: 42.424242424,
  precioReparacion: 42.424242424,
  protectionCertId: 42,
  tipoProtec: "exampleTipoProtec",
  updatedUserId: 42,
};
const FIND_MANY_RESULT = [
  {
    authUserId: 42,
    codigoBloqueo: "exampleCodigoBloqueo",
    codigoBloqueoApartado: "exampleCodigoBloqueoApartado",
    codigoSerie: "exampleCodigoSerie",
    codigoSerieApartado: "exampleCodigoSerieApartado",
    comentario: "exampleComentario",
    deductPaymentId: 42,
    devolvioEquipoApartado: "exampleDevolvioEquipoApartado",
    diffPaymentId: 42,
    estatusCertProtec: "exampleEstatusCertProtec",
    estatusReparacion: "exampleEstatusReparacion",
    fechaAct: new Date(),
    fechaAutorizacion: new Date(),
    fechaUltActualizacion: new Date(),
    id: 42,
    idUsrAct: 42,
    pagoDeducible: 42.424242424,
    pagoDiferencia: 42.424242424,
    precioLista: 42.424242424,
    precioListaApartado: 42.424242424,
    precioReparacion: 42.424242424,
    protectionCertId: 42,
    tipoProtec: "exampleTipoProtec",
    updatedUserId: 42,
  },
];
const FIND_ONE_RESULT = {
  authUserId: 42,
  codigoBloqueo: "exampleCodigoBloqueo",
  codigoBloqueoApartado: "exampleCodigoBloqueoApartado",
  codigoSerie: "exampleCodigoSerie",
  codigoSerieApartado: "exampleCodigoSerieApartado",
  comentario: "exampleComentario",
  deductPaymentId: 42,
  devolvioEquipoApartado: "exampleDevolvioEquipoApartado",
  diffPaymentId: 42,
  estatusCertProtec: "exampleEstatusCertProtec",
  estatusReparacion: "exampleEstatusReparacion",
  fechaAct: new Date(),
  fechaAutorizacion: new Date(),
  fechaUltActualizacion: new Date(),
  id: 42,
  idUsrAct: 42,
  pagoDeducible: 42.424242424,
  pagoDiferencia: 42.424242424,
  precioLista: 42.424242424,
  precioListaApartado: 42.424242424,
  precioReparacion: 42.424242424,
  protectionCertId: 42,
  tipoProtec: "exampleTipoProtec",
  updatedUserId: 42,
};

const service = {
  createProtectionCertActivation() {
    return CREATE_RESULT;
  },
  protectionCertActivations: () => FIND_MANY_RESULT,
  protectionCertActivation: ({ where }: { where: { id: string } }) => {
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

describe("ProtectionCertActivation", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: ProtectionCertActivationService,
          useValue: service,
        },
      ],
      controllers: [ProtectionCertActivationController],
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

  test("POST /protectionCertActivations", async () => {
    await request(app.getHttpServer())
      .post("/protectionCertActivations")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        fechaAct: CREATE_RESULT.fechaAct.toISOString(),
        fechaAutorizacion: CREATE_RESULT.fechaAutorizacion.toISOString(),
        fechaUltActualizacion:
          CREATE_RESULT.fechaUltActualizacion.toISOString(),
      });
  });

  test("GET /protectionCertActivations", async () => {
    await request(app.getHttpServer())
      .get("/protectionCertActivations")
      .expect(HttpStatus.OK)
      .expect([
        {
          ...FIND_MANY_RESULT[0],
          fechaAct: FIND_MANY_RESULT[0].fechaAct.toISOString(),
          fechaAutorizacion:
            FIND_MANY_RESULT[0].fechaAutorizacion.toISOString(),
          fechaUltActualizacion:
            FIND_MANY_RESULT[0].fechaUltActualizacion.toISOString(),
        },
      ]);
  });

  test("GET /protectionCertActivations/:id non existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/protectionCertActivations"}/${nonExistingId}`)
      .expect(HttpStatus.NOT_FOUND)
      .expect({
        statusCode: HttpStatus.NOT_FOUND,
        message: `No resource was found for {"${"id"}":"${nonExistingId}"}`,
        error: "Not Found",
      });
  });

  test("GET /protectionCertActivations/:id existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/protectionCertActivations"}/${existingId}`)
      .expect(HttpStatus.OK)
      .expect({
        ...FIND_ONE_RESULT,
        fechaAct: FIND_ONE_RESULT.fechaAct.toISOString(),
        fechaAutorizacion: FIND_ONE_RESULT.fechaAutorizacion.toISOString(),
        fechaUltActualizacion:
          FIND_ONE_RESULT.fechaUltActualizacion.toISOString(),
      });
  });

  test("POST /protectionCertActivations existing resource", async () => {
    const agent = request(app.getHttpServer());
    await agent
      .post("/protectionCertActivations")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        fechaAct: CREATE_RESULT.fechaAct.toISOString(),
        fechaAutorizacion: CREATE_RESULT.fechaAutorizacion.toISOString(),
        fechaUltActualizacion:
          CREATE_RESULT.fechaUltActualizacion.toISOString(),
      })
      .then(function () {
        agent
          .post("/protectionCertActivations")
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
