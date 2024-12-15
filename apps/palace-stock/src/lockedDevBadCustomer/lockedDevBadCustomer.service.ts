import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { LockedDevBadCustomerServiceBase } from "./base/lockedDevBadCustomer.service.base";

@Injectable()
export class LockedDevBadCustomerService extends LockedDevBadCustomerServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
