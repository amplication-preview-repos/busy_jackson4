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
import { KardexSeryController } from "../kardexSery.controller";
import { KardexSeryService } from "../kardexSery.service";

const nonExistingId = "nonExistingId";
const existingId = "existingId";
const CREATE_INPUT = {
  codigoBloqueo: "exampleCodigoBloqueo",
  id: 42,
  otraSerie: "exampleOtraSerie",
  serialCode: "exampleSerialCode",
};
const CREATE_RESULT = {
  codigoBloqueo: "exampleCodigoBloqueo",
  id: 42,
  otraSerie: "exampleOtraSerie",
  serialCode: "exampleSerialCode",
};
const FIND_MANY_RESULT = [
  {
    codigoBloqueo: "exampleCodigoBloqueo",
    id: 42,
    otraSerie: "exampleOtraSerie",
    serialCode: "exampleSerialCode",
  },
];
const FIND_ONE_RESULT = {
  codigoBloqueo: "exampleCodigoBloqueo",
  id: 42,
  otraSerie: "exampleOtraSerie",
  serialCode: "exampleSerialCode",
};

const service = {
  createKardexSery() {
    return CREATE_RESULT;
  },
  kardexSeries: () => FIND_MANY_RESULT,
  kardexSery: ({ where }: { where: { id: string } }) => {
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

describe("KardexSery", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: KardexSeryService,
          useValue: service,
        },
      ],
      controllers: [KardexSeryController],
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

  test("POST /kardexSeries", async () => {
    await request(app.getHttpServer())
      .post("/kardexSeries")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect(CREATE_RESULT);
  });

  test("GET /kardexSeries", async () => {
    await request(app.getHttpServer())
      .get("/kardexSeries")
      .expect(HttpStatus.OK)
      .expect([FIND_MANY_RESULT[0]]);
  });

  test("GET /kardexSeries/:id non existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/kardexSeries"}/${nonExistingId}`)
      .expect(HttpStatus.NOT_FOUND)
      .expect({
        statusCode: HttpStatus.NOT_FOUND,
        message: `No resource was found for {"${"id"}":"${nonExistingId}"}`,
        error: "Not Found",
      });
  });

  test("GET /kardexSeries/:id existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/kardexSeries"}/${existingId}`)
      .expect(HttpStatus.OK)
      .expect(FIND_ONE_RESULT);
  });

  test("POST /kardexSeries existing resource", async () => {
    const agent = request(app.getHttpServer());
    await agent
      .post("/kardexSeries")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect(CREATE_RESULT)
      .then(function () {
        agent
          .post("/kardexSeries")
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
