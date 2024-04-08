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
import { NubariumValidationsLogController } from "../nubariumValidationsLog.controller";
import { NubariumValidationsLogService } from "../nubariumValidationsLog.service";

const nonExistingId = "nonExistingId";
const existingId = "existingId";
const CREATE_INPUT = {
  fecha: new Date(),
  id: 42,
  idPasoValidacion: 42,
  intentoPaso: 42,
  nubariumValidationId: 42,
  respuesta: "exampleRespuesta",
  status: "exampleStatus",
};
const CREATE_RESULT = {
  fecha: new Date(),
  id: 42,
  idPasoValidacion: 42,
  intentoPaso: 42,
  nubariumValidationId: 42,
  respuesta: "exampleRespuesta",
  status: "exampleStatus",
};
const FIND_MANY_RESULT = [
  {
    fecha: new Date(),
    id: 42,
    idPasoValidacion: 42,
    intentoPaso: 42,
    nubariumValidationId: 42,
    respuesta: "exampleRespuesta",
    status: "exampleStatus",
  },
];
const FIND_ONE_RESULT = {
  fecha: new Date(),
  id: 42,
  idPasoValidacion: 42,
  intentoPaso: 42,
  nubariumValidationId: 42,
  respuesta: "exampleRespuesta",
  status: "exampleStatus",
};

const service = {
  createNubariumValidationsLog() {
    return CREATE_RESULT;
  },
  nubariumValidationsLogs: () => FIND_MANY_RESULT,
  nubariumValidationsLog: ({ where }: { where: { id: string } }) => {
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

describe("NubariumValidationsLog", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: NubariumValidationsLogService,
          useValue: service,
        },
      ],
      controllers: [NubariumValidationsLogController],
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

  test("POST /nubariumValidationsLogs", async () => {
    await request(app.getHttpServer())
      .post("/nubariumValidationsLogs")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        fecha: CREATE_RESULT.fecha.toISOString(),
      });
  });

  test("GET /nubariumValidationsLogs", async () => {
    await request(app.getHttpServer())
      .get("/nubariumValidationsLogs")
      .expect(HttpStatus.OK)
      .expect([
        {
          ...FIND_MANY_RESULT[0],
          fecha: FIND_MANY_RESULT[0].fecha.toISOString(),
        },
      ]);
  });

  test("GET /nubariumValidationsLogs/:id non existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/nubariumValidationsLogs"}/${nonExistingId}`)
      .expect(HttpStatus.NOT_FOUND)
      .expect({
        statusCode: HttpStatus.NOT_FOUND,
        message: `No resource was found for {"${"id"}":"${nonExistingId}"}`,
        error: "Not Found",
      });
  });

  test("GET /nubariumValidationsLogs/:id existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/nubariumValidationsLogs"}/${existingId}`)
      .expect(HttpStatus.OK)
      .expect({
        ...FIND_ONE_RESULT,
        fecha: FIND_ONE_RESULT.fecha.toISOString(),
      });
  });

  test("POST /nubariumValidationsLogs existing resource", async () => {
    const agent = request(app.getHttpServer());
    await agent
      .post("/nubariumValidationsLogs")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        fecha: CREATE_RESULT.fecha.toISOString(),
      })
      .then(function () {
        agent
          .post("/nubariumValidationsLogs")
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
