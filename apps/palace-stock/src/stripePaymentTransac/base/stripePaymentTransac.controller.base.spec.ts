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
import { StripePaymentTransacController } from "../stripePaymentTransac.controller";
import { StripePaymentTransacService } from "../stripePaymentTransac.service";

const nonExistingId = "nonExistingId";
const existingId = "existingId";
const CREATE_INPUT = {
  amount: 42,
  created: new Date(),
  datosPago: "exampleDatosPago",
  eventStatus: "exampleEventStatus",
  fechaRegistro: new Date(),
  habilitarPagoRecurrente: 42,
  id: 42,
  linkVoucher: "exampleLinkVoucher",
  metodoPago: "exampleMetodoPago",
  paymentIntent: "examplePaymentIntent",
  stripeClientSecret: "exampleStripeClientSecret",
};
const CREATE_RESULT = {
  amount: 42,
  created: new Date(),
  datosPago: "exampleDatosPago",
  eventStatus: "exampleEventStatus",
  fechaRegistro: new Date(),
  habilitarPagoRecurrente: 42,
  id: 42,
  linkVoucher: "exampleLinkVoucher",
  metodoPago: "exampleMetodoPago",
  paymentIntent: "examplePaymentIntent",
  stripeClientSecret: "exampleStripeClientSecret",
};
const FIND_MANY_RESULT = [
  {
    amount: 42,
    created: new Date(),
    datosPago: "exampleDatosPago",
    eventStatus: "exampleEventStatus",
    fechaRegistro: new Date(),
    habilitarPagoRecurrente: 42,
    id: 42,
    linkVoucher: "exampleLinkVoucher",
    metodoPago: "exampleMetodoPago",
    paymentIntent: "examplePaymentIntent",
    stripeClientSecret: "exampleStripeClientSecret",
  },
];
const FIND_ONE_RESULT = {
  amount: 42,
  created: new Date(),
  datosPago: "exampleDatosPago",
  eventStatus: "exampleEventStatus",
  fechaRegistro: new Date(),
  habilitarPagoRecurrente: 42,
  id: 42,
  linkVoucher: "exampleLinkVoucher",
  metodoPago: "exampleMetodoPago",
  paymentIntent: "examplePaymentIntent",
  stripeClientSecret: "exampleStripeClientSecret",
};

const service = {
  createStripePaymentTransac() {
    return CREATE_RESULT;
  },
  stripePaymentTransacs: () => FIND_MANY_RESULT,
  stripePaymentTransac: ({ where }: { where: { id: string } }) => {
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

describe("StripePaymentTransac", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: StripePaymentTransacService,
          useValue: service,
        },
      ],
      controllers: [StripePaymentTransacController],
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

  test("POST /stripePaymentTransacs", async () => {
    await request(app.getHttpServer())
      .post("/stripePaymentTransacs")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        created: CREATE_RESULT.created.toISOString(),
        fechaRegistro: CREATE_RESULT.fechaRegistro.toISOString(),
      });
  });

  test("GET /stripePaymentTransacs", async () => {
    await request(app.getHttpServer())
      .get("/stripePaymentTransacs")
      .expect(HttpStatus.OK)
      .expect([
        {
          ...FIND_MANY_RESULT[0],
          created: FIND_MANY_RESULT[0].created.toISOString(),
          fechaRegistro: FIND_MANY_RESULT[0].fechaRegistro.toISOString(),
        },
      ]);
  });

  test("GET /stripePaymentTransacs/:id non existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/stripePaymentTransacs"}/${nonExistingId}`)
      .expect(HttpStatus.NOT_FOUND)
      .expect({
        statusCode: HttpStatus.NOT_FOUND,
        message: `No resource was found for {"${"id"}":"${nonExistingId}"}`,
        error: "Not Found",
      });
  });

  test("GET /stripePaymentTransacs/:id existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/stripePaymentTransacs"}/${existingId}`)
      .expect(HttpStatus.OK)
      .expect({
        ...FIND_ONE_RESULT,
        created: FIND_ONE_RESULT.created.toISOString(),
        fechaRegistro: FIND_ONE_RESULT.fechaRegistro.toISOString(),
      });
  });

  test("POST /stripePaymentTransacs existing resource", async () => {
    const agent = request(app.getHttpServer());
    await agent
      .post("/stripePaymentTransacs")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        created: CREATE_RESULT.created.toISOString(),
        fechaRegistro: CREATE_RESULT.fechaRegistro.toISOString(),
      })
      .then(function () {
        agent
          .post("/stripePaymentTransacs")
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
