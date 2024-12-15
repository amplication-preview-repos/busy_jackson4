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
  BillDetail as PrismaBillDetail,
  Item as PrismaItem,
} from "@prisma/client";

export class BillDetailServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async count(
    args: Omit<Prisma.BillDetailCountArgs, "select">
  ): Promise<number> {
    return this.prisma.billDetail.count(args);
  }

  async billDetails<T extends Prisma.BillDetailFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.BillDetailFindManyArgs>
  ): Promise<PrismaBillDetail[]> {
    return this.prisma.billDetail.findMany<Prisma.BillDetailFindManyArgs>(args);
  }
  async billDetail<T extends Prisma.BillDetailFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.BillDetailFindUniqueArgs>
  ): Promise<PrismaBillDetail | null> {
    return this.prisma.billDetail.findUnique(args);
  }
  async createBillDetail<T extends Prisma.BillDetailCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.BillDetailCreateArgs>
  ): Promise<PrismaBillDetail> {
    return this.prisma.billDetail.create<T>(args);
  }
  async updateBillDetail<T extends Prisma.BillDetailUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.BillDetailUpdateArgs>
  ): Promise<PrismaBillDetail> {
    return this.prisma.billDetail.update<T>(args);
  }
  async deleteBillDetail<T extends Prisma.BillDetailDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.BillDetailDeleteArgs>
  ): Promise<PrismaBillDetail> {
    return this.prisma.billDetail.delete(args);
  }

  async getItems(parentId: number): Promise<PrismaItem | null> {
    return this.prisma.billDetail
      .findUnique({
        where: { id: parentId },
      })
      .items();
  }
}
