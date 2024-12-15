/*
------------------------------------------------------------------------------ 
This code was generated by Amplication. 
 
Changes to this file will be lost if the code is regenerated. 

There are other ways to to customize your code, see this doc to learn more
https://docs.amplication.com/how-to/custom-code

------------------------------------------------------------------------------
  */
import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { CashSaleDetailWhereInput } from "./CashSaleDetailWhereInput";
import { ValidateNested, IsOptional } from "class-validator";
import { Type } from "class-transformer";

@InputType()
class CashSaleDetailListRelationFilter {
  @ApiProperty({
    required: false,
    type: () => CashSaleDetailWhereInput,
  })
  @ValidateNested()
  @Type(() => CashSaleDetailWhereInput)
  @IsOptional()
  @Field(() => CashSaleDetailWhereInput, {
    nullable: true,
  })
  every?: CashSaleDetailWhereInput;

  @ApiProperty({
    required: false,
    type: () => CashSaleDetailWhereInput,
  })
  @ValidateNested()
  @Type(() => CashSaleDetailWhereInput)
  @IsOptional()
  @Field(() => CashSaleDetailWhereInput, {
    nullable: true,
  })
  some?: CashSaleDetailWhereInput;

  @ApiProperty({
    required: false,
    type: () => CashSaleDetailWhereInput,
  })
  @ValidateNested()
  @Type(() => CashSaleDetailWhereInput)
  @IsOptional()
  @Field(() => CashSaleDetailWhereInput, {
    nullable: true,
  })
  none?: CashSaleDetailWhereInput;
}
export { CashSaleDetailListRelationFilter as CashSaleDetailListRelationFilter };
