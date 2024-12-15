/*
------------------------------------------------------------------------------ 
This code was generated by Amplication. 
 
Changes to this file will be lost if the code is regenerated. 

There are other ways to to customize your code, see this doc to learn more
https://docs.amplication.com/how-to/custom-code

------------------------------------------------------------------------------
  */
import { PrismaService } from "../../prisma/prisma.service";
import {
  Prisma,
  ScheduledTasksLog as PrismaScheduledTasksLog,
} from "@prisma/client";

export class ScheduledTasksLogServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async count(
    args: Omit<Prisma.ScheduledTasksLogCountArgs, "select">
  ): Promise<number> {
    return this.prisma.scheduledTasksLog.count(args);
  }

  async scheduledTasksLogs<T extends Prisma.ScheduledTasksLogFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.ScheduledTasksLogFindManyArgs>
  ): Promise<PrismaScheduledTasksLog[]> {
    return this.prisma.scheduledTasksLog.findMany<Prisma.ScheduledTasksLogFindManyArgs>(
      args
    );
  }
  async scheduledTasksLog<T extends Prisma.ScheduledTasksLogFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.ScheduledTasksLogFindUniqueArgs>
  ): Promise<PrismaScheduledTasksLog | null> {
    return this.prisma.scheduledTasksLog.findUnique(args);
  }
  async createScheduledTasksLog<T extends Prisma.ScheduledTasksLogCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.ScheduledTasksLogCreateArgs>
  ): Promise<PrismaScheduledTasksLog> {
    return this.prisma.scheduledTasksLog.create<T>(args);
  }
  async updateScheduledTasksLog<T extends Prisma.ScheduledTasksLogUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.ScheduledTasksLogUpdateArgs>
  ): Promise<PrismaScheduledTasksLog> {
    return this.prisma.scheduledTasksLog.update<T>(args);
  }
  async deleteScheduledTasksLog<T extends Prisma.ScheduledTasksLogDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.ScheduledTasksLogDeleteArgs>
  ): Promise<PrismaScheduledTasksLog> {
    return this.prisma.scheduledTasksLog.delete(args);
  }
}
