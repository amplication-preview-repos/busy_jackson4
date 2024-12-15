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
import { NubariumValidationController } from "../nubariumValidation.controller";
import { NubariumValidationService } from "../nubariumValidation.service";

const nonExistingId = "nonExistingId";
const existingId = "existingId";
const CREATE_INPUT = {
  claveElectorCliente: "exampleClaveElectorCliente",
  fecha: new Date(),
  id: 42,
};
const CREATE_RESULT = {
  claveElectorCliente: "exampleClaveElectorCliente",
  fecha: new Date(),
  id: 42,
};
const FIND_MANY_RESULT = [
  {
    claveElectorCliente: "exampleClaveElectorCliente",
    fecha: new Date(),
    id: 42,
  },
];
const FIND_ONE_RESULT = {
  claveElectorCliente: "exampleClaveElectorCliente",
  fecha: new Date(),
  id: 42,
};

const service = {
  createNubariumValidation() {
    return CREATE_RESULT;
  },
  nubariumValidations: () => FIND_MANY_RESULT,
  nubariumValidation: ({ where }: { where: { id: string } }) => {
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

describe("NubariumValidation", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: NubariumValidationService,
          useValue: service,
        },
      ],
      controllers: [NubariumValidationController],
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

  test("POST /nubariumValidations", async () => {
    await request(app.getHttpServer())
      .post("/nubariumValidations")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        fecha: CREATE_RESULT.fecha.toISOString(),
      });
  });

  test("GET /nubariumValidations", async () => {
    await request(app.getHttpServer())
      .get("/nubariumValidations")
      .expect(HttpStatus.OK)
      .expect([
        {
          ...FIND_MANY_RESULT[0],
          fecha: FIND_MANY_RESULT[0].fecha.toISOString(),
        },
      ]);
  });

  test("GET /nubariumValidations/:id non existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/nubariumValidations"}/${nonExistingId}`)
      .expect(HttpStatus.NOT_FOUND)
      .expect({
        statusCode: HttpStatus.NOT_FOUND,
        message: `No resource was found for {"${"id"}":"${nonExistingId}"}`,
        error: "Not Found",
      });
  });

  test("GET /nubariumValidations/:id existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/nubariumValidations"}/${existingId}`)
      .expect(HttpStatus.OK)
      .expect({
        ...FIND_ONE_RESULT,
        fecha: FIND_ONE_RESULT.fecha.toISOString(),
      });
  });

  test("POST /nubariumValidations existing resource", async () => {
    const agent = request(app.getHttpServer());
    await agent
      .post("/nubariumValidations")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        fecha: CREATE_RESULT.fecha.toISOString(),
      })
      .then(function () {
        agent
          .post("/nubariumValidations")
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
