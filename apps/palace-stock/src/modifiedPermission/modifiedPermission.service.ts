import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { ModifiedPermissionServiceBase } from "./base/modifiedPermission.service.base";

@Injectable()
export class ModifiedPermissionService extends ModifiedPermissionServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
