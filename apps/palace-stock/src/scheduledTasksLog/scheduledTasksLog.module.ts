import { Module, forwardRef } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { ScheduledTasksLogModuleBase } from "./base/scheduledTasksLog.module.base";
import { ScheduledTasksLogService } from "./scheduledTasksLog.service";
import { ScheduledTasksLogController } from "./scheduledTasksLog.controller";

@Module({
  imports: [ScheduledTasksLogModuleBase, forwardRef(() => AuthModule)],
  controllers: [ScheduledTasksLogController],
  providers: [ScheduledTasksLogService],
  exports: [ScheduledTasksLogService],
})
export class ScheduledTasksLogModule {}
