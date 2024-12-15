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
import { StockSeryWhereInput } from "./StockSeryWhereInput";
import { ValidateNested, IsOptional } from "class-validator";
import { Type } from "class-transformer";

@InputType()
class StockSeryListRelationFilter {
  @ApiProperty({
    required: false,
    type: () => StockSeryWhereInput,
  })
  @ValidateNested()
  @Type(() => StockSeryWhereInput)
  @IsOptional()
  @Field(() => StockSeryWhereInput, {
    nullable: true,
  })
  every?: StockSeryWhereInput;

  @ApiProperty({
    required: false,
    type: () => StockSeryWhereInput,
  })
  @ValidateNested()
  @Type(() => StockSeryWhereInput)
  @IsOptional()
  @Field(() => StockSeryWhereInput, {
    nullable: true,
  })
  some?: StockSeryWhereInput;

  @ApiProperty({
    required: false,
    type: () => StockSeryWhereInput,
  })
  @ValidateNested()
  @Type(() => StockSeryWhereInput)
  @IsOptional()
  @Field(() => StockSeryWhereInput, {
    nullable: true,
  })
  none?: StockSeryWhereInput;
}
export { StockSeryListRelationFilter as StockSeryListRelationFilter };
