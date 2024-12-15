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
import { CashSaleDetailController } from "../cashSaleDetail.controller";
import { CashSaleDetailService } from "../cashSaleDetail.service";

const nonExistingId = "nonExistingId";
const existingId = "existingId";
const CREATE_INPUT = {
  cantUnidades: 42,
  cashSaleId: 42,
  codigoBloqueo: "exampleCodigoBloqueo",
  codigoSerie: "exampleCodigoSerie",
  desctoAplicado: 42,
  id: 42,
  ivaUnidad: 42.424242424,
  porcentajeDescto: 42,
  precioUnidad: 42.424242424,
};
const CREATE_RESULT = {
  cantUnidades: 42,
  cashSaleId: 42,
  codigoBloqueo: "exampleCodigoBloqueo",
  codigoSerie: "exampleCodigoSerie",
  desctoAplicado: 42,
  id: 42,
  ivaUnidad: 42.424242424,
  porcentajeDescto: 42,
  precioUnidad: 42.424242424,
};
const FIND_MANY_RESULT = [
  {
    cantUnidades: 42,
    cashSaleId: 42,
    codigoBloqueo: "exampleCodigoBloqueo",
    codigoSerie: "exampleCodigoSerie",
    desctoAplicado: 42,
    id: 42,
    ivaUnidad: 42.424242424,
    porcentajeDescto: 42,
    precioUnidad: 42.424242424,
  },
];
const FIND_ONE_RESULT = {
  cantUnidades: 42,
  cashSaleId: 42,
  codigoBloqueo: "exampleCodigoBloqueo",
  codigoSerie: "exampleCodigoSerie",
  desctoAplicado: 42,
  id: 42,
  ivaUnidad: 42.424242424,
  porcentajeDescto: 42,
  precioUnidad: 42.424242424,
};

const service = {
  createCashSaleDetail() {
    return CREATE_RESULT;
  },
  cashSaleDetails: () => FIND_MANY_RESULT,
  cashSaleDetail: ({ where }: { where: { id: string } }) => {
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

describe("CashSaleDetail", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: CashSaleDetailService,
          useValue: service,
        },
      ],
      controllers: [CashSaleDetailController],
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

  test("POST /cashSaleDetails", async () => {
    await request(app.getHttpServer())
      .post("/cashSaleDetails")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect(CREATE_RESULT);
  });

  test("GET /cashSaleDetails", async () => {
    await request(app.getHttpServer())
      .get("/cashSaleDetails")
      .expect(HttpStatus.OK)
      .expect([FIND_MANY_RESULT[0]]);
  });

  test("GET /cashSaleDetails/:id non existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/cashSaleDetails"}/${nonExistingId}`)
      .expect(HttpStatus.NOT_FOUND)
      .expect({
        statusCode: HttpStatus.NOT_FOUND,
        message: `No resource was found for {"${"id"}":"${nonExistingId}"}`,
        error: "Not Found",
      });
  });

  test("GET /cashSaleDetails/:id existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/cashSaleDetails"}/${existingId}`)
      .expect(HttpStatus.OK)
      .expect(FIND_ONE_RESULT);
  });

  test("POST /cashSaleDetails existing resource", async () => {
    const agent = request(app.getHttpServer());
    await agent
      .post("/cashSaleDetails")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect(CREATE_RESULT)
      .then(function () {
        agent
          .post("/cashSaleDetails")
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
