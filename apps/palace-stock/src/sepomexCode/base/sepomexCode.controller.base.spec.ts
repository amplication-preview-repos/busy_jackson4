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
import { SepomexCodeController } from "../sepomexCode.controller";
import { SepomexCodeService } from "../sepomexCode.service";

const nonExistingId = "nonExistingId";
const existingId = "existingId";
const CREATE_INPUT = {
  cCp: 42,
  cCveCiudad: 42,
  cEstado: 42,
  cMnpio: 42,
  cOficina: 42,
  cTipoAsenta: 42,
  dAsenta: "exampleDAsenta",
  dCiudad: "exampleDCiudad",
  dCodigo: 42,
  dCp: 42,
  dEstado: "exampleDEstado",
  dMnpio: "exampleDMnpio",
  dTipoAsenta: "exampleDTipoAsenta",
  id: 42,
  idAsentaCpcons: 42,
};
const CREATE_RESULT = {
  cCp: 42,
  cCveCiudad: 42,
  cEstado: 42,
  cMnpio: 42,
  cOficina: 42,
  cTipoAsenta: 42,
  dAsenta: "exampleDAsenta",
  dCiudad: "exampleDCiudad",
  dCodigo: 42,
  dCp: 42,
  dEstado: "exampleDEstado",
  dMnpio: "exampleDMnpio",
  dTipoAsenta: "exampleDTipoAsenta",
  id: 42,
  idAsentaCpcons: 42,
};
const FIND_MANY_RESULT = [
  {
    cCp: 42,
    cCveCiudad: 42,
    cEstado: 42,
    cMnpio: 42,
    cOficina: 42,
    cTipoAsenta: 42,
    dAsenta: "exampleDAsenta",
    dCiudad: "exampleDCiudad",
    dCodigo: 42,
    dCp: 42,
    dEstado: "exampleDEstado",
    dMnpio: "exampleDMnpio",
    dTipoAsenta: "exampleDTipoAsenta",
    id: 42,
    idAsentaCpcons: 42,
  },
];
const FIND_ONE_RESULT = {
  cCp: 42,
  cCveCiudad: 42,
  cEstado: 42,
  cMnpio: 42,
  cOficina: 42,
  cTipoAsenta: 42,
  dAsenta: "exampleDAsenta",
  dCiudad: "exampleDCiudad",
  dCodigo: 42,
  dCp: 42,
  dEstado: "exampleDEstado",
  dMnpio: "exampleDMnpio",
  dTipoAsenta: "exampleDTipoAsenta",
  id: 42,
  idAsentaCpcons: 42,
};

const service = {
  createSepomexCode() {
    return CREATE_RESULT;
  },
  sepomexCodes: () => FIND_MANY_RESULT,
  sepomexCode: ({ where }: { where: { id: string } }) => {
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

describe("SepomexCode", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: SepomexCodeService,
          useValue: service,
        },
      ],
      controllers: [SepomexCodeController],
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

  test("POST /sepomexCodes", async () => {
    await request(app.getHttpServer())
      .post("/sepomexCodes")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect(CREATE_RESULT);
  });

  test("GET /sepomexCodes", async () => {
    await request(app.getHttpServer())
      .get("/sepomexCodes")
      .expect(HttpStatus.OK)
      .expect([FIND_MANY_RESULT[0]]);
  });

  test("GET /sepomexCodes/:id non existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/sepomexCodes"}/${nonExistingId}`)
      .expect(HttpStatus.NOT_FOUND)
      .expect({
        statusCode: HttpStatus.NOT_FOUND,
        message: `No resource was found for {"${"id"}":"${nonExistingId}"}`,
        error: "Not Found",
      });
  });

  test("GET /sepomexCodes/:id existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/sepomexCodes"}/${existingId}`)
      .expect(HttpStatus.OK)
      .expect(FIND_ONE_RESULT);
  });

  test("POST /sepomexCodes existing resource", async () => {
    const agent = request(app.getHttpServer());
    await agent
      .post("/sepomexCodes")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect(CREATE_RESULT)
      .then(function () {
        agent
          .post("/sepomexCodes")
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
