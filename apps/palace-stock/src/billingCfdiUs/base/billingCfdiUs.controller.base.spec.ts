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
import { BillingCfdiUsController } from "../billingCfdiUs.controller";
import { BillingCfdiUsService } from "../billingCfdiUs.service";

const nonExistingId = "nonExistingId";
const existingId = "existingId";
const CREATE_INPUT = {
  aplicaPersFisica: 42,
  aplicaPersMoral: 42,
  clave: "exampleClave",
  descripcion: "exampleDescripcion",
  id: 42,
};
const CREATE_RESULT = {
  aplicaPersFisica: 42,
  aplicaPersMoral: 42,
  clave: "exampleClave",
  descripcion: "exampleDescripcion",
  id: 42,
};
const FIND_MANY_RESULT = [
  {
    aplicaPersFisica: 42,
    aplicaPersMoral: 42,
    clave: "exampleClave",
    descripcion: "exampleDescripcion",
    id: 42,
  },
];
const FIND_ONE_RESULT = {
  aplicaPersFisica: 42,
  aplicaPersMoral: 42,
  clave: "exampleClave",
  descripcion: "exampleDescripcion",
  id: 42,
};

const service = {
  createBillingCfdiUs() {
    return CREATE_RESULT;
  },
  billingCfdiuses: () => FIND_MANY_RESULT,
  billingCfdiUs: ({ where }: { where: { id: string } }) => {
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

describe("BillingCfdiUs", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: BillingCfdiUsService,
          useValue: service,
        },
      ],
      controllers: [BillingCfdiUsController],
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

  test("POST /billingCfdiuses", async () => {
    await request(app.getHttpServer())
      .post("/billingCfdiuses")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect(CREATE_RESULT);
  });

  test("GET /billingCfdiuses", async () => {
    await request(app.getHttpServer())
      .get("/billingCfdiuses")
      .expect(HttpStatus.OK)
      .expect([FIND_MANY_RESULT[0]]);
  });

  test("GET /billingCfdiuses/:id non existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/billingCfdiuses"}/${nonExistingId}`)
      .expect(HttpStatus.NOT_FOUND)
      .expect({
        statusCode: HttpStatus.NOT_FOUND,
        message: `No resource was found for {"${"id"}":"${nonExistingId}"}`,
        error: "Not Found",
      });
  });

  test("GET /billingCfdiuses/:id existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/billingCfdiuses"}/${existingId}`)
      .expect(HttpStatus.OK)
      .expect(FIND_ONE_RESULT);
  });

  test("POST /billingCfdiuses existing resource", async () => {
    const agent = request(app.getHttpServer());
    await agent
      .post("/billingCfdiuses")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect(CREATE_RESULT)
      .then(function () {
        agent
          .post("/billingCfdiuses")
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
