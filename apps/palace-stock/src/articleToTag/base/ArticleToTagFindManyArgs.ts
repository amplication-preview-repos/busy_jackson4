/*
------------------------------------------------------------------------------ 
This code was generated by Amplication. 
 
Changes to this file will be lost if the code is regenerated. 

There are other ways to to customize your code, see this doc to learn more
https://docs.amplication.com/how-to/custom-code

------------------------------------------------------------------------------
  */
import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { ArticleToTagWhereInput } from "./ArticleToTagWhereInput";
import { IsOptional, ValidateNested, IsInt } from "class-validator";
import { Type } from "class-transformer";
import { ArticleToTagOrderByInput } from "./ArticleToTagOrderByInput";

@ArgsType()
class ArticleToTagFindManyArgs {
  @ApiProperty({
    required: false,
    type: () => ArticleToTagWhereInput,
  })
  @IsOptional()
  @ValidateNested()
  @Field(() => ArticleToTagWhereInput, { nullable: true })
  @Type(() => ArticleToTagWhereInput)
  where?: ArticleToTagWhereInput;

  @ApiProperty({
    required: false,
    type: [ArticleToTagOrderByInput],
  })
  @IsOptional()
  @ValidateNested({ each: true })
  @Field(() => [ArticleToTagOrderByInput], { nullable: true })
  @Type(() => ArticleToTagOrderByInput)
  orderBy?: Array<ArticleToTagOrderByInput>;

  @ApiProperty({
    required: false,
    type: Number,
  })
  @IsOptional()
  @IsInt()
  @Field(() => Number, { nullable: true })
  @Type(() => Number)
  skip?: number;

  @ApiProperty({
    required: false,
    type: Number,
  })
  @IsOptional()
  @IsInt()
  @Field(() => Number, { nullable: true })
  @Type(() => Number)
  take?: number;
}

export { ArticleToTagFindManyArgs as ArticleToTagFindManyArgs };
