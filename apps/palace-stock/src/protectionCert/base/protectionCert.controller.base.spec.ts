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
import { ProtectionCertController } from "../protectionCert.controller";
import { ProtectionCertService } from "../protectionCert.service";

const nonExistingId = "nonExistingId";
const existingId = "existingId";
const CREATE_INPUT = {
  certFolio: 42,
  createdUserId: 42,
  fechaCancelacion: new Date(),
  fechaRegistro: new Date(),
  id: 42,
  motivoCancelacion: "exampleMotivoCancelacion",
};
const CREATE_RESULT = {
  certFolio: 42,
  createdUserId: 42,
  fechaCancelacion: new Date(),
  fechaRegistro: new Date(),
  id: 42,
  motivoCancelacion: "exampleMotivoCancelacion",
};
const FIND_MANY_RESULT = [
  {
    certFolio: 42,
    createdUserId: 42,
    fechaCancelacion: new Date(),
    fechaRegistro: new Date(),
    id: 42,
    motivoCancelacion: "exampleMotivoCancelacion",
  },
];
const FIND_ONE_RESULT = {
  certFolio: 42,
  createdUserId: 42,
  fechaCancelacion: new Date(),
  fechaRegistro: new Date(),
  id: 42,
  motivoCancelacion: "exampleMotivoCancelacion",
};

const service = {
  createProtectionCert() {
    return CREATE_RESULT;
  },
  protectionCerts: () => FIND_MANY_RESULT,
  protectionCert: ({ where }: { where: { id: string } }) => {
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

describe("ProtectionCert", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: ProtectionCertService,
          useValue: service,
        },
      ],
      controllers: [ProtectionCertController],
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

  test("POST /protectionCerts", async () => {
    await request(app.getHttpServer())
      .post("/protectionCerts")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        fechaCancelacion: CREATE_RESULT.fechaCancelacion.toISOString(),
        fechaRegistro: CREATE_RESULT.fechaRegistro.toISOString(),
      });
  });

  test("GET /protectionCerts", async () => {
    await request(app.getHttpServer())
      .get("/protectionCerts")
      .expect(HttpStatus.OK)
      .expect([
        {
          ...FIND_MANY_RESULT[0],
          fechaCancelacion: FIND_MANY_RESULT[0].fechaCancelacion.toISOString(),
          fechaRegistro: FIND_MANY_RESULT[0].fechaRegistro.toISOString(),
        },
      ]);
  });

  test("GET /protectionCerts/:id non existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/protectionCerts"}/${nonExistingId}`)
      .expect(HttpStatus.NOT_FOUND)
      .expect({
        statusCode: HttpStatus.NOT_FOUND,
        message: `No resource was found for {"${"id"}":"${nonExistingId}"}`,
        error: "Not Found",
      });
  });

  test("GET /protectionCerts/:id existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/protectionCerts"}/${existingId}`)
      .expect(HttpStatus.OK)
      .expect({
        ...FIND_ONE_RESULT,
        fechaCancelacion: FIND_ONE_RESULT.fechaCancelacion.toISOString(),
        fechaRegistro: FIND_ONE_RESULT.fechaRegistro.toISOString(),
      });
  });

  test("POST /protectionCerts existing resource", async () => {
    const agent = request(app.getHttpServer());
    await agent
      .post("/protectionCerts")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        fechaCancelacion: CREATE_RESULT.fechaCancelacion.toISOString(),
        fechaRegistro: CREATE_RESULT.fechaRegistro.toISOString(),
      })
      .then(function () {
        agent
          .post("/protectionCerts")
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
