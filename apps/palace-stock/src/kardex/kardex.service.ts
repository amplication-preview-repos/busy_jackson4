import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { KardexServiceBase } from "./base/kardex.service.base";

@Injectable()
export class KardexService extends KardexServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
