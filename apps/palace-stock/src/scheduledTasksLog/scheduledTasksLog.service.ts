import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { ScheduledTasksLogServiceBase } from "./base/scheduledTasksLog.service.base";

@Injectable()
export class ScheduledTasksLogService extends ScheduledTasksLogServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
