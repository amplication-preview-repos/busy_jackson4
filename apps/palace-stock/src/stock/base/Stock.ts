/*
------------------------------------------------------------------------------ 
This code was generated by Amplication. 
 
Changes to this file will be lost if the code is regenerated. 

There are other ways to to customize your code, see this doc to learn more
https://docs.amplication.com/how-to/custom-code

------------------------------------------------------------------------------
  */
import { ObjectType, Field, Float } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import {
  IsNumber,
  IsOptional,
  IsInt,
  ValidateNested,
  IsEnum,
} from "class-validator";
import { Decimal } from "decimal.js";
import { Item } from "../../item/base/Item";
import { Type } from "class-transformer";
import { EnumStockTipoInventario } from "./EnumStockTipoInventario";
import { Warehouse } from "../../warehouse/base/Warehouse";

@ObjectType()
class Stock {
  @ApiProperty({
    required: true,
    type: Number,
  })
  @IsNumber()
  @Field(() => Float)
  existencias!: Decimal;

  @ApiProperty({
    required: false,
    type: Number,
  })
  @IsNumber()
  @IsOptional()
  @Field(() => Float, {
    nullable: true,
  })
  existMax!: Decimal | null;

  @ApiProperty({
    required: false,
    type: Number,
  })
  @IsNumber()
  @IsOptional()
  @Field(() => Float, {
    nullable: true,
  })
  existMin!: Decimal | null;

  @ApiProperty({
    required: true,
    type: Number,
  })
  @IsInt()
  @Field(() => Number)
  id!: number;

  @ApiProperty({
    required: true,
    type: () => Item,
  })
  @ValidateNested()
  @Type(() => Item)
  items?: Item;

  @ApiProperty({
    required: true,
    enum: EnumStockTipoInventario,
  })
  @IsEnum(EnumStockTipoInventario)
  @Field(() => EnumStockTipoInventario, {
    nullable: true,
  })
  tipo_inventario?: "T" | "S";

  @ApiProperty({
    required: true,
    type: () => Warehouse,
  })
  @ValidateNested()
  @Type(() => Warehouse)
  warehouses?: Warehouse;
}

export { Stock as Stock };