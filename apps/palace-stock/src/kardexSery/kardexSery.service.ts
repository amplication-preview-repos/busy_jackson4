import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { KardexSeryServiceBase } from "./base/kardexSery.service.base";

@Injectable()
export class KardexSeryService extends KardexSeryServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
