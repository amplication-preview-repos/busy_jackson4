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
import { CashCountController } from "../cashCount.controller";
import { CashCountService } from "../cashCount.service";

const nonExistingId = "nonExistingId";
const existingId = "existingId";
const CREATE_INPUT = {
  comentarios: "exampleComentarios",
  createdUserId: 42,
  fechaRegistro: new Date(),
  fechaValidacion: new Date(),
  fromDate: new Date(),
  id: 42,
  toDate: new Date(),
  validUserId: 42,
};
const CREATE_RESULT = {
  comentarios: "exampleComentarios",
  createdUserId: 42,
  fechaRegistro: new Date(),
  fechaValidacion: new Date(),
  fromDate: new Date(),
  id: 42,
  toDate: new Date(),
  validUserId: 42,
};
const FIND_MANY_RESULT = [
  {
    comentarios: "exampleComentarios",
    createdUserId: 42,
    fechaRegistro: new Date(),
    fechaValidacion: new Date(),
    fromDate: new Date(),
    id: 42,
    toDate: new Date(),
    validUserId: 42,
  },
];
const FIND_ONE_RESULT = {
  comentarios: "exampleComentarios",
  createdUserId: 42,
  fechaRegistro: new Date(),
  fechaValidacion: new Date(),
  fromDate: new Date(),
  id: 42,
  toDate: new Date(),
  validUserId: 42,
};

const service = {
  createCashCount() {
    return CREATE_RESULT;
  },
  cashCounts: () => FIND_MANY_RESULT,
  cashCount: ({ where }: { where: { id: string } }) => {
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

describe("CashCount", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: CashCountService,
          useValue: service,
        },
      ],
      controllers: [CashCountController],
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

  test("POST /cashCounts", async () => {
    await request(app.getHttpServer())
      .post("/cashCounts")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        fechaRegistro: CREATE_RESULT.fechaRegistro.toISOString(),
        fechaValidacion: CREATE_RESULT.fechaValidacion.toISOString(),
        fromDate: CREATE_RESULT.fromDate.toISOString(),
        toDate: CREATE_RESULT.toDate.toISOString(),
      });
  });

  test("GET /cashCounts", async () => {
    await request(app.getHttpServer())
      .get("/cashCounts")
      .expect(HttpStatus.OK)
      .expect([
        {
          ...FIND_MANY_RESULT[0],
          fechaRegistro: FIND_MANY_RESULT[0].fechaRegistro.toISOString(),
          fechaValidacion: FIND_MANY_RESULT[0].fechaValidacion.toISOString(),
          fromDate: FIND_MANY_RESULT[0].fromDate.toISOString(),
          toDate: FIND_MANY_RESULT[0].toDate.toISOString(),
        },
      ]);
  });

  test("GET /cashCounts/:id non existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/cashCounts"}/${nonExistingId}`)
      .expect(HttpStatus.NOT_FOUND)
      .expect({
        statusCode: HttpStatus.NOT_FOUND,
        message: `No resource was found for {"${"id"}":"${nonExistingId}"}`,
        error: "Not Found",
      });
  });

  test("GET /cashCounts/:id existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/cashCounts"}/${existingId}`)
      .expect(HttpStatus.OK)
      .expect({
        ...FIND_ONE_RESULT,
        fechaRegistro: FIND_ONE_RESULT.fechaRegistro.toISOString(),
        fechaValidacion: FIND_ONE_RESULT.fechaValidacion.toISOString(),
        fromDate: FIND_ONE_RESULT.fromDate.toISOString(),
        toDate: FIND_ONE_RESULT.toDate.toISOString(),
      });
  });

  test("POST /cashCounts existing resource", async () => {
    const agent = request(app.getHttpServer());
    await agent
      .post("/cashCounts")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        fechaRegistro: CREATE_RESULT.fechaRegistro.toISOString(),
        fechaValidacion: CREATE_RESULT.fechaValidacion.toISOString(),
        fromDate: CREATE_RESULT.fromDate.toISOString(),
        toDate: CREATE_RESULT.toDate.toISOString(),
      })
      .then(function () {
        agent
          .post("/cashCounts")
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
