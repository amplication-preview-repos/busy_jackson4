import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { BillDetailServiceBase } from "./base/billDetail.service.base";

@Injectable()
export class BillDetailService extends BillDetailServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
