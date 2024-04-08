import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { TransitTransferServiceBase } from "./base/transitTransfer.service.base";

@Injectable()
export class TransitTransferService extends TransitTransferServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
