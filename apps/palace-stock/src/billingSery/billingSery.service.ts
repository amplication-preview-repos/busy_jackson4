import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { BillingSeryServiceBase } from "./base/billingSery.service.base";

@Injectable()
export class BillingSeryService extends BillingSeryServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
