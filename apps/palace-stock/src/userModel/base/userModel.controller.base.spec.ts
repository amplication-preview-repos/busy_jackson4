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
import { UserModelController } from "../userModel.controller";
import { UserModelService } from "../userModel.service";

const nonExistingId = "nonExistingId";
const existingId = "existingId";
const CREATE_INPUT = {
  fechaRegistroUsuario: new Date(),
  id: 42,
  idColabRegistroUsuario: 42,
  passCifrado: "examplePassCifrado",
  permisosExcluidos: "examplePermisosExcluidos",
  userName: "exampleUserName",
};
const CREATE_RESULT = {
  fechaRegistroUsuario: new Date(),
  id: 42,
  idColabRegistroUsuario: 42,
  passCifrado: "examplePassCifrado",
  permisosExcluidos: "examplePermisosExcluidos",
  userName: "exampleUserName",
};
const FIND_MANY_RESULT = [
  {
    fechaRegistroUsuario: new Date(),
    id: 42,
    idColabRegistroUsuario: 42,
    passCifrado: "examplePassCifrado",
    permisosExcluidos: "examplePermisosExcluidos",
    userName: "exampleUserName",
  },
];
const FIND_ONE_RESULT = {
  fechaRegistroUsuario: new Date(),
  id: 42,
  idColabRegistroUsuario: 42,
  passCifrado: "examplePassCifrado",
  permisosExcluidos: "examplePermisosExcluidos",
  userName: "exampleUserName",
};

const service = {
  createUserModel() {
    return CREATE_RESULT;
  },
  userModels: () => FIND_MANY_RESULT,
  userModel: ({ where }: { where: { id: string } }) => {
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

describe("UserModel", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: UserModelService,
          useValue: service,
        },
      ],
      controllers: [UserModelController],
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

  test("POST /userModels", async () => {
    await request(app.getHttpServer())
      .post("/userModels")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        fechaRegistroUsuario: CREATE_RESULT.fechaRegistroUsuario.toISOString(),
      });
  });

  test("GET /userModels", async () => {
    await request(app.getHttpServer())
      .get("/userModels")
      .expect(HttpStatus.OK)
      .expect([
        {
          ...FIND_MANY_RESULT[0],
          fechaRegistroUsuario:
            FIND_MANY_RESULT[0].fechaRegistroUsuario.toISOString(),
        },
      ]);
  });

  test("GET /userModels/:id non existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/userModels"}/${nonExistingId}`)
      .expect(HttpStatus.NOT_FOUND)
      .expect({
        statusCode: HttpStatus.NOT_FOUND,
        message: `No resource was found for {"${"id"}":"${nonExistingId}"}`,
        error: "Not Found",
      });
  });

  test("GET /userModels/:id existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/userModels"}/${existingId}`)
      .expect(HttpStatus.OK)
      .expect({
        ...FIND_ONE_RESULT,
        fechaRegistroUsuario:
          FIND_ONE_RESULT.fechaRegistroUsuario.toISOString(),
      });
  });

  test("POST /userModels existing resource", async () => {
    const agent = request(app.getHttpServer());
    await agent
      .post("/userModels")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        fechaRegistroUsuario: CREATE_RESULT.fechaRegistroUsuario.toISOString(),
      })
      .then(function () {
        agent
          .post("/userModels")
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
