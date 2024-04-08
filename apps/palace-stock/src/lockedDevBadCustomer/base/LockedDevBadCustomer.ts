/*
------------------------------------------------------------------------------ 
This code was generated by Amplication. 
 
Changes to this file will be lost if the code is regenerated. 

There are other ways to to customize your code, see this doc to learn more
https://docs.amplication.com/how-to/custom-code

------------------------------------------------------------------------------
  */
import { ObjectType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import {
  IsString,
  IsOptional,
  ValidateNested,
  IsDate,
  IsEnum,
  IsInt,
} from "class-validator";
import { Customer } from "../../customer/base/Customer";
import { Type } from "class-transformer";
import { FinancedSale } from "../../financedSale/base/FinancedSale";
import { EnumLockedDevBadCustomerForcedStatus } from "./EnumLockedDevBadCustomerForcedStatus";

@ObjectType()
class LockedDevBadCustomer {
  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  codigoBloqueoMoroso!: string | null;

  @ApiProperty({
    required: false,
    type: () => Customer,
  })
  @ValidateNested()
  @Type(() => Customer)
  @IsOptional()
  customers?: Customer | null;

  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String)
  deviceId!: string;

  @ApiProperty({
    required: true,
  })
  @IsDate()
  @Type(() => Date)
  @Field(() => Date)
  fechaBloqueado!: Date;

  @ApiProperty({
    required: false,
  })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  @Field(() => Date, {
    nullable: true,
  })
  fechaDesbloqueado!: Date | null;

  @ApiProperty({
    required: false,
    type: () => FinancedSale,
  })
  @ValidateNested()
  @Type(() => FinancedSale)
  @IsOptional()
  financedSales?: FinancedSale | null;

  @ApiProperty({
    required: true,
    enum: EnumLockedDevBadCustomerForcedStatus,
  })
  @IsEnum(EnumLockedDevBadCustomerForcedStatus)
  @Field(() => EnumLockedDevBadCustomerForcedStatus, {
    nullable: true,
  })
  forced_status?: "L" | "U";

  @ApiProperty({
    required: true,
    type: Number,
  })
  @IsInt()
  @Field(() => Number)
  id!: number;
}

export { LockedDevBadCustomer as LockedDevBadCustomer };