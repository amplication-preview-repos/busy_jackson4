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
import { TransactionController } from "../transaction.controller";
import { TransactionService } from "../transaction.service";

const nonExistingId = "nonExistingId";
const existingId = "existingId";
const CREATE_INPUT = {
  comentariosTrans: "exampleComentariosTrans",
  createdUserId: 42,
  fechaTrans: new Date(),
  folioDocto: 42,
  horaTrans: new Date(),
  id: 42,
  numProveedor: 42,
  transacFolio: 42,
};
const CREATE_RESULT = {
  comentariosTrans: "exampleComentariosTrans",
  createdUserId: 42,
  fechaTrans: new Date(),
  folioDocto: 42,
  horaTrans: new Date(),
  id: 42,
  numProveedor: 42,
  transacFolio: 42,
};
const FIND_MANY_RESULT = [
  {
    comentariosTrans: "exampleComentariosTrans",
    createdUserId: 42,
    fechaTrans: new Date(),
    folioDocto: 42,
    horaTrans: new Date(),
    id: 42,
    numProveedor: 42,
    transacFolio: 42,
  },
];
const FIND_ONE_RESULT = {
  comentariosTrans: "exampleComentariosTrans",
  createdUserId: 42,
  fechaTrans: new Date(),
  folioDocto: 42,
  horaTrans: new Date(),
  id: 42,
  numProveedor: 42,
  transacFolio: 42,
};

const service = {
  createTransaction() {
    return CREATE_RESULT;
  },
  transactions: () => FIND_MANY_RESULT,
  transaction: ({ where }: { where: { id: string } }) => {
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

describe("Transaction", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: TransactionService,
          useValue: service,
        },
      ],
      controllers: [TransactionController],
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

  test("POST /transactions", async () => {
    await request(app.getHttpServer())
      .post("/transactions")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        fechaTrans: CREATE_RESULT.fechaTrans.toISOString(),
        horaTrans: CREATE_RESULT.horaTrans.toISOString(),
      });
  });

  test("GET /transactions", async () => {
    await request(app.getHttpServer())
      .get("/transactions")
      .expect(HttpStatus.OK)
      .expect([
        {
          ...FIND_MANY_RESULT[0],
          fechaTrans: FIND_MANY_RESULT[0].fechaTrans.toISOString(),
          horaTrans: FIND_MANY_RESULT[0].horaTrans.toISOString(),
        },
      ]);
  });

  test("GET /transactions/:id non existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/transactions"}/${nonExistingId}`)
      .expect(HttpStatus.NOT_FOUND)
      .expect({
        statusCode: HttpStatus.NOT_FOUND,
        message: `No resource was found for {"${"id"}":"${nonExistingId}"}`,
        error: "Not Found",
      });
  });

  test("GET /transactions/:id existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/transactions"}/${existingId}`)
      .expect(HttpStatus.OK)
      .expect({
        ...FIND_ONE_RESULT,
        fechaTrans: FIND_ONE_RESULT.fechaTrans.toISOString(),
        horaTrans: FIND_ONE_RESULT.horaTrans.toISOString(),
      });
  });

  test("POST /transactions existing resource", async () => {
    const agent = request(app.getHttpServer());
    await agent
      .post("/transactions")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        fechaTrans: CREATE_RESULT.fechaTrans.toISOString(),
        horaTrans: CREATE_RESULT.horaTrans.toISOString(),
      })
      .then(function () {
        agent
          .post("/transactions")
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
