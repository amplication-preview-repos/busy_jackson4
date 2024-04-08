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
import { FinancedAccessoryController } from "../financedAccessory.controller";
import { FinancedAccessoryService } from "../financedAccessory.service";

const nonExistingId = "nonExistingId";
const existingId = "existingId";
const CREATE_INPUT = {
  cantUnidades: 42,
  engancheAccesorio: 42.424242424,
  id: 42,
  precioVenta: 42.424242424,
};
const CREATE_RESULT = {
  cantUnidades: 42,
  engancheAccesorio: 42.424242424,
  id: 42,
  precioVenta: 42.424242424,
};
const FIND_MANY_RESULT = [
  {
    cantUnidades: 42,
    engancheAccesorio: 42.424242424,
    id: 42,
    precioVenta: 42.424242424,
  },
];
const FIND_ONE_RESULT = {
  cantUnidades: 42,
  engancheAccesorio: 42.424242424,
  id: 42,
  precioVenta: 42.424242424,
};

const service = {
  createFinancedAccessory() {
    return CREATE_RESULT;
  },
  financedAccessories: () => FIND_MANY_RESULT,
  financedAccessory: ({ where }: { where: { id: string } }) => {
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

describe("FinancedAccessory", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: FinancedAccessoryService,
          useValue: service,
        },
      ],
      controllers: [FinancedAccessoryController],
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

  test("POST /financedAccessories", async () => {
    await request(app.getHttpServer())
      .post("/financedAccessories")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect(CREATE_RESULT);
  });

  test("GET /financedAccessories", async () => {
    await request(app.getHttpServer())
      .get("/financedAccessories")
      .expect(HttpStatus.OK)
      .expect([FIND_MANY_RESULT[0]]);
  });

  test("GET /financedAccessories/:id non existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/financedAccessories"}/${nonExistingId}`)
      .expect(HttpStatus.NOT_FOUND)
      .expect({
        statusCode: HttpStatus.NOT_FOUND,
        message: `No resource was found for {"${"id"}":"${nonExistingId}"}`,
        error: "Not Found",
      });
  });

  test("GET /financedAccessories/:id existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/financedAccessories"}/${existingId}`)
      .expect(HttpStatus.OK)
      .expect(FIND_ONE_RESULT);
  });

  test("POST /financedAccessories existing resource", async () => {
    const agent = request(app.getHttpServer());
    await agent
      .post("/financedAccessories")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect(CREATE_RESULT)
      .then(function () {
        agent
          .post("/financedAccessories")
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
