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
import { LoanedDeviceController } from "../loanedDevice.controller";
import { LoanedDeviceService } from "../loanedDevice.service";

const nonExistingId = "nonExistingId";
const existingId = "existingId";
const CREATE_INPUT = {
  codigoSerie: "exampleCodigoSerie",
  comentarios: "exampleComentarios",
  fechaDevolucion: new Date(),
  fechaRegistro: new Date(),
  id: 42,
  loanStatus: "exampleLoanStatus",
};
const CREATE_RESULT = {
  codigoSerie: "exampleCodigoSerie",
  comentarios: "exampleComentarios",
  fechaDevolucion: new Date(),
  fechaRegistro: new Date(),
  id: 42,
  loanStatus: "exampleLoanStatus",
};
const FIND_MANY_RESULT = [
  {
    codigoSerie: "exampleCodigoSerie",
    comentarios: "exampleComentarios",
    fechaDevolucion: new Date(),
    fechaRegistro: new Date(),
    id: 42,
    loanStatus: "exampleLoanStatus",
  },
];
const FIND_ONE_RESULT = {
  codigoSerie: "exampleCodigoSerie",
  comentarios: "exampleComentarios",
  fechaDevolucion: new Date(),
  fechaRegistro: new Date(),
  id: 42,
  loanStatus: "exampleLoanStatus",
};

const service = {
  createLoanedDevice() {
    return CREATE_RESULT;
  },
  loanedDevices: () => FIND_MANY_RESULT,
  loanedDevice: ({ where }: { where: { id: string } }) => {
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

describe("LoanedDevice", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: LoanedDeviceService,
          useValue: service,
        },
      ],
      controllers: [LoanedDeviceController],
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

  test("POST /loanedDevices", async () => {
    await request(app.getHttpServer())
      .post("/loanedDevices")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        fechaDevolucion: CREATE_RESULT.fechaDevolucion.toISOString(),
        fechaRegistro: CREATE_RESULT.fechaRegistro.toISOString(),
      });
  });

  test("GET /loanedDevices", async () => {
    await request(app.getHttpServer())
      .get("/loanedDevices")
      .expect(HttpStatus.OK)
      .expect([
        {
          ...FIND_MANY_RESULT[0],
          fechaDevolucion: FIND_MANY_RESULT[0].fechaDevolucion.toISOString(),
          fechaRegistro: FIND_MANY_RESULT[0].fechaRegistro.toISOString(),
        },
      ]);
  });

  test("GET /loanedDevices/:id non existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/loanedDevices"}/${nonExistingId}`)
      .expect(HttpStatus.NOT_FOUND)
      .expect({
        statusCode: HttpStatus.NOT_FOUND,
        message: `No resource was found for {"${"id"}":"${nonExistingId}"}`,
        error: "Not Found",
      });
  });

  test("GET /loanedDevices/:id existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/loanedDevices"}/${existingId}`)
      .expect(HttpStatus.OK)
      .expect({
        ...FIND_ONE_RESULT,
        fechaDevolucion: FIND_ONE_RESULT.fechaDevolucion.toISOString(),
        fechaRegistro: FIND_ONE_RESULT.fechaRegistro.toISOString(),
      });
  });

  test("POST /loanedDevices existing resource", async () => {
    const agent = request(app.getHttpServer());
    await agent
      .post("/loanedDevices")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        fechaDevolucion: CREATE_RESULT.fechaDevolucion.toISOString(),
        fechaRegistro: CREATE_RESULT.fechaRegistro.toISOString(),
      })
      .then(function () {
        agent
          .post("/loanedDevices")
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
