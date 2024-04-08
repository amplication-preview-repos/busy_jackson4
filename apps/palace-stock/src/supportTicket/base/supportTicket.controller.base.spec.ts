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
import { SupportTicketController } from "../supportTicket.controller";
import { SupportTicketService } from "../supportTicket.service";

const nonExistingId = "nonExistingId";
const existingId = "existingId";
const CREATE_INPUT = {
  codigoBloqueo: "exampleCodigoBloqueo",
  comentarios: "exampleComentarios",
  createdUserId: 42,
  estatus: "exampleEstatus",
  fechaCierre: new Date(),
  fechaRegistro: new Date(),
  id: 42,
  informacionAdicional: "exampleInformacionAdicional",
  subtipo: "exampleSubtipo",
  tipo: "exampleTipo",
};
const CREATE_RESULT = {
  codigoBloqueo: "exampleCodigoBloqueo",
  comentarios: "exampleComentarios",
  createdUserId: 42,
  estatus: "exampleEstatus",
  fechaCierre: new Date(),
  fechaRegistro: new Date(),
  id: 42,
  informacionAdicional: "exampleInformacionAdicional",
  subtipo: "exampleSubtipo",
  tipo: "exampleTipo",
};
const FIND_MANY_RESULT = [
  {
    codigoBloqueo: "exampleCodigoBloqueo",
    comentarios: "exampleComentarios",
    createdUserId: 42,
    estatus: "exampleEstatus",
    fechaCierre: new Date(),
    fechaRegistro: new Date(),
    id: 42,
    informacionAdicional: "exampleInformacionAdicional",
    subtipo: "exampleSubtipo",
    tipo: "exampleTipo",
  },
];
const FIND_ONE_RESULT = {
  codigoBloqueo: "exampleCodigoBloqueo",
  comentarios: "exampleComentarios",
  createdUserId: 42,
  estatus: "exampleEstatus",
  fechaCierre: new Date(),
  fechaRegistro: new Date(),
  id: 42,
  informacionAdicional: "exampleInformacionAdicional",
  subtipo: "exampleSubtipo",
  tipo: "exampleTipo",
};

const service = {
  createSupportTicket() {
    return CREATE_RESULT;
  },
  supportTickets: () => FIND_MANY_RESULT,
  supportTicket: ({ where }: { where: { id: string } }) => {
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

describe("SupportTicket", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: SupportTicketService,
          useValue: service,
        },
      ],
      controllers: [SupportTicketController],
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

  test("POST /supportTickets", async () => {
    await request(app.getHttpServer())
      .post("/supportTickets")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        fechaCierre: CREATE_RESULT.fechaCierre.toISOString(),
        fechaRegistro: CREATE_RESULT.fechaRegistro.toISOString(),
      });
  });

  test("GET /supportTickets", async () => {
    await request(app.getHttpServer())
      .get("/supportTickets")
      .expect(HttpStatus.OK)
      .expect([
        {
          ...FIND_MANY_RESULT[0],
          fechaCierre: FIND_MANY_RESULT[0].fechaCierre.toISOString(),
          fechaRegistro: FIND_MANY_RESULT[0].fechaRegistro.toISOString(),
        },
      ]);
  });

  test("GET /supportTickets/:id non existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/supportTickets"}/${nonExistingId}`)
      .expect(HttpStatus.NOT_FOUND)
      .expect({
        statusCode: HttpStatus.NOT_FOUND,
        message: `No resource was found for {"${"id"}":"${nonExistingId}"}`,
        error: "Not Found",
      });
  });

  test("GET /supportTickets/:id existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/supportTickets"}/${existingId}`)
      .expect(HttpStatus.OK)
      .expect({
        ...FIND_ONE_RESULT,
        fechaCierre: FIND_ONE_RESULT.fechaCierre.toISOString(),
        fechaRegistro: FIND_ONE_RESULT.fechaRegistro.toISOString(),
      });
  });

  test("POST /supportTickets existing resource", async () => {
    const agent = request(app.getHttpServer());
    await agent
      .post("/supportTickets")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        fechaCierre: CREATE_RESULT.fechaCierre.toISOString(),
        fechaRegistro: CREATE_RESULT.fechaRegistro.toISOString(),
      })
      .then(function () {
        agent
          .post("/supportTickets")
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
