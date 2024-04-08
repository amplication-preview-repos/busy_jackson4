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
import {
  IsString,
  IsOptional,
  ValidateNested,
  IsInt,
  IsEnum,
  IsDate,
  IsNumber,
} from "class-validator";
import { BillCreateNestedManyWithoutCashSalesInput } from "./BillCreateNestedManyWithoutCashSalesInput";
import { Type } from "class-transformer";
import { CashCountDetailWhereUniqueInput } from "../../cashCountDetail/base/CashCountDetailWhereUniqueInput";
import { EnumCashSaleEstatusVenta } from "./EnumCashSaleEstatusVenta";
import { KardexCreateNestedManyWithoutCashSalesInput } from "./KardexCreateNestedManyWithoutCashSalesInput";
import { Decimal } from "decimal.js";
import { WarehouseWhereUniqueInput } from "../../warehouse/base/WarehouseWhereUniqueInput";

@InputType()
class CashSaleCreateInput {
  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  apellido1Cliente?: string | null;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  apellido2Cliente?: string | null;

  @ApiProperty({
    required: false,
    type: () => BillCreateNestedManyWithoutCashSalesInput,
  })
  @ValidateNested()
  @Type(() => BillCreateNestedManyWithoutCashSalesInput)
  @IsOptional()
  @Field(() => BillCreateNestedManyWithoutCashSalesInput, {
    nullable: true,
  })
  bills?: BillCreateNestedManyWithoutCashSalesInput;

  @ApiProperty({
    required: false,
    type: () => CashCountDetailWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => CashCountDetailWhereUniqueInput)
  @IsOptional()
  @Field(() => CashCountDetailWhereUniqueInput, {
    nullable: true,
  })
  cashCountDetails?: CashCountDetailWhereUniqueInput | null;

  @ApiProperty({
    required: true,
    type: Number,
  })
  @IsInt()
  @Field(() => Number)
  createdUserId!: number;

  @ApiProperty({
    required: true,
    enum: EnumCashSaleEstatusVenta,
  })
  @IsEnum(EnumCashSaleEstatusVenta)
  @Field(() => EnumCashSaleEstatusVenta)
  estatus_venta!: "A" | "C";

  @ApiProperty({
    required: true,
  })
  @IsDate()
  @Type(() => Date)
  @Field(() => Date)
  fechaRegistro!: Date;

  @ApiProperty({
    required: true,
  })
  @IsDate()
  @Type(() => Date)
  @Field(() => Date)
  fechaVenta!: Date;

  @ApiProperty({
    required: false,
    type: () => KardexCreateNestedManyWithoutCashSalesInput,
  })
  @ValidateNested()
  @Type(() => KardexCreateNestedManyWithoutCashSalesInput)
  @IsOptional()
  @Field(() => KardexCreateNestedManyWithoutCashSalesInput, {
    nullable: true,
  })
  kardex?: KardexCreateNestedManyWithoutCashSalesInput;

  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String)
  metodoPago!: string;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  nombreCompletoCliente?: string | null;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  nombresCliente?: string | null;

  @ApiProperty({
    required: true,
    type: Number,
  })
  @IsInt()
  @Field(() => Number)
  totalUnidades!: number;

  @ApiProperty({
    required: true,
    type: Number,
  })
  @IsNumber()
  @Field(() => Float)
  totalVenta!: Decimal;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  ubicacion?: string | null;

  @ApiProperty({
    required: false,
    type: Number,
  })
  @IsNumber()
  @IsOptional()
  @Field(() => Float, {
    nullable: true,
  })
  ubicacionLatitud?: Decimal | null;

  @ApiProperty({
    required: false,
    type: Number,
  })
  @IsNumber()
  @IsOptional()
  @Field(() => Float, {
    nullable: true,
  })
  ubicacionLongitud?: Decimal | null;

  @ApiProperty({
    required: true,
    type: () => WarehouseWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => WarehouseWhereUniqueInput)
  @Field(() => WarehouseWhereUniqueInput)
  warehouses!: WarehouseWhereUniqueInput;
}

export { CashSaleCreateInput as CashSaleCreateInput };
