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
import { ModifiedSalesclerkController } from "../modifiedSalesclerk.controller";
import { ModifiedSalesclerkService } from "../modifiedSalesclerk.service";

const nonExistingId = "nonExistingId";
const existingId = "existingId";
const CREATE_INPUT = {
  id: 42,
  newSalesclerkUserId: 42,
  oldSalesclerkUserId: 42,
  personalLoanId: 42,
  updatedAt: new Date(),
  updatedUserId: 42,
};
const CREATE_RESULT = {
  id: 42,
  newSalesclerkUserId: 42,
  oldSalesclerkUserId: 42,
  personalLoanId: 42,
  updatedAt: new Date(),
  updatedUserId: 42,
};
const FIND_MANY_RESULT = [
  {
    id: 42,
    newSalesclerkUserId: 42,
    oldSalesclerkUserId: 42,
    personalLoanId: 42,
    updatedAt: new Date(),
    updatedUserId: 42,
  },
];
const FIND_ONE_RESULT = {
  id: 42,
  newSalesclerkUserId: 42,
  oldSalesclerkUserId: 42,
  personalLoanId: 42,
  updatedAt: new Date(),
  updatedUserId: 42,
};

const service = {
  createModifiedSalesclerk() {
    return CREATE_RESULT;
  },
  modifiedSalesclerks: () => FIND_MANY_RESULT,
  modifiedSalesclerk: ({ where }: { where: { id: string } }) => {
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

describe("ModifiedSalesclerk", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: ModifiedSalesclerkService,
          useValue: service,
        },
      ],
      controllers: [ModifiedSalesclerkController],
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

  test("POST /modifiedSalesclerks", async () => {
    await request(app.getHttpServer())
      .post("/modifiedSalesclerks")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        updatedAt: CREATE_RESULT.updatedAt.toISOString(),
      });
  });

  test("GET /modifiedSalesclerks", async () => {
    await request(app.getHttpServer())
      .get("/modifiedSalesclerks")
      .expect(HttpStatus.OK)
      .expect([
        {
          ...FIND_MANY_RESULT[0],
          updatedAt: FIND_MANY_RESULT[0].updatedAt.toISOString(),
        },
      ]);
  });

  test("GET /modifiedSalesclerks/:id non existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/modifiedSalesclerks"}/${nonExistingId}`)
      .expect(HttpStatus.NOT_FOUND)
      .expect({
        statusCode: HttpStatus.NOT_FOUND,
        message: `No resource was found for {"${"id"}":"${nonExistingId}"}`,
        error: "Not Found",
      });
  });

  test("GET /modifiedSalesclerks/:id existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/modifiedSalesclerks"}/${existingId}`)
      .expect(HttpStatus.OK)
      .expect({
        ...FIND_ONE_RESULT,
        updatedAt: FIND_ONE_RESULT.updatedAt.toISOString(),
      });
  });

  test("POST /modifiedSalesclerks existing resource", async () => {
    const agent = request(app.getHttpServer());
    await agent
      .post("/modifiedSalesclerks")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        updatedAt: CREATE_RESULT.updatedAt.toISOString(),
      })
      .then(function () {
        agent
          .post("/modifiedSalesclerks")
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
