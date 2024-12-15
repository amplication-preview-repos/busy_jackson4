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
import { FinancedSalesLogController } from "../financedSalesLog.controller";
import { FinancedSalesLogService } from "../financedSalesLog.service";

const nonExistingId = "nonExistingId";
const existingId = "existingId";
const CREATE_INPUT = {
  fechaUltimaEdicion: new Date(),
  id: 42,
  idUsrUltimaEdicion: 42,
  infoFinanc: "exampleInfoFinanc",
};
const CREATE_RESULT = {
  fechaUltimaEdicion: new Date(),
  id: 42,
  idUsrUltimaEdicion: 42,
  infoFinanc: "exampleInfoFinanc",
};
const FIND_MANY_RESULT = [
  {
    fechaUltimaEdicion: new Date(),
    id: 42,
    idUsrUltimaEdicion: 42,
    infoFinanc: "exampleInfoFinanc",
  },
];
const FIND_ONE_RESULT = {
  fechaUltimaEdicion: new Date(),
  id: 42,
  idUsrUltimaEdicion: 42,
  infoFinanc: "exampleInfoFinanc",
};

const service = {
  createFinancedSalesLog() {
    return CREATE_RESULT;
  },
  financedSalesLogs: () => FIND_MANY_RESULT,
  financedSalesLog: ({ where }: { where: { id: string } }) => {
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

describe("FinancedSalesLog", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: FinancedSalesLogService,
          useValue: service,
        },
      ],
      controllers: [FinancedSalesLogController],
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

  test("POST /financedSalesLogs", async () => {
    await request(app.getHttpServer())
      .post("/financedSalesLogs")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        fechaUltimaEdicion: CREATE_RESULT.fechaUltimaEdicion.toISOString(),
      });
  });

  test("GET /financedSalesLogs", async () => {
    await request(app.getHttpServer())
      .get("/financedSalesLogs")
      .expect(HttpStatus.OK)
      .expect([
        {
          ...FIND_MANY_RESULT[0],
          fechaUltimaEdicion:
            FIND_MANY_RESULT[0].fechaUltimaEdicion.toISOString(),
        },
      ]);
  });

  test("GET /financedSalesLogs/:id non existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/financedSalesLogs"}/${nonExistingId}`)
      .expect(HttpStatus.NOT_FOUND)
      .expect({
        statusCode: HttpStatus.NOT_FOUND,
        message: `No resource was found for {"${"id"}":"${nonExistingId}"}`,
        error: "Not Found",
      });
  });

  test("GET /financedSalesLogs/:id existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/financedSalesLogs"}/${existingId}`)
      .expect(HttpStatus.OK)
      .expect({
        ...FIND_ONE_RESULT,
        fechaUltimaEdicion: FIND_ONE_RESULT.fechaUltimaEdicion.toISOString(),
      });
  });

  test("POST /financedSalesLogs existing resource", async () => {
    const agent = request(app.getHttpServer());
    await agent
      .post("/financedSalesLogs")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        fechaUltimaEdicion: CREATE_RESULT.fechaUltimaEdicion.toISOString(),
      })
      .then(function () {
        agent
          .post("/financedSalesLogs")
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
