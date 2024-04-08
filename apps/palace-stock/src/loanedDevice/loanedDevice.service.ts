import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { LoanedDeviceServiceBase } from "./base/loanedDevice.service.base";

@Injectable()
export class LoanedDeviceService extends LoanedDeviceServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
