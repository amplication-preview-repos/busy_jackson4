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
import { ProtectionCertStatusController } from "../protectionCertStatus.controller";
import { ProtectionCertStatusService } from "../protectionCertStatus.service";

const nonExistingId = "nonExistingId";
const existingId = "existingId";
const CREATE_INPUT = {
  descripEstatusCertProtec: "exampleDescripEstatusCertProtec",
  estatusCertProtec: "exampleEstatusCertProtec",
  id: 42,
};
const CREATE_RESULT = {
  descripEstatusCertProtec: "exampleDescripEstatusCertProtec",
  estatusCertProtec: "exampleEstatusCertProtec",
  id: 42,
};
const FIND_MANY_RESULT = [
  {
    descripEstatusCertProtec: "exampleDescripEstatusCertProtec",
    estatusCertProtec: "exampleEstatusCertProtec",
    id: 42,
  },
];
const FIND_ONE_RESULT = {
  descripEstatusCertProtec: "exampleDescripEstatusCertProtec",
  estatusCertProtec: "exampleEstatusCertProtec",
  id: 42,
};

const service = {
  createProtectionCertStatus() {
    return CREATE_RESULT;
  },
  protectionCertStatuses: () => FIND_MANY_RESULT,
  protectionCertStatus: ({ where }: { where: { id: string } }) => {
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

describe("ProtectionCertStatus", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: ProtectionCertStatusService,
          useValue: service,
        },
      ],
      controllers: [ProtectionCertStatusController],
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

  test("POST /protectionCertStatuses", async () => {
    await request(app.getHttpServer())
      .post("/protectionCertStatuses")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect(CREATE_RESULT);
  });

  test("GET /protectionCertStatuses", async () => {
    await request(app.getHttpServer())
      .get("/protectionCertStatuses")
      .expect(HttpStatus.OK)
      .expect([FIND_MANY_RESULT[0]]);
  });

  test("GET /protectionCertStatuses/:id non existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/protectionCertStatuses"}/${nonExistingId}`)
      .expect(HttpStatus.NOT_FOUND)
      .expect({
        statusCode: HttpStatus.NOT_FOUND,
        message: `No resource was found for {"${"id"}":"${nonExistingId}"}`,
        error: "Not Found",
      });
  });

  test("GET /protectionCertStatuses/:id existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/protectionCertStatuses"}/${existingId}`)
      .expect(HttpStatus.OK)
      .expect(FIND_ONE_RESULT);
  });

  test("POST /protectionCertStatuses existing resource", async () => {
    const agent = request(app.getHttpServer());
    await agent
      .post("/protectionCertStatuses")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect(CREATE_RESULT)
      .then(function () {
        agent
          .post("/protectionCertStatuses")
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
