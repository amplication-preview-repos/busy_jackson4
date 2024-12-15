import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { SepomexCodeServiceBase } from "./base/sepomexCode.service.base";

@Injectable()
export class SepomexCodeService extends SepomexCodeServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
