import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { BillingSatKeyServiceBase } from "./base/billingSatKey.service.base";

@Injectable()
export class BillingSatKeyService extends BillingSatKeyServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
