import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { UserModelServiceBase } from "./base/userModel.service.base";

@Injectable()
export class UserModelService extends UserModelServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
