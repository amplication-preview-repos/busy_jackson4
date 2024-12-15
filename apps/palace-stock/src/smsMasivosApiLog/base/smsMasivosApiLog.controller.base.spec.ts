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
import { SmsMasivosApiLogController } from "../smsMasivosApiLog.controller";
import { SmsMasivosApiLogService } from "../smsMasivosApiLog.service";

const nonExistingId = "nonExistingId";
const existingId = "existingId";
const CREATE_INPUT = {
  createdUserId: 42,
  fechaEnvio: new Date(),
  fechaHoraValidacionToken: new Date(),
  headers: "exampleHeaders",
  horaEnvio: new Date(),
  id: 42,
  metodoLlamado: "exampleMetodoLlamado",
  rastreoLlamada: "exampleRastreoLlamada",
  respuestaSms: "exampleRespuestaSms",
  telefono: "exampleTelefono",
  textoSms: "exampleTextoSms",
  tokenGenerado: "exampleTokenGenerado",
  url: "exampleUrl",
};
const CREATE_RESULT = {
  createdUserId: 42,
  fechaEnvio: new Date(),
  fechaHoraValidacionToken: new Date(),
  headers: "exampleHeaders",
  horaEnvio: new Date(),
  id: 42,
  metodoLlamado: "exampleMetodoLlamado",
  rastreoLlamada: "exampleRastreoLlamada",
  respuestaSms: "exampleRespuestaSms",
  telefono: "exampleTelefono",
  textoSms: "exampleTextoSms",
  tokenGenerado: "exampleTokenGenerado",
  url: "exampleUrl",
};
const FIND_MANY_RESULT = [
  {
    createdUserId: 42,
    fechaEnvio: new Date(),
    fechaHoraValidacionToken: new Date(),
    headers: "exampleHeaders",
    horaEnvio: new Date(),
    id: 42,
    metodoLlamado: "exampleMetodoLlamado",
    rastreoLlamada: "exampleRastreoLlamada",
    respuestaSms: "exampleRespuestaSms",
    telefono: "exampleTelefono",
    textoSms: "exampleTextoSms",
    tokenGenerado: "exampleTokenGenerado",
    url: "exampleUrl",
  },
];
const FIND_ONE_RESULT = {
  createdUserId: 42,
  fechaEnvio: new Date(),
  fechaHoraValidacionToken: new Date(),
  headers: "exampleHeaders",
  horaEnvio: new Date(),
  id: 42,
  metodoLlamado: "exampleMetodoLlamado",
  rastreoLlamada: "exampleRastreoLlamada",
  respuestaSms: "exampleRespuestaSms",
  telefono: "exampleTelefono",
  textoSms: "exampleTextoSms",
  tokenGenerado: "exampleTokenGenerado",
  url: "exampleUrl",
};

const service = {
  createSmsMasivosApiLog() {
    return CREATE_RESULT;
  },
  smsMasivosApiLogs: () => FIND_MANY_RESULT,
  smsMasivosApiLog: ({ where }: { where: { id: string } }) => {
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

describe("SmsMasivosApiLog", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: SmsMasivosApiLogService,
          useValue: service,
        },
      ],
      controllers: [SmsMasivosApiLogController],
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

  test("POST /smsMasivosApiLogs", async () => {
    await request(app.getHttpServer())
      .post("/smsMasivosApiLogs")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        fechaEnvio: CREATE_RESULT.fechaEnvio.toISOString(),
        fechaHoraValidacionToken:
          CREATE_RESULT.fechaHoraValidacionToken.toISOString(),
        horaEnvio: CREATE_RESULT.horaEnvio.toISOString(),
      });
  });

  test("GET /smsMasivosApiLogs", async () => {
    await request(app.getHttpServer())
      .get("/smsMasivosApiLogs")
      .expect(HttpStatus.OK)
      .expect([
        {
          ...FIND_MANY_RESULT[0],
          fechaEnvio: FIND_MANY_RESULT[0].fechaEnvio.toISOString(),
          fechaHoraValidacionToken:
            FIND_MANY_RESULT[0].fechaHoraValidacionToken.toISOString(),
          horaEnvio: FIND_MANY_RESULT[0].horaEnvio.toISOString(),
        },
      ]);
  });

  test("GET /smsMasivosApiLogs/:id non existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/smsMasivosApiLogs"}/${nonExistingId}`)
      .expect(HttpStatus.NOT_FOUND)
      .expect({
        statusCode: HttpStatus.NOT_FOUND,
        message: `No resource was found for {"${"id"}":"${nonExistingId}"}`,
        error: "Not Found",
      });
  });

  test("GET /smsMasivosApiLogs/:id existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/smsMasivosApiLogs"}/${existingId}`)
      .expect(HttpStatus.OK)
      .expect({
        ...FIND_ONE_RESULT,
        fechaEnvio: FIND_ONE_RESULT.fechaEnvio.toISOString(),
        fechaHoraValidacionToken:
          FIND_ONE_RESULT.fechaHoraValidacionToken.toISOString(),
        horaEnvio: FIND_ONE_RESULT.horaEnvio.toISOString(),
      });
  });

  test("POST /smsMasivosApiLogs existing resource", async () => {
    const agent = request(app.getHttpServer());
    await agent
      .post("/smsMasivosApiLogs")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        fechaEnvio: CREATE_RESULT.fechaEnvio.toISOString(),
        fechaHoraValidacionToken:
          CREATE_RESULT.fechaHoraValidacionToken.toISOString(),
        horaEnvio: CREATE_RESULT.horaEnvio.toISOString(),
      })
      .then(function () {
        agent
          .post("/smsMasivosApiLogs")
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
