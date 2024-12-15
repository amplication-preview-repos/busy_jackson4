import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { UserPermissionServiceBase } from "./base/userPermission.service.base";

@Injectable()
export class UserPermissionService extends UserPermissionServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
