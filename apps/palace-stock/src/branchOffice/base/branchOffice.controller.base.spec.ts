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
import { BranchOfficeController } from "../branchOffice.controller";
import { BranchOfficeService } from "../branchOffice.service";

const nonExistingId = "nonExistingId";
const existingId = "existingId";
const CREATE_INPUT = {
  branchName: "exampleBranchName",
  branchNo: 42,
  ciudadMunicipio: "exampleCiudadMunicipio",
  codigoPostal: "exampleCodigoPostal",
  direccion: "exampleDireccion",
  estadoRepublica: "exampleEstadoRepublica",
  fechaRegistro: new Date(),
  id: 42,
  region: "exampleRegion",
};
const CREATE_RESULT = {
  branchName: "exampleBranchName",
  branchNo: 42,
  ciudadMunicipio: "exampleCiudadMunicipio",
  codigoPostal: "exampleCodigoPostal",
  direccion: "exampleDireccion",
  estadoRepublica: "exampleEstadoRepublica",
  fechaRegistro: new Date(),
  id: 42,
  region: "exampleRegion",
};
const FIND_MANY_RESULT = [
  {
    branchName: "exampleBranchName",
    branchNo: 42,
    ciudadMunicipio: "exampleCiudadMunicipio",
    codigoPostal: "exampleCodigoPostal",
    direccion: "exampleDireccion",
    estadoRepublica: "exampleEstadoRepublica",
    fechaRegistro: new Date(),
    id: 42,
    region: "exampleRegion",
  },
];
const FIND_ONE_RESULT = {
  branchName: "exampleBranchName",
  branchNo: 42,
  ciudadMunicipio: "exampleCiudadMunicipio",
  codigoPostal: "exampleCodigoPostal",
  direccion: "exampleDireccion",
  estadoRepublica: "exampleEstadoRepublica",
  fechaRegistro: new Date(),
  id: 42,
  region: "exampleRegion",
};

const service = {
  createBranchOffice() {
    return CREATE_RESULT;
  },
  branchOffices: () => FIND_MANY_RESULT,
  branchOffice: ({ where }: { where: { id: string } }) => {
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

describe("BranchOffice", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: BranchOfficeService,
          useValue: service,
        },
      ],
      controllers: [BranchOfficeController],
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

  test("POST /branchOffices", async () => {
    await request(app.getHttpServer())
      .post("/branchOffices")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        fechaRegistro: CREATE_RESULT.fechaRegistro.toISOString(),
      });
  });

  test("GET /branchOffices", async () => {
    await request(app.getHttpServer())
      .get("/branchOffices")
      .expect(HttpStatus.OK)
      .expect([
        {
          ...FIND_MANY_RESULT[0],
          fechaRegistro: FIND_MANY_RESULT[0].fechaRegistro.toISOString(),
        },
      ]);
  });

  test("GET /branchOffices/:id non existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/branchOffices"}/${nonExistingId}`)
      .expect(HttpStatus.NOT_FOUND)
      .expect({
        statusCode: HttpStatus.NOT_FOUND,
        message: `No resource was found for {"${"id"}":"${nonExistingId}"}`,
        error: "Not Found",
      });
  });

  test("GET /branchOffices/:id existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/branchOffices"}/${existingId}`)
      .expect(HttpStatus.OK)
      .expect({
        ...FIND_ONE_RESULT,
        fechaRegistro: FIND_ONE_RESULT.fechaRegistro.toISOString(),
      });
  });

  test("POST /branchOffices existing resource", async () => {
    const agent = request(app.getHttpServer());
    await agent
      .post("/branchOffices")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        fechaRegistro: CREATE_RESULT.fechaRegistro.toISOString(),
      })
      .then(function () {
        agent
          .post("/branchOffices")
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
