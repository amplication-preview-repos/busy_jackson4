import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { NuovoHistoricalServiceBase } from "./base/nuovoHistorical.service.base";

@Injectable()
export class NuovoHistoricalService extends NuovoHistoricalServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
