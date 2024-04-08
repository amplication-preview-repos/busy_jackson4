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
import { StockSeryController } from "../stockSery.controller";
import { StockSeryService } from "../stockSery.service";

const nonExistingId = "nonExistingId";
const existingId = "existingId";
const CREATE_INPUT = {
  codigoBloqueo: "exampleCodigoBloqueo",
  id: 42,
  otraSerie: "exampleOtraSerie",
  proveedorBloqueo: "exampleProveedorBloqueo",
  serialCode: "exampleSerialCode",
  serieEnrolada: "exampleSerieEnrolada",
};
const CREATE_RESULT = {
  codigoBloqueo: "exampleCodigoBloqueo",
  id: 42,
  otraSerie: "exampleOtraSerie",
  proveedorBloqueo: "exampleProveedorBloqueo",
  serialCode: "exampleSerialCode",
  serieEnrolada: "exampleSerieEnrolada",
};
const FIND_MANY_RESULT = [
  {
    codigoBloqueo: "exampleCodigoBloqueo",
    id: 42,
    otraSerie: "exampleOtraSerie",
    proveedorBloqueo: "exampleProveedorBloqueo",
    serialCode: "exampleSerialCode",
    serieEnrolada: "exampleSerieEnrolada",
  },
];
const FIND_ONE_RESULT = {
  codigoBloqueo: "exampleCodigoBloqueo",
  id: 42,
  otraSerie: "exampleOtraSerie",
  proveedorBloqueo: "exampleProveedorBloqueo",
  serialCode: "exampleSerialCode",
  serieEnrolada: "exampleSerieEnrolada",
};

const service = {
  createStockSery() {
    return CREATE_RESULT;
  },
  stockSeries: () => FIND_MANY_RESULT,
  stockSery: ({ where }: { where: { id: string } }) => {
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

describe("StockSery", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: StockSeryService,
          useValue: service,
        },
      ],
      controllers: [StockSeryController],
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

  test("POST /stockSeries", async () => {
    await request(app.getHttpServer())
      .post("/stockSeries")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect(CREATE_RESULT);
  });

  test("GET /stockSeries", async () => {
    await request(app.getHttpServer())
      .get("/stockSeries")
      .expect(HttpStatus.OK)
      .expect([FIND_MANY_RESULT[0]]);
  });

  test("GET /stockSeries/:id non existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/stockSeries"}/${nonExistingId}`)
      .expect(HttpStatus.NOT_FOUND)
      .expect({
        statusCode: HttpStatus.NOT_FOUND,
        message: `No resource was found for {"${"id"}":"${nonExistingId}"}`,
        error: "Not Found",
      });
  });

  test("GET /stockSeries/:id existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/stockSeries"}/${existingId}`)
      .expect(HttpStatus.OK)
      .expect(FIND_ONE_RESULT);
  });

  test("POST /stockSeries existing resource", async () => {
    const agent = request(app.getHttpServer());
    await agent
      .post("/stockSeries")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect(CREATE_RESULT)
      .then(function () {
        agent
          .post("/stockSeries")
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
