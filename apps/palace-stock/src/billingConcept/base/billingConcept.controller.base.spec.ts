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
import { BillingConceptController } from "../billingConcept.controller";
import { BillingConceptService } from "../billingConcept.service";

const nonExistingId = "nonExistingId";
const existingId = "existingId";
const CREATE_INPUT = {
  claveUsoCfdi: "exampleClaveUsoCfdi",
  codigoConcepto: "exampleCodigoConcepto",
  conceptoFactura: "exampleConceptoFactura",
  descripcion: "exampleDescripcion",
  id: 42,
  numFormaPago: "exampleNumFormaPago",
  serieFactura: "exampleSerieFactura",
};
const CREATE_RESULT = {
  claveUsoCfdi: "exampleClaveUsoCfdi",
  codigoConcepto: "exampleCodigoConcepto",
  conceptoFactura: "exampleConceptoFactura",
  descripcion: "exampleDescripcion",
  id: 42,
  numFormaPago: "exampleNumFormaPago",
  serieFactura: "exampleSerieFactura",
};
const FIND_MANY_RESULT = [
  {
    claveUsoCfdi: "exampleClaveUsoCfdi",
    codigoConcepto: "exampleCodigoConcepto",
    conceptoFactura: "exampleConceptoFactura",
    descripcion: "exampleDescripcion",
    id: 42,
    numFormaPago: "exampleNumFormaPago",
    serieFactura: "exampleSerieFactura",
  },
];
const FIND_ONE_RESULT = {
  claveUsoCfdi: "exampleClaveUsoCfdi",
  codigoConcepto: "exampleCodigoConcepto",
  conceptoFactura: "exampleConceptoFactura",
  descripcion: "exampleDescripcion",
  id: 42,
  numFormaPago: "exampleNumFormaPago",
  serieFactura: "exampleSerieFactura",
};

const service = {
  createBillingConcept() {
    return CREATE_RESULT;
  },
  billingConcepts: () => FIND_MANY_RESULT,
  billingConcept: ({ where }: { where: { id: string } }) => {
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

describe("BillingConcept", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: BillingConceptService,
          useValue: service,
        },
      ],
      controllers: [BillingConceptController],
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

  test("POST /billingConcepts", async () => {
    await request(app.getHttpServer())
      .post("/billingConcepts")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect(CREATE_RESULT);
  });

  test("GET /billingConcepts", async () => {
    await request(app.getHttpServer())
      .get("/billingConcepts")
      .expect(HttpStatus.OK)
      .expect([FIND_MANY_RESULT[0]]);
  });

  test("GET /billingConcepts/:id non existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/billingConcepts"}/${nonExistingId}`)
      .expect(HttpStatus.NOT_FOUND)
      .expect({
        statusCode: HttpStatus.NOT_FOUND,
        message: `No resource was found for {"${"id"}":"${nonExistingId}"}`,
        error: "Not Found",
      });
  });

  test("GET /billingConcepts/:id existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/billingConcepts"}/${existingId}`)
      .expect(HttpStatus.OK)
      .expect(FIND_ONE_RESULT);
  });

  test("POST /billingConcepts existing resource", async () => {
    const agent = request(app.getHttpServer());
    await agent
      .post("/billingConcepts")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect(CREATE_RESULT)
      .then(function () {
        agent
          .post("/billingConcepts")
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
