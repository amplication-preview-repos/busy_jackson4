import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { WarehouseGrantServiceBase } from "./base/warehouseGrant.service.base";

@Injectable()
export class WarehouseGrantService extends WarehouseGrantServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
