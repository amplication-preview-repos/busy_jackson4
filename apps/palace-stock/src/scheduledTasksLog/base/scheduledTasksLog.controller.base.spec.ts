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
import { ScheduledTasksLogController } from "../scheduledTasksLog.controller";
import { ScheduledTasksLogService } from "../scheduledTasksLog.service";

const nonExistingId = "nonExistingId";
const existingId = "existingId";
const CREATE_INPUT = {
  bitacora: "exampleBitacora",
  codigosCompletados: "exampleCodigosCompletados",
  codigosInvalidos: "exampleCodigosInvalidos",
  fechaRegistro: new Date(),
  id: 42,
  tarea: "exampleTarea",
};
const CREATE_RESULT = {
  bitacora: "exampleBitacora",
  codigosCompletados: "exampleCodigosCompletados",
  codigosInvalidos: "exampleCodigosInvalidos",
  fechaRegistro: new Date(),
  id: 42,
  tarea: "exampleTarea",
};
const FIND_MANY_RESULT = [
  {
    bitacora: "exampleBitacora",
    codigosCompletados: "exampleCodigosCompletados",
    codigosInvalidos: "exampleCodigosInvalidos",
    fechaRegistro: new Date(),
    id: 42,
    tarea: "exampleTarea",
  },
];
const FIND_ONE_RESULT = {
  bitacora: "exampleBitacora",
  codigosCompletados: "exampleCodigosCompletados",
  codigosInvalidos: "exampleCodigosInvalidos",
  fechaRegistro: new Date(),
  id: 42,
  tarea: "exampleTarea",
};

const service = {
  createScheduledTasksLog() {
    return CREATE_RESULT;
  },
  scheduledTasksLogs: () => FIND_MANY_RESULT,
  scheduledTasksLog: ({ where }: { where: { id: string } }) => {
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

describe("ScheduledTasksLog", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: ScheduledTasksLogService,
          useValue: service,
        },
      ],
      controllers: [ScheduledTasksLogController],
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

  test("POST /scheduledTasksLogs", async () => {
    await request(app.getHttpServer())
      .post("/scheduledTasksLogs")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        fechaRegistro: CREATE_RESULT.fechaRegistro.toISOString(),
      });
  });

  test("GET /scheduledTasksLogs", async () => {
    await request(app.getHttpServer())
      .get("/scheduledTasksLogs")
      .expect(HttpStatus.OK)
      .expect([
        {
          ...FIND_MANY_RESULT[0],
          fechaRegistro: FIND_MANY_RESULT[0].fechaRegistro.toISOString(),
        },
      ]);
  });

  test("GET /scheduledTasksLogs/:id non existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/scheduledTasksLogs"}/${nonExistingId}`)
      .expect(HttpStatus.NOT_FOUND)
      .expect({
        statusCode: HttpStatus.NOT_FOUND,
        message: `No resource was found for {"${"id"}":"${nonExistingId}"}`,
        error: "Not Found",
      });
  });

  test("GET /scheduledTasksLogs/:id existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/scheduledTasksLogs"}/${existingId}`)
      .expect(HttpStatus.OK)
      .expect({
        ...FIND_ONE_RESULT,
        fechaRegistro: FIND_ONE_RESULT.fechaRegistro.toISOString(),
      });
  });

  test("POST /scheduledTasksLogs existing resource", async () => {
    const agent = request(app.getHttpServer());
    await agent
      .post("/scheduledTasksLogs")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        fechaRegistro: CREATE_RESULT.fechaRegistro.toISOString(),
      })
      .then(function () {
        agent
          .post("/scheduledTasksLogs")
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
