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
import { ModifiedPaymentController } from "../modifiedPayment.controller";
import { ModifiedPaymentService } from "../modifiedPayment.service";

const nonExistingId = "nonExistingId";
const existingId = "existingId";
const CREATE_INPUT = {
  comentarios: "exampleComentarios",
  fechaHoraRegistro: new Date(),
  fechaUltimaEdicion: new Date(),
  id: 42,
  idUsrUltimaEdicion: 42,
  infoPago: "exampleInfoPago",
  numPago: 42,
};
const CREATE_RESULT = {
  comentarios: "exampleComentarios",
  fechaHoraRegistro: new Date(),
  fechaUltimaEdicion: new Date(),
  id: 42,
  idUsrUltimaEdicion: 42,
  infoPago: "exampleInfoPago",
  numPago: 42,
};
const FIND_MANY_RESULT = [
  {
    comentarios: "exampleComentarios",
    fechaHoraRegistro: new Date(),
    fechaUltimaEdicion: new Date(),
    id: 42,
    idUsrUltimaEdicion: 42,
    infoPago: "exampleInfoPago",
    numPago: 42,
  },
];
const FIND_ONE_RESULT = {
  comentarios: "exampleComentarios",
  fechaHoraRegistro: new Date(),
  fechaUltimaEdicion: new Date(),
  id: 42,
  idUsrUltimaEdicion: 42,
  infoPago: "exampleInfoPago",
  numPago: 42,
};

const service = {
  createModifiedPayment() {
    return CREATE_RESULT;
  },
  modifiedPayments: () => FIND_MANY_RESULT,
  modifiedPayment: ({ where }: { where: { id: string } }) => {
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

describe("ModifiedPayment", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: ModifiedPaymentService,
          useValue: service,
        },
      ],
      controllers: [ModifiedPaymentController],
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

  test("POST /modifiedPayments", async () => {
    await request(app.getHttpServer())
      .post("/modifiedPayments")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        fechaHoraRegistro: CREATE_RESULT.fechaHoraRegistro.toISOString(),
        fechaUltimaEdicion: CREATE_RESULT.fechaUltimaEdicion.toISOString(),
      });
  });

  test("GET /modifiedPayments", async () => {
    await request(app.getHttpServer())
      .get("/modifiedPayments")
      .expect(HttpStatus.OK)
      .expect([
        {
          ...FIND_MANY_RESULT[0],
          fechaHoraRegistro:
            FIND_MANY_RESULT[0].fechaHoraRegistro.toISOString(),
          fechaUltimaEdicion:
            FIND_MANY_RESULT[0].fechaUltimaEdicion.toISOString(),
        },
      ]);
  });

  test("GET /modifiedPayments/:id non existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/modifiedPayments"}/${nonExistingId}`)
      .expect(HttpStatus.NOT_FOUND)
      .expect({
        statusCode: HttpStatus.NOT_FOUND,
        message: `No resource was found for {"${"id"}":"${nonExistingId}"}`,
        error: "Not Found",
      });
  });

  test("GET /modifiedPayments/:id existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/modifiedPayments"}/${existingId}`)
      .expect(HttpStatus.OK)
      .expect({
        ...FIND_ONE_RESULT,
        fechaHoraRegistro: FIND_ONE_RESULT.fechaHoraRegistro.toISOString(),
        fechaUltimaEdicion: FIND_ONE_RESULT.fechaUltimaEdicion.toISOString(),
      });
  });

  test("POST /modifiedPayments existing resource", async () => {
    const agent = request(app.getHttpServer());
    await agent
      .post("/modifiedPayments")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        fechaHoraRegistro: CREATE_RESULT.fechaHoraRegistro.toISOString(),
        fechaUltimaEdicion: CREATE_RESULT.fechaUltimaEdicion.toISOString(),
      })
      .then(function () {
        agent
          .post("/modifiedPayments")
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
