import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { MeasuringUnitServiceBase } from "./base/measuringUnit.service.base";

@Injectable()
export class MeasuringUnitService extends MeasuringUnitServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
