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
import { MandatoryDocumentWhereInput } from "./MandatoryDocumentWhereInput";
import { IsOptional, ValidateNested, IsInt } from "class-validator";
import { Type } from "class-transformer";
import { MandatoryDocumentOrderByInput } from "./MandatoryDocumentOrderByInput";

@ArgsType()
class MandatoryDocumentFindManyArgs {
  @ApiProperty({
    required: false,
    type: () => MandatoryDocumentWhereInput,
  })
  @IsOptional()
  @ValidateNested()
  @Field(() => MandatoryDocumentWhereInput, { nullable: true })
  @Type(() => MandatoryDocumentWhereInput)
  where?: MandatoryDocumentWhereInput;

  @ApiProperty({
    required: false,
    type: [MandatoryDocumentOrderByInput],
  })
  @IsOptional()
  @ValidateNested({ each: true })
  @Field(() => [MandatoryDocumentOrderByInput], { nullable: true })
  @Type(() => MandatoryDocumentOrderByInput)
  orderBy?: Array<MandatoryDocumentOrderByInput>;

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

export { MandatoryDocumentFindManyArgs as MandatoryDocumentFindManyArgs };