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
import { RecurringPaymentController } from "../recurringPayment.controller";
import { RecurringPaymentService } from "../recurringPayment.service";

const nonExistingId = "nonExistingId";
const existingId = "existingId";
const CREATE_INPUT = {
  fechaRegistro: new Date(),
  horaRegistro: new Date(),
  id: 42,
  mensajeIntento: "exampleMensajeIntento",
};
const CREATE_RESULT = {
  fechaRegistro: new Date(),
  horaRegistro: new Date(),
  id: 42,
  mensajeIntento: "exampleMensajeIntento",
};
const FIND_MANY_RESULT = [
  {
    fechaRegistro: new Date(),
    horaRegistro: new Date(),
    id: 42,
    mensajeIntento: "exampleMensajeIntento",
  },
];
const FIND_ONE_RESULT = {
  fechaRegistro: new Date(),
  horaRegistro: new Date(),
  id: 42,
  mensajeIntento: "exampleMensajeIntento",
};

const service = {
  createRecurringPayment() {
    return CREATE_RESULT;
  },
  recurringPayments: () => FIND_MANY_RESULT,
  recurringPayment: ({ where }: { where: { id: string } }) => {
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

describe("RecurringPayment", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: RecurringPaymentService,
          useValue: service,
        },
      ],
      controllers: [RecurringPaymentController],
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

  test("POST /recurringPayments", async () => {
    await request(app.getHttpServer())
      .post("/recurringPayments")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        fechaRegistro: CREATE_RESULT.fechaRegistro.toISOString(),
        horaRegistro: CREATE_RESULT.horaRegistro.toISOString(),
      });
  });

  test("GET /recurringPayments", async () => {
    await request(app.getHttpServer())
      .get("/recurringPayments")
      .expect(HttpStatus.OK)
      .expect([
        {
          ...FIND_MANY_RESULT[0],
          fechaRegistro: FIND_MANY_RESULT[0].fechaRegistro.toISOString(),
          horaRegistro: FIND_MANY_RESULT[0].horaRegistro.toISOString(),
        },
      ]);
  });

  test("GET /recurringPayments/:id non existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/recurringPayments"}/${nonExistingId}`)
      .expect(HttpStatus.NOT_FOUND)
      .expect({
        statusCode: HttpStatus.NOT_FOUND,
        message: `No resource was found for {"${"id"}":"${nonExistingId}"}`,
        error: "Not Found",
      });
  });

  test("GET /recurringPayments/:id existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/recurringPayments"}/${existingId}`)
      .expect(HttpStatus.OK)
      .expect({
        ...FIND_ONE_RESULT,
        fechaRegistro: FIND_ONE_RESULT.fechaRegistro.toISOString(),
        horaRegistro: FIND_ONE_RESULT.horaRegistro.toISOString(),
      });
  });

  test("POST /recurringPayments existing resource", async () => {
    const agent = request(app.getHttpServer());
    await agent
      .post("/recurringPayments")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        fechaRegistro: CREATE_RESULT.fechaRegistro.toISOString(),
        horaRegistro: CREATE_RESULT.horaRegistro.toISOString(),
      })
      .then(function () {
        agent
          .post("/recurringPayments")
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
