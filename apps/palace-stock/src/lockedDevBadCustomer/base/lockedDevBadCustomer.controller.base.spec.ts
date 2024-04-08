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
import { LockedDevBadCustomerController } from "../lockedDevBadCustomer.controller";
import { LockedDevBadCustomerService } from "../lockedDevBadCustomer.service";

const nonExistingId = "nonExistingId";
const existingId = "existingId";
const CREATE_INPUT = {
  codigoBloqueoMoroso: "exampleCodigoBloqueoMoroso",
  deviceId: "exampleDeviceId",
  fechaBloqueado: new Date(),
  fechaDesbloqueado: new Date(),
  id: 42,
};
const CREATE_RESULT = {
  codigoBloqueoMoroso: "exampleCodigoBloqueoMoroso",
  deviceId: "exampleDeviceId",
  fechaBloqueado: new Date(),
  fechaDesbloqueado: new Date(),
  id: 42,
};
const FIND_MANY_RESULT = [
  {
    codigoBloqueoMoroso: "exampleCodigoBloqueoMoroso",
    deviceId: "exampleDeviceId",
    fechaBloqueado: new Date(),
    fechaDesbloqueado: new Date(),
    id: 42,
  },
];
const FIND_ONE_RESULT = {
  codigoBloqueoMoroso: "exampleCodigoBloqueoMoroso",
  deviceId: "exampleDeviceId",
  fechaBloqueado: new Date(),
  fechaDesbloqueado: new Date(),
  id: 42,
};

const service = {
  createLockedDevBadCustomer() {
    return CREATE_RESULT;
  },
  lockedDevBadCustomers: () => FIND_MANY_RESULT,
  lockedDevBadCustomer: ({ where }: { where: { id: string } }) => {
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

describe("LockedDevBadCustomer", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: LockedDevBadCustomerService,
          useValue: service,
        },
      ],
      controllers: [LockedDevBadCustomerController],
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

  test("POST /lockedDevBadCustomers", async () => {
    await request(app.getHttpServer())
      .post("/lockedDevBadCustomers")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        fechaBloqueado: CREATE_RESULT.fechaBloqueado.toISOString(),
        fechaDesbloqueado: CREATE_RESULT.fechaDesbloqueado.toISOString(),
      });
  });

  test("GET /lockedDevBadCustomers", async () => {
    await request(app.getHttpServer())
      .get("/lockedDevBadCustomers")
      .expect(HttpStatus.OK)
      .expect([
        {
          ...FIND_MANY_RESULT[0],
          fechaBloqueado: FIND_MANY_RESULT[0].fechaBloqueado.toISOString(),
          fechaDesbloqueado:
            FIND_MANY_RESULT[0].fechaDesbloqueado.toISOString(),
        },
      ]);
  });

  test("GET /lockedDevBadCustomers/:id non existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/lockedDevBadCustomers"}/${nonExistingId}`)
      .expect(HttpStatus.NOT_FOUND)
      .expect({
        statusCode: HttpStatus.NOT_FOUND,
        message: `No resource was found for {"${"id"}":"${nonExistingId}"}`,
        error: "Not Found",
      });
  });

  test("GET /lockedDevBadCustomers/:id existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/lockedDevBadCustomers"}/${existingId}`)
      .expect(HttpStatus.OK)
      .expect({
        ...FIND_ONE_RESULT,
        fechaBloqueado: FIND_ONE_RESULT.fechaBloqueado.toISOString(),
        fechaDesbloqueado: FIND_ONE_RESULT.fechaDesbloqueado.toISOString(),
      });
  });

  test("POST /lockedDevBadCustomers existing resource", async () => {
    const agent = request(app.getHttpServer());
    await agent
      .post("/lockedDevBadCustomers")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        fechaBloqueado: CREATE_RESULT.fechaBloqueado.toISOString(),
        fechaDesbloqueado: CREATE_RESULT.fechaDesbloqueado.toISOString(),
      })
      .then(function () {
        agent
          .post("/lockedDevBadCustomers")
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
