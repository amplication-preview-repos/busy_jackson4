import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { TrustonicHistoricalServiceBase } from "./base/trustonicHistorical.service.base";

@Injectable()
export class TrustonicHistoricalService extends TrustonicHistoricalServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
