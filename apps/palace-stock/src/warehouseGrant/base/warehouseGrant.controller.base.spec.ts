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
import { WarehouseGrantController } from "../warehouseGrant.controller";
import { WarehouseGrantService } from "../warehouseGrant.service";

const nonExistingId = "nonExistingId";
const existingId = "existingId";
const CREATE_INPUT = {
  fechaAsignacion: new Date(),
  id: 42,
  mainWhouse: "true",
};
const CREATE_RESULT = {
  fechaAsignacion: new Date(),
  id: 42,
  mainWhouse: "true",
};
const FIND_MANY_RESULT = [
  {
    fechaAsignacion: new Date(),
    id: 42,
    mainWhouse: "true",
  },
];
const FIND_ONE_RESULT = {
  fechaAsignacion: new Date(),
  id: 42,
  mainWhouse: "true",
};

const service = {
  createWarehouseGrant() {
    return CREATE_RESULT;
  },
  warehouseGrants: () => FIND_MANY_RESULT,
  warehouseGrant: ({ where }: { where: { id: string } }) => {
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

describe("WarehouseGrant", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: WarehouseGrantService,
          useValue: service,
        },
      ],
      controllers: [WarehouseGrantController],
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

  test("POST /warehouseGrants", async () => {
    await request(app.getHttpServer())
      .post("/warehouseGrants")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        fechaAsignacion: CREATE_RESULT.fechaAsignacion.toISOString(),
      });
  });

  test("GET /warehouseGrants", async () => {
    await request(app.getHttpServer())
      .get("/warehouseGrants")
      .expect(HttpStatus.OK)
      .expect([
        {
          ...FIND_MANY_RESULT[0],
          fechaAsignacion: FIND_MANY_RESULT[0].fechaAsignacion.toISOString(),
        },
      ]);
  });

  test("GET /warehouseGrants/:id non existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/warehouseGrants"}/${nonExistingId}`)
      .expect(HttpStatus.NOT_FOUND)
      .expect({
        statusCode: HttpStatus.NOT_FOUND,
        message: `No resource was found for {"${"id"}":"${nonExistingId}"}`,
        error: "Not Found",
      });
  });

  test("GET /warehouseGrants/:id existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/warehouseGrants"}/${existingId}`)
      .expect(HttpStatus.OK)
      .expect({
        ...FIND_ONE_RESULT,
        fechaAsignacion: FIND_ONE_RESULT.fechaAsignacion.toISOString(),
      });
  });

  test("POST /warehouseGrants existing resource", async () => {
    const agent = request(app.getHttpServer());
    await agent
      .post("/warehouseGrants")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        fechaAsignacion: CREATE_RESULT.fechaAsignacion.toISOString(),
      })
      .then(function () {
        agent
          .post("/warehouseGrants")
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
