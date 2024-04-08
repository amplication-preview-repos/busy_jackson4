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
import { DocumentController } from "../document.controller";
import { DocumentService } from "../document.service";

const nonExistingId = "nonExistingId";
const existingId = "existingId";
const CREATE_INPUT = {
  direccion: "exampleDireccion",
  documentTypeId: 42,
  fechaHoraCarga: new Date(),
  id: 42,
  idCertProtecAct: 42,
  idFicha: 42,
  nombreOriginal: "exampleNombreOriginal",
  numTicket: 42,
  validado: "true",
  validatedAt: new Date(),
  validationUserId: 42,
};
const CREATE_RESULT = {
  direccion: "exampleDireccion",
  documentTypeId: 42,
  fechaHoraCarga: new Date(),
  id: 42,
  idCertProtecAct: 42,
  idFicha: 42,
  nombreOriginal: "exampleNombreOriginal",
  numTicket: 42,
  validado: "true",
  validatedAt: new Date(),
  validationUserId: 42,
};
const FIND_MANY_RESULT = [
  {
    direccion: "exampleDireccion",
    documentTypeId: 42,
    fechaHoraCarga: new Date(),
    id: 42,
    idCertProtecAct: 42,
    idFicha: 42,
    nombreOriginal: "exampleNombreOriginal",
    numTicket: 42,
    validado: "true",
    validatedAt: new Date(),
    validationUserId: 42,
  },
];
const FIND_ONE_RESULT = {
  direccion: "exampleDireccion",
  documentTypeId: 42,
  fechaHoraCarga: new Date(),
  id: 42,
  idCertProtecAct: 42,
  idFicha: 42,
  nombreOriginal: "exampleNombreOriginal",
  numTicket: 42,
  validado: "true",
  validatedAt: new Date(),
  validationUserId: 42,
};

const service = {
  createDocument() {
    return CREATE_RESULT;
  },
  documents: () => FIND_MANY_RESULT,
  document: ({ where }: { where: { id: string } }) => {
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

describe("Document", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: DocumentService,
          useValue: service,
        },
      ],
      controllers: [DocumentController],
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

  test("POST /documents", async () => {
    await request(app.getHttpServer())
      .post("/documents")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        fechaHoraCarga: CREATE_RESULT.fechaHoraCarga.toISOString(),
        validatedAt: CREATE_RESULT.validatedAt.toISOString(),
      });
  });

  test("GET /documents", async () => {
    await request(app.getHttpServer())
      .get("/documents")
      .expect(HttpStatus.OK)
      .expect([
        {
          ...FIND_MANY_RESULT[0],
          fechaHoraCarga: FIND_MANY_RESULT[0].fechaHoraCarga.toISOString(),
          validatedAt: FIND_MANY_RESULT[0].validatedAt.toISOString(),
        },
      ]);
  });

  test("GET /documents/:id non existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/documents"}/${nonExistingId}`)
      .expect(HttpStatus.NOT_FOUND)
      .expect({
        statusCode: HttpStatus.NOT_FOUND,
        message: `No resource was found for {"${"id"}":"${nonExistingId}"}`,
        error: "Not Found",
      });
  });

  test("GET /documents/:id existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/documents"}/${existingId}`)
      .expect(HttpStatus.OK)
      .expect({
        ...FIND_ONE_RESULT,
        fechaHoraCarga: FIND_ONE_RESULT.fechaHoraCarga.toISOString(),
        validatedAt: FIND_ONE_RESULT.validatedAt.toISOString(),
      });
  });

  test("POST /documents existing resource", async () => {
    const agent = request(app.getHttpServer());
    await agent
      .post("/documents")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        fechaHoraCarga: CREATE_RESULT.fechaHoraCarga.toISOString(),
        validatedAt: CREATE_RESULT.validatedAt.toISOString(),
      })
      .then(function () {
        agent
          .post("/documents")
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
