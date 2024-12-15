import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { ArticleToTagServiceBase } from "./base/articleToTag.service.base";

@Injectable()
export class ArticleToTagService extends ArticleToTagServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
