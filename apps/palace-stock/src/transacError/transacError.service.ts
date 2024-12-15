import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { TransacErrorServiceBase } from "./base/transacError.service.base";

@Injectable()
export class TransacErrorService extends TransacErrorServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
