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
  ValidateNested,
  IsDate,
  IsOptional,
  IsInt,
} from "class-validator";
import { Customer } from "../../customer/base/Customer";
import { Type } from "class-transformer";
import { FinancedSale } from "../../financedSale/base/FinancedSale";
import { Item } from "../../item/base/Item";
import { UserModel } from "../../userModel/base/UserModel";

@ObjectType()
class LoanedDevice {
  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String)
  codigoSerie!: string;

  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String)
  comentarios!: string;

  @ApiProperty({
    required: true,
    type: () => Customer,
  })
  @ValidateNested()
  @Type(() => Customer)
  customers?: Customer;

  @ApiProperty({
    required: false,
  })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  @Field(() => Date, {
    nullable: true,
  })
  fechaDevolucion!: Date | null;

  @ApiProperty({
    required: true,
  })
  @IsDate()
  @Type(() => Date)
  @Field(() => Date)
  fechaRegistro!: Date;

  @ApiProperty({
    required: true,
    type: () => FinancedSale,
  })
  @ValidateNested()
  @Type(() => FinancedSale)
  financedSales?: FinancedSale;

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
    type: String,
  })
  @IsString()
  @Field(() => String)
  loanStatus!: string;

  @ApiProperty({
    required: true,
    type: () => UserModel,
  })
  @ValidateNested()
  @Type(() => UserModel)
  usersLoanedDevicesCreatedUserIdTousers?: UserModel;

  @ApiProperty({
    required: false,
    type: () => UserModel,
  })
  @ValidateNested()
  @Type(() => UserModel)
  @IsOptional()
  usersLoanedDevicesReturnedUserIdTousers?: UserModel | null;
}

export { LoanedDevice as LoanedDevice };