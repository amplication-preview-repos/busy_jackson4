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
import { WarehouseMandatoryDocWhereInput } from "./WarehouseMandatoryDocWhereInput";
import { IsOptional, ValidateNested, IsInt } from "class-validator";
import { Type } from "class-transformer";
import { WarehouseMandatoryDocOrderByInput } from "./WarehouseMandatoryDocOrderByInput";

@ArgsType()
class WarehouseMandatoryDocFindManyArgs {
  @ApiProperty({
    required: false,
    type: () => WarehouseMandatoryDocWhereInput,
  })
  @IsOptional()
  @ValidateNested()
  @Field(() => WarehouseMandatoryDocWhereInput, { nullable: true })
  @Type(() => WarehouseMandatoryDocWhereInput)
  where?: WarehouseMandatoryDocWhereInput;

  @ApiProperty({
    required: false,
    type: [WarehouseMandatoryDocOrderByInput],
  })
  @IsOptional()
  @ValidateNested({ each: true })
  @Field(() => [WarehouseMandatoryDocOrderByInput], { nullable: true })
  @Type(() => WarehouseMandatoryDocOrderByInput)
  orderBy?: Array<WarehouseMandatoryDocOrderByInput>;

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

export { WarehouseMandatoryDocFindManyArgs as WarehouseMandatoryDocFindManyArgs };