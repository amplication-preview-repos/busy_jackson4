import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { ItemPriceServiceBase } from "./base/itemPrice.service.base";

@Injectable()
export class ItemPriceService extends ItemPriceServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
