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
import { AccessLevelController } from "../accessLevel.controller";
import { AccessLevelService } from "../accessLevel.service";

const nonExistingId = "nonExistingId";
const existingId = "existingId";
const CREATE_INPUT = {
  descripcionNivel: "exampleDescripcionNivel",
  id: 42,
  nivel: "exampleNivel",
  nivelConsulta: "exampleNivelConsulta",
};
const CREATE_RESULT = {
  descripcionNivel: "exampleDescripcionNivel",
  id: 42,
  nivel: "exampleNivel",
  nivelConsulta: "exampleNivelConsulta",
};
const FIND_MANY_RESULT = [
  {
    descripcionNivel: "exampleDescripcionNivel",
    id: 42,
    nivel: "exampleNivel",
    nivelConsulta: "exampleNivelConsulta",
  },
];
const FIND_ONE_RESULT = {
  descripcionNivel: "exampleDescripcionNivel",
  id: 42,
  nivel: "exampleNivel",
  nivelConsulta: "exampleNivelConsulta",
};

const service = {
  createAccessLevel() {
    return CREATE_RESULT;
  },
  accessLevels: () => FIND_MANY_RESULT,
  accessLevel: ({ where }: { where: { id: string } }) => {
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

describe("AccessLevel", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: AccessLevelService,
          useValue: service,
        },
      ],
      controllers: [AccessLevelController],
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

  test("POST /accessLevels", async () => {
    await request(app.getHttpServer())
      .post("/accessLevels")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect(CREATE_RESULT);
  });

  test("GET /accessLevels", async () => {
    await request(app.getHttpServer())
      .get("/accessLevels")
      .expect(HttpStatus.OK)
      .expect([FIND_MANY_RESULT[0]]);
  });

  test("GET /accessLevels/:id non existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/accessLevels"}/${nonExistingId}`)
      .expect(HttpStatus.NOT_FOUND)
      .expect({
        statusCode: HttpStatus.NOT_FOUND,
        message: `No resource was found for {"${"id"}":"${nonExistingId}"}`,
        error: "Not Found",
      });
  });

  test("GET /accessLevels/:id existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/accessLevels"}/${existingId}`)
      .expect(HttpStatus.OK)
      .expect(FIND_ONE_RESULT);
  });

  test("POST /accessLevels existing resource", async () => {
    const agent = request(app.getHttpServer());
    await agent
      .post("/accessLevels")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect(CREATE_RESULT)
      .then(function () {
        agent
          .post("/accessLevels")
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
