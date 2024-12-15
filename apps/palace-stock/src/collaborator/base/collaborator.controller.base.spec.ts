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
import { CollaboratorController } from "../collaborator.controller";
import { CollaboratorService } from "../collaborator.service";

const nonExistingId = "nonExistingId";
const existingId = "existingId";
const CREATE_INPUT = {
  apellido1: "exampleApellido1",
  apellido2: "exampleApellido2",
  cargo: "exampleCargo",
  ciudad: "exampleCiudad",
  ciudadActual: "exampleCiudadActual",
  codigoPostal: 42,
  codigoPostalActual: 42,
  colonia: "exampleColonia",
  coloniaActual: "exampleColoniaActual",
  correoContacto: "exampleCorreoContacto",
  curp: "exampleCurp",
  direccionActual: "exampleDireccionActual",
  domicilio: "exampleDomicilio",
  domicilioActual: "exampleDomicilioActual",
  esquemaPago: "exampleEsquemaPago",
  estado: "exampleEstado",
  estadoActual: "exampleEstadoActual",
  fechaCambioEsquema: new Date(),
  fechaIngreso: new Date(),
  fechaNacimiento: new Date(),
  fechaRegistro: new Date(),
  fechaReingreso: new Date(),
  id: 42,
  nombres: "exampleNombres",
  rfc: "exampleRfc",
  telefonoContacto: "exampleTelefonoContacto",
};
const CREATE_RESULT = {
  apellido1: "exampleApellido1",
  apellido2: "exampleApellido2",
  cargo: "exampleCargo",
  ciudad: "exampleCiudad",
  ciudadActual: "exampleCiudadActual",
  codigoPostal: 42,
  codigoPostalActual: 42,
  colonia: "exampleColonia",
  coloniaActual: "exampleColoniaActual",
  correoContacto: "exampleCorreoContacto",
  curp: "exampleCurp",
  direccionActual: "exampleDireccionActual",
  domicilio: "exampleDomicilio",
  domicilioActual: "exampleDomicilioActual",
  esquemaPago: "exampleEsquemaPago",
  estado: "exampleEstado",
  estadoActual: "exampleEstadoActual",
  fechaCambioEsquema: new Date(),
  fechaIngreso: new Date(),
  fechaNacimiento: new Date(),
  fechaRegistro: new Date(),
  fechaReingreso: new Date(),
  id: 42,
  nombres: "exampleNombres",
  rfc: "exampleRfc",
  telefonoContacto: "exampleTelefonoContacto",
};
const FIND_MANY_RESULT = [
  {
    apellido1: "exampleApellido1",
    apellido2: "exampleApellido2",
    cargo: "exampleCargo",
    ciudad: "exampleCiudad",
    ciudadActual: "exampleCiudadActual",
    codigoPostal: 42,
    codigoPostalActual: 42,
    colonia: "exampleColonia",
    coloniaActual: "exampleColoniaActual",
    correoContacto: "exampleCorreoContacto",
    curp: "exampleCurp",
    direccionActual: "exampleDireccionActual",
    domicilio: "exampleDomicilio",
    domicilioActual: "exampleDomicilioActual",
    esquemaPago: "exampleEsquemaPago",
    estado: "exampleEstado",
    estadoActual: "exampleEstadoActual",
    fechaCambioEsquema: new Date(),
    fechaIngreso: new Date(),
    fechaNacimiento: new Date(),
    fechaRegistro: new Date(),
    fechaReingreso: new Date(),
    id: 42,
    nombres: "exampleNombres",
    rfc: "exampleRfc",
    telefonoContacto: "exampleTelefonoContacto",
  },
];
const FIND_ONE_RESULT = {
  apellido1: "exampleApellido1",
  apellido2: "exampleApellido2",
  cargo: "exampleCargo",
  ciudad: "exampleCiudad",
  ciudadActual: "exampleCiudadActual",
  codigoPostal: 42,
  codigoPostalActual: 42,
  colonia: "exampleColonia",
  coloniaActual: "exampleColoniaActual",
  correoContacto: "exampleCorreoContacto",
  curp: "exampleCurp",
  direccionActual: "exampleDireccionActual",
  domicilio: "exampleDomicilio",
  domicilioActual: "exampleDomicilioActual",
  esquemaPago: "exampleEsquemaPago",
  estado: "exampleEstado",
  estadoActual: "exampleEstadoActual",
  fechaCambioEsquema: new Date(),
  fechaIngreso: new Date(),
  fechaNacimiento: new Date(),
  fechaRegistro: new Date(),
  fechaReingreso: new Date(),
  id: 42,
  nombres: "exampleNombres",
  rfc: "exampleRfc",
  telefonoContacto: "exampleTelefonoContacto",
};

const service = {
  createCollaborator() {
    return CREATE_RESULT;
  },
  collaborators: () => FIND_MANY_RESULT,
  collaborator: ({ where }: { where: { id: string } }) => {
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

describe("Collaborator", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: CollaboratorService,
          useValue: service,
        },
      ],
      controllers: [CollaboratorController],
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

  test("POST /collaborators", async () => {
    await request(app.getHttpServer())
      .post("/collaborators")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        fechaCambioEsquema: CREATE_RESULT.fechaCambioEsquema.toISOString(),
        fechaIngreso: CREATE_RESULT.fechaIngreso.toISOString(),
        fechaNacimiento: CREATE_RESULT.fechaNacimiento.toISOString(),
        fechaRegistro: CREATE_RESULT.fechaRegistro.toISOString(),
        fechaReingreso: CREATE_RESULT.fechaReingreso.toISOString(),
      });
  });

  test("GET /collaborators", async () => {
    await request(app.getHttpServer())
      .get("/collaborators")
      .expect(HttpStatus.OK)
      .expect([
        {
          ...FIND_MANY_RESULT[0],
          fechaCambioEsquema:
            FIND_MANY_RESULT[0].fechaCambioEsquema.toISOString(),
          fechaIngreso: FIND_MANY_RESULT[0].fechaIngreso.toISOString(),
          fechaNacimiento: FIND_MANY_RESULT[0].fechaNacimiento.toISOString(),
          fechaRegistro: FIND_MANY_RESULT[0].fechaRegistro.toISOString(),
          fechaReingreso: FIND_MANY_RESULT[0].fechaReingreso.toISOString(),
        },
      ]);
  });

  test("GET /collaborators/:id non existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/collaborators"}/${nonExistingId}`)
      .expect(HttpStatus.NOT_FOUND)
      .expect({
        statusCode: HttpStatus.NOT_FOUND,
        message: `No resource was found for {"${"id"}":"${nonExistingId}"}`,
        error: "Not Found",
      });
  });

  test("GET /collaborators/:id existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/collaborators"}/${existingId}`)
      .expect(HttpStatus.OK)
      .expect({
        ...FIND_ONE_RESULT,
        fechaCambioEsquema: FIND_ONE_RESULT.fechaCambioEsquema.toISOString(),
        fechaIngreso: FIND_ONE_RESULT.fechaIngreso.toISOString(),
        fechaNacimiento: FIND_ONE_RESULT.fechaNacimiento.toISOString(),
        fechaRegistro: FIND_ONE_RESULT.fechaRegistro.toISOString(),
        fechaReingreso: FIND_ONE_RESULT.fechaReingreso.toISOString(),
      });
  });

  test("POST /collaborators existing resource", async () => {
    const agent = request(app.getHttpServer());
    await agent
      .post("/collaborators")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        fechaCambioEsquema: CREATE_RESULT.fechaCambioEsquema.toISOString(),
        fechaIngreso: CREATE_RESULT.fechaIngreso.toISOString(),
        fechaNacimiento: CREATE_RESULT.fechaNacimiento.toISOString(),
        fechaRegistro: CREATE_RESULT.fechaRegistro.toISOString(),
        fechaReingreso: CREATE_RESULT.fechaReingreso.toISOString(),
      })
      .then(function () {
        agent
          .post("/collaborators")
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
