/*
------------------------------------------------------------------------------ 
This code was generated by Amplication. 
 
Changes to this file will be lost if the code is regenerated. 

There are other ways to to customize your code, see this doc to learn more
https://docs.amplication.com/how-to/custom-code

------------------------------------------------------------------------------
  */
import { InputType, Field, Float } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, ValidateNested, IsEnum } from "class-validator";
import { Decimal } from "decimal.js";
import { CashSaleWhereUniqueInput } from "../../cashSale/base/CashSaleWhereUniqueInput";
import { Type } from "class-transformer";
import { FinancedSaleWhereUniqueInput } from "../../financedSale/base/FinancedSaleWhereUniqueInput";
import { ItemWhereUniqueInput } from "../../item/base/ItemWhereUniqueInput";
import { PaymentWhereUniqueInput } from "../../payment/base/PaymentWhereUniqueInput";
import { PersonalLoanWhereUniqueInput } from "../../personalLoan/base/PersonalLoanWhereUniqueInput";
import { EnumKardexTipoInventario } from "./EnumKardexTipoInventario";
import { TransactionWhereUniqueInput } from "../../transaction/base/TransactionWhereUniqueInput";
import { WarehouseWhereUniqueInput } from "../../warehouse/base/WarehouseWhereUniqueInput";

@InputType()
class KardexUpdateInput {
  @ApiProperty({
    required: false,
    type: Number,
  })
  @IsNumber()
  @IsOptional()
  @Field(() => Float, {
    nullable: true,
  })
  cantUnidades?: Decimal;

  @ApiProperty({
    required: false,
    type: () => CashSaleWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => CashSaleWhereUniqueInput)
  @IsOptional()
  @Field(() => CashSaleWhereUniqueInput, {
    nullable: true,
  })
  cashSales?: CashSaleWhereUniqueInput | null;

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
    type: () => ItemWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => ItemWhereUniqueInput)
  @IsOptional()
  @Field(() => ItemWhereUniqueInput, {
    nullable: true,
  })
  items?: ItemWhereUniqueInput;

  @ApiProperty({
    required: false,
    type: Number,
  })
  @IsNumber()
  @IsOptional()
  @Field(() => Float, {
    nullable: true,
  })
  ivaUnidad?: Decimal | null;

  @ApiProperty({
    required: false,
    type: () => PaymentWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => PaymentWhereUniqueInput)
  @IsOptional()
  @Field(() => PaymentWhereUniqueInput, {
    nullable: true,
  })
  payments?: PaymentWhereUniqueInput | null;

  @ApiProperty({
    required: false,
    type: () => PersonalLoanWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => PersonalLoanWhereUniqueInput)
  @IsOptional()
  @Field(() => PersonalLoanWhereUniqueInput, {
    nullable: true,
  })
  personalLoans?: PersonalLoanWhereUniqueInput | null;

  @ApiProperty({
    required: false,
    type: Number,
  })
  @IsNumber()
  @IsOptional()
  @Field(() => Float, {
    nullable: true,
  })
  precioUnidad?: Decimal | null;

  @ApiProperty({
    required: false,
    enum: EnumKardexTipoInventario,
  })
  @IsEnum(EnumKardexTipoInventario)
  @IsOptional()
  @Field(() => EnumKardexTipoInventario, {
    nullable: true,
  })
  tipo_inventario?: "T" | "S";

  @ApiProperty({
    required: false,
    type: () => TransactionWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => TransactionWhereUniqueInput)
  @IsOptional()
  @Field(() => TransactionWhereUniqueInput, {
    nullable: true,
  })
  transactions?: TransactionWhereUniqueInput;

  @ApiProperty({
    required: false,
    type: () => WarehouseWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => WarehouseWhereUniqueInput)
  @IsOptional()
  @Field(() => WarehouseWhereUniqueInput, {
    nullable: true,
  })
  warehouses?: WarehouseWhereUniqueInput;
}

export { KardexUpdateInput as KardexUpdateInput };
