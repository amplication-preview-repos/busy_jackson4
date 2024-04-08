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
import { PaymentWayController } from "../paymentWay.controller";
import { PaymentWayService } from "../paymentWay.service";

const nonExistingId = "nonExistingId";
const existingId = "existingId";
const CREATE_INPUT = {
  descripcion: "exampleDescripcion",
  id: 42,
  numFormaPago: "exampleNumFormaPago",
  paymentWay: "examplePaymentWay",
};
const CREATE_RESULT = {
  descripcion: "exampleDescripcion",
  id: 42,
  numFormaPago: "exampleNumFormaPago",
  paymentWay: "examplePaymentWay",
};
const FIND_MANY_RESULT = [
  {
    descripcion: "exampleDescripcion",
    id: 42,
    numFormaPago: "exampleNumFormaPago",
    paymentWay: "examplePaymentWay",
  },
];
const FIND_ONE_RESULT = {
  descripcion: "exampleDescripcion",
  id: 42,
  numFormaPago: "exampleNumFormaPago",
  paymentWay: "examplePaymentWay",
};

const service = {
  createPaymentWay() {
    return CREATE_RESULT;
  },
  paymentWays: () => FIND_MANY_RESULT,
  paymentWay: ({ where }: { where: { id: string } }) => {
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

describe("PaymentWay", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: PaymentWayService,
          useValue: service,
        },
      ],
      controllers: [PaymentWayController],
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

  test("POST /paymentWays", async () => {
    await request(app.getHttpServer())
      .post("/paymentWays")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect(CREATE_RESULT);
  });

  test("GET /paymentWays", async () => {
    await request(app.getHttpServer())
      .get("/paymentWays")
      .expect(HttpStatus.OK)
      .expect([FIND_MANY_RESULT[0]]);
  });

  test("GET /paymentWays/:id non existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/paymentWays"}/${nonExistingId}`)
      .expect(HttpStatus.NOT_FOUND)
      .expect({
        statusCode: HttpStatus.NOT_FOUND,
        message: `No resource was found for {"${"id"}":"${nonExistingId}"}`,
        error: "Not Found",
      });
  });

  test("GET /paymentWays/:id existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/paymentWays"}/${existingId}`)
      .expect(HttpStatus.OK)
      .expect(FIND_ONE_RESULT);
  });

  test("POST /paymentWays existing resource", async () => {
    const agent = request(app.getHttpServer());
    await agent
      .post("/paymentWays")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect(CREATE_RESULT)
      .then(function () {
        agent
          .post("/paymentWays")
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
