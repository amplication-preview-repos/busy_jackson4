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
import { AirtimeRechargeController } from "../airtimeRecharge.controller";
import { AirtimeRechargeService } from "../airtimeRecharge.service";

const nonExistingId = "nonExistingId";
const existingId = "existingId";
const CREATE_INPUT = {
  descripcion: "exampleDescripcion",
  fechaRegistro: new Date(),
  id: 42,
  idTransaccion: "exampleIdTransaccion",
  monto: "exampleMonto",
  numeroTel: "exampleNumeroTel",
  operadora: "exampleOperadora",
  sku: "exampleSku",
  tipo: "exampleTipo",
  vigencia: "exampleVigencia",
};
const CREATE_RESULT = {
  descripcion: "exampleDescripcion",
  fechaRegistro: new Date(),
  id: 42,
  idTransaccion: "exampleIdTransaccion",
  monto: "exampleMonto",
  numeroTel: "exampleNumeroTel",
  operadora: "exampleOperadora",
  sku: "exampleSku",
  tipo: "exampleTipo",
  vigencia: "exampleVigencia",
};
const FIND_MANY_RESULT = [
  {
    descripcion: "exampleDescripcion",
    fechaRegistro: new Date(),
    id: 42,
    idTransaccion: "exampleIdTransaccion",
    monto: "exampleMonto",
    numeroTel: "exampleNumeroTel",
    operadora: "exampleOperadora",
    sku: "exampleSku",
    tipo: "exampleTipo",
    vigencia: "exampleVigencia",
  },
];
const FIND_ONE_RESULT = {
  descripcion: "exampleDescripcion",
  fechaRegistro: new Date(),
  id: 42,
  idTransaccion: "exampleIdTransaccion",
  monto: "exampleMonto",
  numeroTel: "exampleNumeroTel",
  operadora: "exampleOperadora",
  sku: "exampleSku",
  tipo: "exampleTipo",
  vigencia: "exampleVigencia",
};

const service = {
  createAirtimeRecharge() {
    return CREATE_RESULT;
  },
  airtimeRecharges: () => FIND_MANY_RESULT,
  airtimeRecharge: ({ where }: { where: { id: string } }) => {
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

describe("AirtimeRecharge", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: AirtimeRechargeService,
          useValue: service,
        },
      ],
      controllers: [AirtimeRechargeController],
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

  test("POST /airtimeRecharges", async () => {
    await request(app.getHttpServer())
      .post("/airtimeRecharges")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        fechaRegistro: CREATE_RESULT.fechaRegistro.toISOString(),
      });
  });

  test("GET /airtimeRecharges", async () => {
    await request(app.getHttpServer())
      .get("/airtimeRecharges")
      .expect(HttpStatus.OK)
      .expect([
        {
          ...FIND_MANY_RESULT[0],
          fechaRegistro: FIND_MANY_RESULT[0].fechaRegistro.toISOString(),
        },
      ]);
  });

  test("GET /airtimeRecharges/:id non existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/airtimeRecharges"}/${nonExistingId}`)
      .expect(HttpStatus.NOT_FOUND)
      .expect({
        statusCode: HttpStatus.NOT_FOUND,
        message: `No resource was found for {"${"id"}":"${nonExistingId}"}`,
        error: "Not Found",
      });
  });

  test("GET /airtimeRecharges/:id existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/airtimeRecharges"}/${existingId}`)
      .expect(HttpStatus.OK)
      .expect({
        ...FIND_ONE_RESULT,
        fechaRegistro: FIND_ONE_RESULT.fechaRegistro.toISOString(),
      });
  });

  test("POST /airtimeRecharges existing resource", async () => {
    const agent = request(app.getHttpServer());
    await agent
      .post("/airtimeRecharges")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        fechaRegistro: CREATE_RESULT.fechaRegistro.toISOString(),
      })
      .then(function () {
        agent
          .post("/airtimeRecharges")
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
