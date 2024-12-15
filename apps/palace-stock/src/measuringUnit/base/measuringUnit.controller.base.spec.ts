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
import { MeasuringUnitController } from "../measuringUnit.controller";
import { MeasuringUnitService } from "../measuringUnit.service";

const nonExistingId = "nonExistingId";
const existingId = "existingId";
const CREATE_INPUT = {
  claveSatUm: "exampleClaveSatUm",
  descripcionUm: "exampleDescripcionUm",
  descripcionUmSat: "exampleDescripcionUmSat",
  id: 42,
  umCfdi: "exampleUmCfdi",
  unidadMedida: "exampleUnidadMedida",
};
const CREATE_RESULT = {
  claveSatUm: "exampleClaveSatUm",
  descripcionUm: "exampleDescripcionUm",
  descripcionUmSat: "exampleDescripcionUmSat",
  id: 42,
  umCfdi: "exampleUmCfdi",
  unidadMedida: "exampleUnidadMedida",
};
const FIND_MANY_RESULT = [
  {
    claveSatUm: "exampleClaveSatUm",
    descripcionUm: "exampleDescripcionUm",
    descripcionUmSat: "exampleDescripcionUmSat",
    id: 42,
    umCfdi: "exampleUmCfdi",
    unidadMedida: "exampleUnidadMedida",
  },
];
const FIND_ONE_RESULT = {
  claveSatUm: "exampleClaveSatUm",
  descripcionUm: "exampleDescripcionUm",
  descripcionUmSat: "exampleDescripcionUmSat",
  id: 42,
  umCfdi: "exampleUmCfdi",
  unidadMedida: "exampleUnidadMedida",
};

const service = {
  createMeasuringUnit() {
    return CREATE_RESULT;
  },
  measuringUnits: () => FIND_MANY_RESULT,
  measuringUnit: ({ where }: { where: { id: string } }) => {
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

describe("MeasuringUnit", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: MeasuringUnitService,
          useValue: service,
        },
      ],
      controllers: [MeasuringUnitController],
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

  test("POST /measuringUnits", async () => {
    await request(app.getHttpServer())
      .post("/measuringUnits")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect(CREATE_RESULT);
  });

  test("GET /measuringUnits", async () => {
    await request(app.getHttpServer())
      .get("/measuringUnits")
      .expect(HttpStatus.OK)
      .expect([FIND_MANY_RESULT[0]]);
  });

  test("GET /measuringUnits/:id non existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/measuringUnits"}/${nonExistingId}`)
      .expect(HttpStatus.NOT_FOUND)
      .expect({
        statusCode: HttpStatus.NOT_FOUND,
        message: `No resource was found for {"${"id"}":"${nonExistingId}"}`,
        error: "Not Found",
      });
  });

  test("GET /measuringUnits/:id existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/measuringUnits"}/${existingId}`)
      .expect(HttpStatus.OK)
      .expect(FIND_ONE_RESULT);
  });

  test("POST /measuringUnits existing resource", async () => {
    const agent = request(app.getHttpServer());
    await agent
      .post("/measuringUnits")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect(CREATE_RESULT)
      .then(function () {
        agent
          .post("/measuringUnits")
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
