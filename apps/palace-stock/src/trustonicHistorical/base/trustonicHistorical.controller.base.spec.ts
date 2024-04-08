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
import { TrustonicHistoricalController } from "../trustonicHistorical.controller";
import { TrustonicHistoricalService } from "../trustonicHistorical.service";

const nonExistingId = "nonExistingId";
const existingId = "existingId";
const CREATE_INPUT = {
  assignedPolicy: "exampleAssignedPolicy",
  assignedPolicyActivationTime: new Date(),
  assignedPolicyAssignmentTime: new Date(),
  deviceReady: "true",
  fechaRegistro: new Date(),
  firstEnrol: new Date(),
  id: 42,
  imeiNo: "exampleImeiNo",
  lastCheckin: new Date(),
  lastReportedPolicy: "exampleLastReportedPolicy",
};
const CREATE_RESULT = {
  assignedPolicy: "exampleAssignedPolicy",
  assignedPolicyActivationTime: new Date(),
  assignedPolicyAssignmentTime: new Date(),
  deviceReady: "true",
  fechaRegistro: new Date(),
  firstEnrol: new Date(),
  id: 42,
  imeiNo: "exampleImeiNo",
  lastCheckin: new Date(),
  lastReportedPolicy: "exampleLastReportedPolicy",
};
const FIND_MANY_RESULT = [
  {
    assignedPolicy: "exampleAssignedPolicy",
    assignedPolicyActivationTime: new Date(),
    assignedPolicyAssignmentTime: new Date(),
    deviceReady: "true",
    fechaRegistro: new Date(),
    firstEnrol: new Date(),
    id: 42,
    imeiNo: "exampleImeiNo",
    lastCheckin: new Date(),
    lastReportedPolicy: "exampleLastReportedPolicy",
  },
];
const FIND_ONE_RESULT = {
  assignedPolicy: "exampleAssignedPolicy",
  assignedPolicyActivationTime: new Date(),
  assignedPolicyAssignmentTime: new Date(),
  deviceReady: "true",
  fechaRegistro: new Date(),
  firstEnrol: new Date(),
  id: 42,
  imeiNo: "exampleImeiNo",
  lastCheckin: new Date(),
  lastReportedPolicy: "exampleLastReportedPolicy",
};

const service = {
  createTrustonicHistorical() {
    return CREATE_RESULT;
  },
  trustonicHistoricals: () => FIND_MANY_RESULT,
  trustonicHistorical: ({ where }: { where: { id: string } }) => {
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

describe("TrustonicHistorical", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: TrustonicHistoricalService,
          useValue: service,
        },
      ],
      controllers: [TrustonicHistoricalController],
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

  test("POST /trustonicHistoricals", async () => {
    await request(app.getHttpServer())
      .post("/trustonicHistoricals")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        assignedPolicyActivationTime:
          CREATE_RESULT.assignedPolicyActivationTime.toISOString(),
        assignedPolicyAssignmentTime:
          CREATE_RESULT.assignedPolicyAssignmentTime.toISOString(),
        fechaRegistro: CREATE_RESULT.fechaRegistro.toISOString(),
        firstEnrol: CREATE_RESULT.firstEnrol.toISOString(),
        lastCheckin: CREATE_RESULT.lastCheckin.toISOString(),
      });
  });

  test("GET /trustonicHistoricals", async () => {
    await request(app.getHttpServer())
      .get("/trustonicHistoricals")
      .expect(HttpStatus.OK)
      .expect([
        {
          ...FIND_MANY_RESULT[0],
          assignedPolicyActivationTime:
            FIND_MANY_RESULT[0].assignedPolicyActivationTime.toISOString(),
          assignedPolicyAssignmentTime:
            FIND_MANY_RESULT[0].assignedPolicyAssignmentTime.toISOString(),
          fechaRegistro: FIND_MANY_RESULT[0].fechaRegistro.toISOString(),
          firstEnrol: FIND_MANY_RESULT[0].firstEnrol.toISOString(),
          lastCheckin: FIND_MANY_RESULT[0].lastCheckin.toISOString(),
        },
      ]);
  });

  test("GET /trustonicHistoricals/:id non existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/trustonicHistoricals"}/${nonExistingId}`)
      .expect(HttpStatus.NOT_FOUND)
      .expect({
        statusCode: HttpStatus.NOT_FOUND,
        message: `No resource was found for {"${"id"}":"${nonExistingId}"}`,
        error: "Not Found",
      });
  });

  test("GET /trustonicHistoricals/:id existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/trustonicHistoricals"}/${existingId}`)
      .expect(HttpStatus.OK)
      .expect({
        ...FIND_ONE_RESULT,
        assignedPolicyActivationTime:
          FIND_ONE_RESULT.assignedPolicyActivationTime.toISOString(),
        assignedPolicyAssignmentTime:
          FIND_ONE_RESULT.assignedPolicyAssignmentTime.toISOString(),
        fechaRegistro: FIND_ONE_RESULT.fechaRegistro.toISOString(),
        firstEnrol: FIND_ONE_RESULT.firstEnrol.toISOString(),
        lastCheckin: FIND_ONE_RESULT.lastCheckin.toISOString(),
      });
  });

  test("POST /trustonicHistoricals existing resource", async () => {
    const agent = request(app.getHttpServer());
    await agent
      .post("/trustonicHistoricals")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        assignedPolicyActivationTime:
          CREATE_RESULT.assignedPolicyActivationTime.toISOString(),
        assignedPolicyAssignmentTime:
          CREATE_RESULT.assignedPolicyAssignmentTime.toISOString(),
        fechaRegistro: CREATE_RESULT.fechaRegistro.toISOString(),
        firstEnrol: CREATE_RESULT.firstEnrol.toISOString(),
        lastCheckin: CREATE_RESULT.lastCheckin.toISOString(),
      })
      .then(function () {
        agent
          .post("/trustonicHistoricals")
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
