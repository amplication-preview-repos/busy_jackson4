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
import {
  IsString,
  IsOptional,
  ValidateNested,
  IsDate,
  IsEnum,
} from "class-validator";
import { CustomerWhereUniqueInput } from "../../customer/base/CustomerWhereUniqueInput";
import { Type } from "class-transformer";
import { FinancedSaleWhereUniqueInput } from "../../financedSale/base/FinancedSaleWhereUniqueInput";
import { EnumLockedDevBadCustomerForcedStatus } from "./EnumLockedDevBadCustomerForcedStatus";

@InputType()
class LockedDevBadCustomerUpdateInput {
  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  codigoBloqueoMoroso?: string | null;

  @ApiProperty({
    required: false,
    type: () => CustomerWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => CustomerWhereUniqueInput)
  @IsOptional()
  @Field(() => CustomerWhereUniqueInput, {
    nullable: true,
  })
  customers?: CustomerWhereUniqueInput | null;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  deviceId?: string;

  @ApiProperty({
    required: false,
  })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  @Field(() => Date, {
    nullable: true,
  })
  fechaBloqueado?: Date;

  @ApiProperty({
    required: false,
  })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  @Field(() => Date, {
    nullable: true,
  })
  fechaDesbloqueado?: Date | null;

  @ApiProperty({
    required: false,
    type: () => FinancedSaleWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => FinancedSaleWhereUniqueInput)
  @IsOptional()
  @Field(() => FinancedSaleWhereUniqueInput, {
    nullable: true,
  })
  financedSales?: FinancedSaleWhereUniqueInput | null;

  @ApiProperty({
    required: false,
    enum: EnumLockedDevBadCustomerForcedStatus,
  })
  @IsEnum(EnumLockedDevBadCustomerForcedStatus)
  @IsOptional()
  @Field(() => EnumLockedDevBadCustomerForcedStatus, {
    nullable: true,
  })
  forced_status?: "L" | "U";
}

export { LockedDevBadCustomerUpdateInput as LockedDevBadCustomerUpdateInput };