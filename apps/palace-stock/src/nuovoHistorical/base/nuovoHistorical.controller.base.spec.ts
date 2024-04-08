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
import { NuovoHistoricalController } from "../nuovoHistorical.controller";
import { NuovoHistoricalService } from "../nuovoHistorical.service";

const nonExistingId = "nonExistingId";
const existingId = "existingId";
const CREATE_INPUT = {
  createdAt: new Date(),
  deviceId: "exampleDeviceId",
  id: 42,
  imeiNo: "exampleImeiNo",
  imeiNo2: "exampleImeiNo2",
  lastConnectedAt: new Date(),
  locationAddress: "exampleLocationAddress",
  locationLatitude: 42.424242424,
  locationLongitude: 42.424242424,
  make: "exampleMake",
  model: "exampleModel",
  nextLockDate: new Date(),
  serialNo: "exampleSerialNo",
  status: "exampleStatus",
};
const CREATE_RESULT = {
  createdAt: new Date(),
  deviceId: "exampleDeviceId",
  id: 42,
  imeiNo: "exampleImeiNo",
  imeiNo2: "exampleImeiNo2",
  lastConnectedAt: new Date(),
  locationAddress: "exampleLocationAddress",
  locationLatitude: 42.424242424,
  locationLongitude: 42.424242424,
  make: "exampleMake",
  model: "exampleModel",
  nextLockDate: new Date(),
  serialNo: "exampleSerialNo",
  status: "exampleStatus",
};
const FIND_MANY_RESULT = [
  {
    createdAt: new Date(),
    deviceId: "exampleDeviceId",
    id: 42,
    imeiNo: "exampleImeiNo",
    imeiNo2: "exampleImeiNo2",
    lastConnectedAt: new Date(),
    locationAddress: "exampleLocationAddress",
    locationLatitude: 42.424242424,
    locationLongitude: 42.424242424,
    make: "exampleMake",
    model: "exampleModel",
    nextLockDate: new Date(),
    serialNo: "exampleSerialNo",
    status: "exampleStatus",
  },
];
const FIND_ONE_RESULT = {
  createdAt: new Date(),
  deviceId: "exampleDeviceId",
  id: 42,
  imeiNo: "exampleImeiNo",
  imeiNo2: "exampleImeiNo2",
  lastConnectedAt: new Date(),
  locationAddress: "exampleLocationAddress",
  locationLatitude: 42.424242424,
  locationLongitude: 42.424242424,
  make: "exampleMake",
  model: "exampleModel",
  nextLockDate: new Date(),
  serialNo: "exampleSerialNo",
  status: "exampleStatus",
};

const service = {
  createNuovoHistorical() {
    return CREATE_RESULT;
  },
  nuovoHistoricals: () => FIND_MANY_RESULT,
  nuovoHistorical: ({ where }: { where: { id: string } }) => {
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

describe("NuovoHistorical", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: NuovoHistoricalService,
          useValue: service,
        },
      ],
      controllers: [NuovoHistoricalController],
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

  test("POST /nuovoHistoricals", async () => {
    await request(app.getHttpServer())
      .post("/nuovoHistoricals")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        createdAt: CREATE_RESULT.createdAt.toISOString(),
        lastConnectedAt: CREATE_RESULT.lastConnectedAt.toISOString(),
        nextLockDate: CREATE_RESULT.nextLockDate.toISOString(),
      });
  });

  test("GET /nuovoHistoricals", async () => {
    await request(app.getHttpServer())
      .get("/nuovoHistoricals")
      .expect(HttpStatus.OK)
      .expect([
        {
          ...FIND_MANY_RESULT[0],
          createdAt: FIND_MANY_RESULT[0].createdAt.toISOString(),
          lastConnectedAt: FIND_MANY_RESULT[0].lastConnectedAt.toISOString(),
          nextLockDate: FIND_MANY_RESULT[0].nextLockDate.toISOString(),
        },
      ]);
  });

  test("GET /nuovoHistoricals/:id non existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/nuovoHistoricals"}/${nonExistingId}`)
      .expect(HttpStatus.NOT_FOUND)
      .expect({
        statusCode: HttpStatus.NOT_FOUND,
        message: `No resource was found for {"${"id"}":"${nonExistingId}"}`,
        error: "Not Found",
      });
  });

  test("GET /nuovoHistoricals/:id existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/nuovoHistoricals"}/${existingId}`)
      .expect(HttpStatus.OK)
      .expect({
        ...FIND_ONE_RESULT,
        createdAt: FIND_ONE_RESULT.createdAt.toISOString(),
        lastConnectedAt: FIND_ONE_RESULT.lastConnectedAt.toISOString(),
        nextLockDate: FIND_ONE_RESULT.nextLockDate.toISOString(),
      });
  });

  test("POST /nuovoHistoricals existing resource", async () => {
    const agent = request(app.getHttpServer());
    await agent
      .post("/nuovoHistoricals")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        createdAt: CREATE_RESULT.createdAt.toISOString(),
        lastConnectedAt: CREATE_RESULT.lastConnectedAt.toISOString(),
        nextLockDate: CREATE_RESULT.nextLockDate.toISOString(),
      })
      .then(function () {
        agent
          .post("/nuovoHistoricals")
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
