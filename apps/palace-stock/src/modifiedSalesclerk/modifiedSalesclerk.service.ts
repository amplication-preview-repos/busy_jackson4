import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { ModifiedSalesclerkServiceBase } from "./base/modifiedSalesclerk.service.base";

@Injectable()
export class ModifiedSalesclerkService extends ModifiedSalesclerkServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
