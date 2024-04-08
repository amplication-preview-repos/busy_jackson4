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
import { BillDetailController } from "../billDetail.controller";
import { BillDetailService } from "../billDetail.service";

const nonExistingId = "nonExistingId";
const existingId = "existingId";
const CREATE_INPUT = {
  codigoSerie: "exampleCodigoSerie",
  createdUserId: 42,
  desctoUnidad: 42.424242424,
  fechaRegistro: new Date(),
  id: 42,
  idFactura: 42,
  precioUnidad: 42.424242424,
};
const CREATE_RESULT = {
  codigoSerie: "exampleCodigoSerie",
  createdUserId: 42,
  desctoUnidad: 42.424242424,
  fechaRegistro: new Date(),
  id: 42,
  idFactura: 42,
  precioUnidad: 42.424242424,
};
const FIND_MANY_RESULT = [
  {
    codigoSerie: "exampleCodigoSerie",
    createdUserId: 42,
    desctoUnidad: 42.424242424,
    fechaRegistro: new Date(),
    id: 42,
    idFactura: 42,
    precioUnidad: 42.424242424,
  },
];
const FIND_ONE_RESULT = {
  codigoSerie: "exampleCodigoSerie",
  createdUserId: 42,
  desctoUnidad: 42.424242424,
  fechaRegistro: new Date(),
  id: 42,
  idFactura: 42,
  precioUnidad: 42.424242424,
};

const service = {
  createBillDetail() {
    return CREATE_RESULT;
  },
  billDetails: () => FIND_MANY_RESULT,
  billDetail: ({ where }: { where: { id: string } }) => {
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

describe("BillDetail", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: BillDetailService,
          useValue: service,
        },
      ],
      controllers: [BillDetailController],
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

  test("POST /billDetails", async () => {
    await request(app.getHttpServer())
      .post("/billDetails")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        fechaRegistro: CREATE_RESULT.fechaRegistro.toISOString(),
      });
  });

  test("GET /billDetails", async () => {
    await request(app.getHttpServer())
      .get("/billDetails")
      .expect(HttpStatus.OK)
      .expect([
        {
          ...FIND_MANY_RESULT[0],
          fechaRegistro: FIND_MANY_RESULT[0].fechaRegistro.toISOString(),
        },
      ]);
  });

  test("GET /billDetails/:id non existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/billDetails"}/${nonExistingId}`)
      .expect(HttpStatus.NOT_FOUND)
      .expect({
        statusCode: HttpStatus.NOT_FOUND,
        message: `No resource was found for {"${"id"}":"${nonExistingId}"}`,
        error: "Not Found",
      });
  });

  test("GET /billDetails/:id existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/billDetails"}/${existingId}`)
      .expect(HttpStatus.OK)
      .expect({
        ...FIND_ONE_RESULT,
        fechaRegistro: FIND_ONE_RESULT.fechaRegistro.toISOString(),
      });
  });

  test("POST /billDetails existing resource", async () => {
    const agent = request(app.getHttpServer());
    await agent
      .post("/billDetails")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        fechaRegistro: CREATE_RESULT.fechaRegistro.toISOString(),
      })
      .then(function () {
        agent
          .post("/billDetails")
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
