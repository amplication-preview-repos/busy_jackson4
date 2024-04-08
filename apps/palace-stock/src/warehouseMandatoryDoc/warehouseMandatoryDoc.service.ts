import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { WarehouseMandatoryDocServiceBase } from "./base/warehouseMandatoryDoc.service.base";

@Injectable()
export class WarehouseMandatoryDocService extends WarehouseMandatoryDocServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
