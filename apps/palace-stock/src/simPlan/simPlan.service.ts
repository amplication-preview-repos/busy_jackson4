import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { SimPlanServiceBase } from "./base/simPlan.service.base";

@Injectable()
export class SimPlanService extends SimPlanServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
