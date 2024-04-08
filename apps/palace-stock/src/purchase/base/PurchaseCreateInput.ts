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
  IsInt,
  IsNumber,
  IsOptional,
  IsDate,
  IsEnum,
  ValidateNested,
} from "class-validator";
import { Decimal } from "decimal.js";
import { Type } from "class-transformer";
import { EnumPurchasePaymentType } from "./EnumPurchasePaymentType";
import { EnumPurchasePriority } from "./EnumPurchasePriority";
import { EnumPurchaseStatusPurchase } from "./EnumPurchaseStatusPurchase";
import { UserModelWhereUniqueInput } from "../../userModel/base/UserModelWhereUniqueInput";
import { VendorWhereUniqueInput } from "../../vendor/base/VendorWhereUniqueInput";

@InputType()
class PurchaseCreateInput {
  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String)
  accountingDepartmentDescription!: string;

  @ApiProperty({
    required: true,
    type: Number,
  })
  @IsInt()
  @Field(() => Number)
  accountingDepartmentId!: number;

  @ApiProperty({
    required: true,
    type: Number,
  })
  @IsNumber()
  @Field(() => Float)
  amount!: Decimal;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  comments?: string | null;

  @ApiProperty({
    required: false,
  })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  @Field(() => Date, {
    nullable: true,
  })
  createdAt?: Date | null;

  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String)
  items!: string;

  @ApiProperty({
    required: true,
    enum: EnumPurchasePaymentType,
  })
  @IsEnum(EnumPurchasePaymentType)
  @Field(() => EnumPurchasePaymentType)
  payment_type!: "E" | "D" | "T" | "C";

  @ApiProperty({
    required: false,
    enum: EnumPurchasePriority,
  })
  @IsEnum(EnumPurchasePriority)
  @IsOptional()
  @Field(() => EnumPurchasePriority, {
    nullable: true,
  })
  priority?: "N" | "U" | null;

  @ApiProperty({
    required: true,
    type: Number,
  })
  @IsInt()
  @Field(() => Number)
  requestCollaboratorId!: number;

  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String)
  requestDepartmentDesc!: string;

  @ApiProperty({
    required: true,
    type: Number,
  })
  @IsInt()
  @Field(() => Number)
  requestDepartmentId!: number;

  @ApiProperty({
    required: true,
    enum: EnumPurchaseStatusPurchase,
  })
  @IsEnum(EnumPurchaseStatusPurchase)
  @Field(() => EnumPurchaseStatusPurchase)
  status_purchase!: "P" | "PA" | "CA" | "CD" | "PC" | "TP" | "C";

  @ApiProperty({
    required: true,
    type: Number,
  })
  @IsInt()
  @Field(() => Number)
  superiorCollaboratorId!: number;

  @ApiProperty({
    required: false,
  })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  @Field(() => Date, {
    nullable: true,
  })
  updatedAt?: Date | null;

  @ApiProperty({
    required: false,
    type: () => UserModelWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => UserModelWhereUniqueInput)
  @IsOptional()
  @Field(() => UserModelWhereUniqueInput, {
    nullable: true,
  })
  usersPurchasesCreatedUserIdTousers?: UserModelWhereUniqueInput | null;

  @ApiProperty({
    required: false,
    type: () => UserModelWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => UserModelWhereUniqueInput)
  @IsOptional()
  @Field(() => UserModelWhereUniqueInput, {
    nullable: true,
  })
  usersPurchasesUpdatedUserIdTousers?: UserModelWhereUniqueInput | null;

  @ApiProperty({
    required: false,
    type: () => VendorWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => VendorWhereUniqueInput)
  @IsOptional()
  @Field(() => VendorWhereUniqueInput, {
    nullable: true,
  })
  vendors?: VendorWhereUniqueInput | null;
}

export { PurchaseCreateInput as PurchaseCreateInput };
