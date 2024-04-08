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
import { BankReceipt } from "../../bankReceipt/base/BankReceipt";
import {
  ValidateNested,
  IsOptional,
  IsString,
  IsInt,
  IsEnum,
  IsDate,
} from "class-validator";
import { Type } from "class-transformer";
import { CashCountDetail } from "../../cashCountDetail/base/CashCountDetail";
import { EnumCashCountEstatusValidacion } from "./EnumCashCountEstatusValidacion";
import { Warehouse } from "../../warehouse/base/Warehouse";

@ObjectType()
class CashCount {
  @ApiProperty({
    required: false,
    type: () => [BankReceipt],
  })
  @ValidateNested()
  @Type(() => BankReceipt)
  @IsOptional()
  bankReceipts?: Array<BankReceipt>;

  @ApiProperty({
    required: false,
    type: () => [CashCountDetail],
  })
  @ValidateNested()
  @Type(() => CashCountDetail)
  @IsOptional()
  cashCountDetails?: Array<CashCountDetail>;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  comentarios!: string | null;

  @ApiProperty({
    required: true,
    type: Number,
  })
  @IsInt()
  @Field(() => Number)
  createdUserId!: number;

  @ApiProperty({
    required: false,
    enum: EnumCashCountEstatusValidacion,
  })
  @IsEnum(EnumCashCountEstatusValidacion)
  @IsOptional()
  @Field(() => EnumCashCountEstatusValidacion, {
    nullable: true,
  })
  estatus_validacion?: "SV" | "NE" | "I" | "C" | null;

  @ApiProperty({
    required: true,
  })
  @IsDate()
  @Type(() => Date)
  @Field(() => Date)
  fechaRegistro!: Date;

  @ApiProperty({
    required: false,
  })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  @Field(() => Date, {
    nullable: true,
  })
  fechaValidacion!: Date | null;

  @ApiProperty({
    required: true,
  })
  @IsDate()
  @Type(() => Date)
  @Field(() => Date)
  fromDate!: Date;

  @ApiProperty({
    required: true,
    type: Number,
  })
  @IsInt()
  @Field(() => Number)
  id!: number;

  @ApiProperty({
    required: true,
  })
  @IsDate()
  @Type(() => Date)
  @Field(() => Date)
  toDate!: Date;

  @ApiProperty({
    required: false,
    type: Number,
  })
  @IsInt()
  @IsOptional()
  @Field(() => Number, {
    nullable: true,
  })
  validUserId!: number | null;

  @ApiProperty({
    required: true,
    type: () => Warehouse,
  })
  @ValidateNested()
  @Type(() => Warehouse)
  warehouses?: Warehouse;
}

export { CashCount as CashCount };