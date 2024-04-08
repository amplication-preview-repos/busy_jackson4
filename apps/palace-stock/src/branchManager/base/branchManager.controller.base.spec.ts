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
import { BranchManagerController } from "../branchManager.controller";
import { BranchManagerService } from "../branchManager.service";

const nonExistingId = "nonExistingId";
const existingId = "existingId";
const CREATE_INPUT = {
  cargo: 42,
  fechaIniciaCargo: new Date(),
  id: 42,
  numSucursal: 42,
};
const CREATE_RESULT = {
  cargo: 42,
  fechaIniciaCargo: new Date(),
  id: 42,
  numSucursal: 42,
};
const FIND_MANY_RESULT = [
  {
    cargo: 42,
    fechaIniciaCargo: new Date(),
    id: 42,
    numSucursal: 42,
  },
];
const FIND_ONE_RESULT = {
  cargo: 42,
  fechaIniciaCargo: new Date(),
  id: 42,
  numSucursal: 42,
};

const service = {
  createBranchManager() {
    return CREATE_RESULT;
  },
  branchManagers: () => FIND_MANY_RESULT,
  branchManager: ({ where }: { where: { id: string } }) => {
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

describe("BranchManager", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: BranchManagerService,
          useValue: service,
        },
      ],
      controllers: [BranchManagerController],
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

  test("POST /branchManagers", async () => {
    await request(app.getHttpServer())
      .post("/branchManagers")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        fechaIniciaCargo: CREATE_RESULT.fechaIniciaCargo.toISOString(),
      });
  });

  test("GET /branchManagers", async () => {
    await request(app.getHttpServer())
      .get("/branchManagers")
      .expect(HttpStatus.OK)
      .expect([
        {
          ...FIND_MANY_RESULT[0],
          fechaIniciaCargo: FIND_MANY_RESULT[0].fechaIniciaCargo.toISOString(),
        },
      ]);
  });

  test("GET /branchManagers/:id non existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/branchManagers"}/${nonExistingId}`)
      .expect(HttpStatus.NOT_FOUND)
      .expect({
        statusCode: HttpStatus.NOT_FOUND,
        message: `No resource was found for {"${"id"}":"${nonExistingId}"}`,
        error: "Not Found",
      });
  });

  test("GET /branchManagers/:id existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/branchManagers"}/${existingId}`)
      .expect(HttpStatus.OK)
      .expect({
        ...FIND_ONE_RESULT,
        fechaIniciaCargo: FIND_ONE_RESULT.fechaIniciaCargo.toISOString(),
      });
  });

  test("POST /branchManagers existing resource", async () => {
    const agent = request(app.getHttpServer());
    await agent
      .post("/branchManagers")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        fechaIniciaCargo: CREATE_RESULT.fechaIniciaCargo.toISOString(),
      })
      .then(function () {
        agent
          .post("/branchManagers")
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
