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
import { CategoryController } from "../category.controller";
import { CategoryService } from "../category.service";

const nonExistingId = "nonExistingId";
const existingId = "existingId";
const CREATE_INPUT = {
  catCode: "exampleCatCode",
  claveSatPs: 42,
  codigoClasificacion: "exampleCodigoClasificacion",
  descripcionCat: "exampleDescripcionCat",
  id: 42,
};
const CREATE_RESULT = {
  catCode: "exampleCatCode",
  claveSatPs: 42,
  codigoClasificacion: "exampleCodigoClasificacion",
  descripcionCat: "exampleDescripcionCat",
  id: 42,
};
const FIND_MANY_RESULT = [
  {
    catCode: "exampleCatCode",
    claveSatPs: 42,
    codigoClasificacion: "exampleCodigoClasificacion",
    descripcionCat: "exampleDescripcionCat",
    id: 42,
  },
];
const FIND_ONE_RESULT = {
  catCode: "exampleCatCode",
  claveSatPs: 42,
  codigoClasificacion: "exampleCodigoClasificacion",
  descripcionCat: "exampleDescripcionCat",
  id: 42,
};

const service = {
  createCategory() {
    return CREATE_RESULT;
  },
  categories: () => FIND_MANY_RESULT,
  category: ({ where }: { where: { id: string } }) => {
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

describe("Category", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: CategoryService,
          useValue: service,
        },
      ],
      controllers: [CategoryController],
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

  test("POST /categories", async () => {
    await request(app.getHttpServer())
      .post("/categories")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect(CREATE_RESULT);
  });

  test("GET /categories", async () => {
    await request(app.getHttpServer())
      .get("/categories")
      .expect(HttpStatus.OK)
      .expect([FIND_MANY_RESULT[0]]);
  });

  test("GET /categories/:id non existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/categories"}/${nonExistingId}`)
      .expect(HttpStatus.NOT_FOUND)
      .expect({
        statusCode: HttpStatus.NOT_FOUND,
        message: `No resource was found for {"${"id"}":"${nonExistingId}"}`,
        error: "Not Found",
      });
  });

  test("GET /categories/:id existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/categories"}/${existingId}`)
      .expect(HttpStatus.OK)
      .expect(FIND_ONE_RESULT);
  });

  test("POST /categories existing resource", async () => {
    const agent = request(app.getHttpServer());
    await agent
      .post("/categories")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect(CREATE_RESULT)
      .then(function () {
        agent
          .post("/categories")
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
