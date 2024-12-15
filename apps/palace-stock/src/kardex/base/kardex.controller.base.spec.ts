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
import { KardexController } from "../kardex.controller";
import { KardexService } from "../kardex.service";

const nonExistingId = "nonExistingId";
const existingId = "existingId";
const CREATE_INPUT = {
  cantUnidades: 42.424242424,
  id: 42,
  ivaUnidad: 42.424242424,
  precioUnidad: 42.424242424,
};
const CREATE_RESULT = {
  cantUnidades: 42.424242424,
  id: 42,
  ivaUnidad: 42.424242424,
  precioUnidad: 42.424242424,
};
const FIND_MANY_RESULT = [
  {
    cantUnidades: 42.424242424,
    id: 42,
    ivaUnidad: 42.424242424,
    precioUnidad: 42.424242424,
  },
];
const FIND_ONE_RESULT = {
  cantUnidades: 42.424242424,
  id: 42,
  ivaUnidad: 42.424242424,
  precioUnidad: 42.424242424,
};

const service = {
  createKardex() {
    return CREATE_RESULT;
  },
  kardexes: () => FIND_MANY_RESULT,
  kardex: ({ where }: { where: { id: string } }) => {
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

describe("Kardex", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: KardexService,
          useValue: service,
        },
      ],
      controllers: [KardexController],
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

  test("POST /kardexes", async () => {
    await request(app.getHttpServer())
      .post("/kardexes")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect(CREATE_RESULT);
  });

  test("GET /kardexes", async () => {
    await request(app.getHttpServer())
      .get("/kardexes")
      .expect(HttpStatus.OK)
      .expect([FIND_MANY_RESULT[0]]);
  });

  test("GET /kardexes/:id non existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/kardexes"}/${nonExistingId}`)
      .expect(HttpStatus.NOT_FOUND)
      .expect({
        statusCode: HttpStatus.NOT_FOUND,
        message: `No resource was found for {"${"id"}":"${nonExistingId}"}`,
        error: "Not Found",
      });
  });

  test("GET /kardexes/:id existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/kardexes"}/${existingId}`)
      .expect(HttpStatus.OK)
      .expect(FIND_ONE_RESULT);
  });

  test("POST /kardexes existing resource", async () => {
    const agent = request(app.getHttpServer());
    await agent
      .post("/kardexes")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect(CREATE_RESULT)
      .then(function () {
        agent
          .post("/kardexes")
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
