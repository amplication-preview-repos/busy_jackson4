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
import { UserQualityHistoryController } from "../userQualityHistory.controller";
import { UserQualityHistoryService } from "../userQualityHistory.service";

const nonExistingId = "nonExistingId";
const existingId = "existingId";
const CREATE_INPUT = {
  cantBloqueados30: 42,
  cantBloqueados60: 42,
  cantFinanc30: 42,
  cantFinanc60: 42,
  cantFinancUlt37: 42,
  cantFinancUlt67: 42,
  cantFinancUlt7: 42,
  cantFraudes30: 42,
  cantFraudes60: 42,
  cantVenc530: 42,
  cantVenc560: 42,
  estatusBloqueo: "exampleEstatusBloqueo",
  fechaDesbloqueo: new Date(),
  id: 42,
  idUsrDesbloqueo: 42,
  lockedAt: new Date(),
  motivoDesbloqueo: "exampleMotivoDesbloqueo",
  pctjBloqueados30: 42.424242424,
  pctjBloqueados60: 42.424242424,
  pctjFraudes30: 42.424242424,
  pctjFraudes60: 42.424242424,
  pctjVenc530: 42.424242424,
  pctjVenc560: 42.424242424,
  totalAlertas: 42,
  totalExcesos: 42,
};
const CREATE_RESULT = {
  cantBloqueados30: 42,
  cantBloqueados60: 42,
  cantFinanc30: 42,
  cantFinanc60: 42,
  cantFinancUlt37: 42,
  cantFinancUlt67: 42,
  cantFinancUlt7: 42,
  cantFraudes30: 42,
  cantFraudes60: 42,
  cantVenc530: 42,
  cantVenc560: 42,
  estatusBloqueo: "exampleEstatusBloqueo",
  fechaDesbloqueo: new Date(),
  id: 42,
  idUsrDesbloqueo: 42,
  lockedAt: new Date(),
  motivoDesbloqueo: "exampleMotivoDesbloqueo",
  pctjBloqueados30: 42.424242424,
  pctjBloqueados60: 42.424242424,
  pctjFraudes30: 42.424242424,
  pctjFraudes60: 42.424242424,
  pctjVenc530: 42.424242424,
  pctjVenc560: 42.424242424,
  totalAlertas: 42,
  totalExcesos: 42,
};
const FIND_MANY_RESULT = [
  {
    cantBloqueados30: 42,
    cantBloqueados60: 42,
    cantFinanc30: 42,
    cantFinanc60: 42,
    cantFinancUlt37: 42,
    cantFinancUlt67: 42,
    cantFinancUlt7: 42,
    cantFraudes30: 42,
    cantFraudes60: 42,
    cantVenc530: 42,
    cantVenc560: 42,
    estatusBloqueo: "exampleEstatusBloqueo",
    fechaDesbloqueo: new Date(),
    id: 42,
    idUsrDesbloqueo: 42,
    lockedAt: new Date(),
    motivoDesbloqueo: "exampleMotivoDesbloqueo",
    pctjBloqueados30: 42.424242424,
    pctjBloqueados60: 42.424242424,
    pctjFraudes30: 42.424242424,
    pctjFraudes60: 42.424242424,
    pctjVenc530: 42.424242424,
    pctjVenc560: 42.424242424,
    totalAlertas: 42,
    totalExcesos: 42,
  },
];
const FIND_ONE_RESULT = {
  cantBloqueados30: 42,
  cantBloqueados60: 42,
  cantFinanc30: 42,
  cantFinanc60: 42,
  cantFinancUlt37: 42,
  cantFinancUlt67: 42,
  cantFinancUlt7: 42,
  cantFraudes30: 42,
  cantFraudes60: 42,
  cantVenc530: 42,
  cantVenc560: 42,
  estatusBloqueo: "exampleEstatusBloqueo",
  fechaDesbloqueo: new Date(),
  id: 42,
  idUsrDesbloqueo: 42,
  lockedAt: new Date(),
  motivoDesbloqueo: "exampleMotivoDesbloqueo",
  pctjBloqueados30: 42.424242424,
  pctjBloqueados60: 42.424242424,
  pctjFraudes30: 42.424242424,
  pctjFraudes60: 42.424242424,
  pctjVenc530: 42.424242424,
  pctjVenc560: 42.424242424,
  totalAlertas: 42,
  totalExcesos: 42,
};

const service = {
  createUserQualityHistory() {
    return CREATE_RESULT;
  },
  userQualityHistories: () => FIND_MANY_RESULT,
  userQualityHistory: ({ where }: { where: { id: string } }) => {
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

describe("UserQualityHistory", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: UserQualityHistoryService,
          useValue: service,
        },
      ],
      controllers: [UserQualityHistoryController],
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

  test("POST /userQualityHistories", async () => {
    await request(app.getHttpServer())
      .post("/userQualityHistories")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        fechaDesbloqueo: CREATE_RESULT.fechaDesbloqueo.toISOString(),
        lockedAt: CREATE_RESULT.lockedAt.toISOString(),
      });
  });

  test("GET /userQualityHistories", async () => {
    await request(app.getHttpServer())
      .get("/userQualityHistories")
      .expect(HttpStatus.OK)
      .expect([
        {
          ...FIND_MANY_RESULT[0],
          fechaDesbloqueo: FIND_MANY_RESULT[0].fechaDesbloqueo.toISOString(),
          lockedAt: FIND_MANY_RESULT[0].lockedAt.toISOString(),
        },
      ]);
  });

  test("GET /userQualityHistories/:id non existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/userQualityHistories"}/${nonExistingId}`)
      .expect(HttpStatus.NOT_FOUND)
      .expect({
        statusCode: HttpStatus.NOT_FOUND,
        message: `No resource was found for {"${"id"}":"${nonExistingId}"}`,
        error: "Not Found",
      });
  });

  test("GET /userQualityHistories/:id existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/userQualityHistories"}/${existingId}`)
      .expect(HttpStatus.OK)
      .expect({
        ...FIND_ONE_RESULT,
        fechaDesbloqueo: FIND_ONE_RESULT.fechaDesbloqueo.toISOString(),
        lockedAt: FIND_ONE_RESULT.lockedAt.toISOString(),
      });
  });

  test("POST /userQualityHistories existing resource", async () => {
    const agent = request(app.getHttpServer());
    await agent
      .post("/userQualityHistories")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        fechaDesbloqueo: CREATE_RESULT.fechaDesbloqueo.toISOString(),
        lockedAt: CREATE_RESULT.lockedAt.toISOString(),
      })
      .then(function () {
        agent
          .post("/userQualityHistories")
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
