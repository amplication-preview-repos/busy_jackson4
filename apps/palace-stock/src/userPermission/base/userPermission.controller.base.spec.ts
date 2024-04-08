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
import { UserPermissionController } from "../userPermission.controller";
import { UserPermissionService } from "../userPermission.service";

const nonExistingId = "nonExistingId";
const existingId = "existingId";
const CREATE_INPUT = {
  fechaAsignoPermiso: new Date(),
  id: 42,
  idUsrAsignoPermiso: 42,
};
const CREATE_RESULT = {
  fechaAsignoPermiso: new Date(),
  id: 42,
  idUsrAsignoPermiso: 42,
};
const FIND_MANY_RESULT = [
  {
    fechaAsignoPermiso: new Date(),
    id: 42,
    idUsrAsignoPermiso: 42,
  },
];
const FIND_ONE_RESULT = {
  fechaAsignoPermiso: new Date(),
  id: 42,
  idUsrAsignoPermiso: 42,
};

const service = {
  createUserPermission() {
    return CREATE_RESULT;
  },
  userPermissions: () => FIND_MANY_RESULT,
  userPermission: ({ where }: { where: { id: string } }) => {
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

describe("UserPermission", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: UserPermissionService,
          useValue: service,
        },
      ],
      controllers: [UserPermissionController],
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

  test("POST /userPermissions", async () => {
    await request(app.getHttpServer())
      .post("/userPermissions")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        fechaAsignoPermiso: CREATE_RESULT.fechaAsignoPermiso.toISOString(),
      });
  });

  test("GET /userPermissions", async () => {
    await request(app.getHttpServer())
      .get("/userPermissions")
      .expect(HttpStatus.OK)
      .expect([
        {
          ...FIND_MANY_RESULT[0],
          fechaAsignoPermiso:
            FIND_MANY_RESULT[0].fechaAsignoPermiso.toISOString(),
        },
      ]);
  });

  test("GET /userPermissions/:id non existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/userPermissions"}/${nonExistingId}`)
      .expect(HttpStatus.NOT_FOUND)
      .expect({
        statusCode: HttpStatus.NOT_FOUND,
        message: `No resource was found for {"${"id"}":"${nonExistingId}"}`,
        error: "Not Found",
      });
  });

  test("GET /userPermissions/:id existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/userPermissions"}/${existingId}`)
      .expect(HttpStatus.OK)
      .expect({
        ...FIND_ONE_RESULT,
        fechaAsignoPermiso: FIND_ONE_RESULT.fechaAsignoPermiso.toISOString(),
      });
  });

  test("POST /userPermissions existing resource", async () => {
    const agent = request(app.getHttpServer());
    await agent
      .post("/userPermissions")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        fechaAsignoPermiso: CREATE_RESULT.fechaAsignoPermiso.toISOString(),
      })
      .then(function () {
        agent
          .post("/userPermissions")
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
