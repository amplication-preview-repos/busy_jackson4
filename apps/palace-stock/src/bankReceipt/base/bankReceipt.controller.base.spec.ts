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
import { BankReceiptController } from "../bankReceipt.controller";
import { BankReceiptService } from "../bankReceipt.service";

const nonExistingId = "nonExistingId";
const existingId = "existingId";
const CREATE_INPUT = {
  autorizacion: "exampleAutorizacion",
  banco: "exampleBanco",
  createdUserId: 42,
  fechaDeposito: new Date(),
  fechaRegistro: new Date(),
  fechaValidacion: new Date(),
  folio: "exampleFolio",
  id: 42,
  idBanco: "exampleIdBanco",
  montoDeposito: 42.424242424,
  validUserId: 42,
};
const CREATE_RESULT = {
  autorizacion: "exampleAutorizacion",
  banco: "exampleBanco",
  createdUserId: 42,
  fechaDeposito: new Date(),
  fechaRegistro: new Date(),
  fechaValidacion: new Date(),
  folio: "exampleFolio",
  id: 42,
  idBanco: "exampleIdBanco",
  montoDeposito: 42.424242424,
  validUserId: 42,
};
const FIND_MANY_RESULT = [
  {
    autorizacion: "exampleAutorizacion",
    banco: "exampleBanco",
    createdUserId: 42,
    fechaDeposito: new Date(),
    fechaRegistro: new Date(),
    fechaValidacion: new Date(),
    folio: "exampleFolio",
    id: 42,
    idBanco: "exampleIdBanco",
    montoDeposito: 42.424242424,
    validUserId: 42,
  },
];
const FIND_ONE_RESULT = {
  autorizacion: "exampleAutorizacion",
  banco: "exampleBanco",
  createdUserId: 42,
  fechaDeposito: new Date(),
  fechaRegistro: new Date(),
  fechaValidacion: new Date(),
  folio: "exampleFolio",
  id: 42,
  idBanco: "exampleIdBanco",
  montoDeposito: 42.424242424,
  validUserId: 42,
};

const service = {
  createBankReceipt() {
    return CREATE_RESULT;
  },
  bankReceipts: () => FIND_MANY_RESULT,
  bankReceipt: ({ where }: { where: { id: string } }) => {
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

describe("BankReceipt", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: BankReceiptService,
          useValue: service,
        },
      ],
      controllers: [BankReceiptController],
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

  test("POST /bankReceipts", async () => {
    await request(app.getHttpServer())
      .post("/bankReceipts")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        fechaDeposito: CREATE_RESULT.fechaDeposito.toISOString(),
        fechaRegistro: CREATE_RESULT.fechaRegistro.toISOString(),
        fechaValidacion: CREATE_RESULT.fechaValidacion.toISOString(),
      });
  });

  test("GET /bankReceipts", async () => {
    await request(app.getHttpServer())
      .get("/bankReceipts")
      .expect(HttpStatus.OK)
      .expect([
        {
          ...FIND_MANY_RESULT[0],
          fechaDeposito: FIND_MANY_RESULT[0].fechaDeposito.toISOString(),
          fechaRegistro: FIND_MANY_RESULT[0].fechaRegistro.toISOString(),
          fechaValidacion: FIND_MANY_RESULT[0].fechaValidacion.toISOString(),
        },
      ]);
  });

  test("GET /bankReceipts/:id non existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/bankReceipts"}/${nonExistingId}`)
      .expect(HttpStatus.NOT_FOUND)
      .expect({
        statusCode: HttpStatus.NOT_FOUND,
        message: `No resource was found for {"${"id"}":"${nonExistingId}"}`,
        error: "Not Found",
      });
  });

  test("GET /bankReceipts/:id existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/bankReceipts"}/${existingId}`)
      .expect(HttpStatus.OK)
      .expect({
        ...FIND_ONE_RESULT,
        fechaDeposito: FIND_ONE_RESULT.fechaDeposito.toISOString(),
        fechaRegistro: FIND_ONE_RESULT.fechaRegistro.toISOString(),
        fechaValidacion: FIND_ONE_RESULT.fechaValidacion.toISOString(),
      });
  });

  test("POST /bankReceipts existing resource", async () => {
    const agent = request(app.getHttpServer());
    await agent
      .post("/bankReceipts")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        fechaDeposito: CREATE_RESULT.fechaDeposito.toISOString(),
        fechaRegistro: CREATE_RESULT.fechaRegistro.toISOString(),
        fechaValidacion: CREATE_RESULT.fechaValidacion.toISOString(),
      })
      .then(function () {
        agent
          .post("/bankReceipts")
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
