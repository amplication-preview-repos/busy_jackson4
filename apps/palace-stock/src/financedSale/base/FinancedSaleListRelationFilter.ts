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
import { FinancedSaleWhereInput } from "./FinancedSaleWhereInput";
import { ValidateNested, IsOptional } from "class-validator";
import { Type } from "class-transformer";

@InputType()
class FinancedSaleListRelationFilter {
  @ApiProperty({
    required: false,
    type: () => FinancedSaleWhereInput,
  })
  @ValidateNested()
  @Type(() => FinancedSaleWhereInput)
  @IsOptional()
  @Field(() => FinancedSaleWhereInput, {
    nullable: true,
  })
  every?: FinancedSaleWhereInput;

  @ApiProperty({
    required: false,
    type: () => FinancedSaleWhereInput,
  })
  @ValidateNested()
  @Type(() => FinancedSaleWhereInput)
  @IsOptional()
  @Field(() => FinancedSaleWhereInput, {
    nullable: true,
  })
  some?: FinancedSaleWhereInput;

  @ApiProperty({
    required: false,
    type: () => FinancedSaleWhereInput,
  })
  @ValidateNested()
  @Type(() => FinancedSaleWhereInput)
  @IsOptional()
  @Field(() => FinancedSaleWhereInput, {
    nullable: true,
  })
  none?: FinancedSaleWhereInput;
}
export { FinancedSaleListRelationFilter as FinancedSaleListRelationFilter };
