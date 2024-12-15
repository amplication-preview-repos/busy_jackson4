import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { AngazaAccountServiceBase } from "./base/angazaAccount.service.base";

@Injectable()
export class AngazaAccountService extends AngazaAccountServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
