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
import { BillingClassifCodeController } from "../billingClassifCode.controller";
import { BillingClassifCodeService } from "../billingClassifCode.service";

const nonExistingId = "nonExistingId";
const existingId = "existingId";
const CREATE_INPUT = {
  codigoClasificacion: "exampleCodigoClasificacion",
  descripcion: "exampleDescripcion",
  id: 42,
};
const CREATE_RESULT = {
  codigoClasificacion: "exampleCodigoClasificacion",
  descripcion: "exampleDescripcion",
  id: 42,
};
const FIND_MANY_RESULT = [
  {
    codigoClasificacion: "exampleCodigoClasificacion",
    descripcion: "exampleDescripcion",
    id: 42,
  },
];
const FIND_ONE_RESULT = {
  codigoClasificacion: "exampleCodigoClasificacion",
  descripcion: "exampleDescripcion",
  id: 42,
};

const service = {
  createBillingClassifCode() {
    return CREATE_RESULT;
  },
  billingClassifCodes: () => FIND_MANY_RESULT,
  billingClassifCode: ({ where }: { where: { id: string } }) => {
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

describe("BillingClassifCode", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: BillingClassifCodeService,
          useValue: service,
        },
      ],
      controllers: [BillingClassifCodeController],
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

  test("POST /billingClassifCodes", async () => {
    await request(app.getHttpServer())
      .post("/billingClassifCodes")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect(CREATE_RESULT);
  });

  test("GET /billingClassifCodes", async () => {
    await request(app.getHttpServer())
      .get("/billingClassifCodes")
      .expect(HttpStatus.OK)
      .expect([FIND_MANY_RESULT[0]]);
  });

  test("GET /billingClassifCodes/:id non existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/billingClassifCodes"}/${nonExistingId}`)
      .expect(HttpStatus.NOT_FOUND)
      .expect({
        statusCode: HttpStatus.NOT_FOUND,
        message: `No resource was found for {"${"id"}":"${nonExistingId}"}`,
        error: "Not Found",
      });
  });

  test("GET /billingClassifCodes/:id existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/billingClassifCodes"}/${existingId}`)
      .expect(HttpStatus.OK)
      .expect(FIND_ONE_RESULT);
  });

  test("POST /billingClassifCodes existing resource", async () => {
    const agent = request(app.getHttpServer());
    await agent
      .post("/billingClassifCodes")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect(CREATE_RESULT)
      .then(function () {
        agent
          .post("/billingClassifCodes")
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
