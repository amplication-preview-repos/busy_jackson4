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
import { TimelyPayDiscountController } from "../timelyPayDiscount.controller";
import { TimelyPayDiscountService } from "../timelyPayDiscount.service";

const nonExistingId = "nonExistingId";
const existingId = "existingId";
const CREATE_INPUT = {
  descuento: 42,
  descuentoDecimal: 42.424242424,
  descuentoMultiplo: 42.424242424,
  id: 42,
};
const CREATE_RESULT = {
  descuento: 42,
  descuentoDecimal: 42.424242424,
  descuentoMultiplo: 42.424242424,
  id: 42,
};
const FIND_MANY_RESULT = [
  {
    descuento: 42,
    descuentoDecimal: 42.424242424,
    descuentoMultiplo: 42.424242424,
    id: 42,
  },
];
const FIND_ONE_RESULT = {
  descuento: 42,
  descuentoDecimal: 42.424242424,
  descuentoMultiplo: 42.424242424,
  id: 42,
};

const service = {
  createTimelyPayDiscount() {
    return CREATE_RESULT;
  },
  timelyPayDiscounts: () => FIND_MANY_RESULT,
  timelyPayDiscount: ({ where }: { where: { id: string } }) => {
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

describe("TimelyPayDiscount", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: TimelyPayDiscountService,
          useValue: service,
        },
      ],
      controllers: [TimelyPayDiscountController],
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

  test("POST /timelyPayDiscounts", async () => {
    await request(app.getHttpServer())
      .post("/timelyPayDiscounts")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect(CREATE_RESULT);
  });

  test("GET /timelyPayDiscounts", async () => {
    await request(app.getHttpServer())
      .get("/timelyPayDiscounts")
      .expect(HttpStatus.OK)
      .expect([FIND_MANY_RESULT[0]]);
  });

  test("GET /timelyPayDiscounts/:id non existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/timelyPayDiscounts"}/${nonExistingId}`)
      .expect(HttpStatus.NOT_FOUND)
      .expect({
        statusCode: HttpStatus.NOT_FOUND,
        message: `No resource was found for {"${"id"}":"${nonExistingId}"}`,
        error: "Not Found",
      });
  });

  test("GET /timelyPayDiscounts/:id existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/timelyPayDiscounts"}/${existingId}`)
      .expect(HttpStatus.OK)
      .expect(FIND_ONE_RESULT);
  });

  test("POST /timelyPayDiscounts existing resource", async () => {
    const agent = request(app.getHttpServer());
    await agent
      .post("/timelyPayDiscounts")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect(CREATE_RESULT)
      .then(function () {
        agent
          .post("/timelyPayDiscounts")
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
