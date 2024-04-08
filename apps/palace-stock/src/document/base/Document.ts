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
import { Collaborator } from "../../collaborator/base/Collaborator";
import {
  ValidateNested,
  IsOptional,
  IsString,
  IsInt,
  IsEnum,
  IsDate,
  IsBoolean,
} from "class-validator";
import { Type } from "class-transformer";
import { Customer } from "../../customer/base/Customer";
import { EnumDocumentEstatus } from "./EnumDocumentEstatus";
import { FinancedSale } from "../../financedSale/base/FinancedSale";
import { Payment } from "../../payment/base/Payment";

@ObjectType()
class Document {
  @ApiProperty({
    required: false,
    type: () => Collaborator,
  })
  @ValidateNested()
  @Type(() => Collaborator)
  @IsOptional()
  collaborators?: Collaborator | null;

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
  direccion!: string;

  @ApiProperty({
    required: false,
    type: Number,
  })
  @IsInt()
  @IsOptional()
  @Field(() => Number, {
    nullable: true,
  })
  documentTypeId!: number | null;

  @ApiProperty({
    required: true,
    enum: EnumDocumentEstatus,
  })
  @IsEnum(EnumDocumentEstatus)
  @Field(() => EnumDocumentEstatus, {
    nullable: true,
  })
  estatus?: "A" | "I";

  @ApiProperty({
    required: true,
  })
  @IsDate()
  @Type(() => Date)
  @Field(() => Date)
  fechaHoraCarga!: Date;

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
    type: Number,
  })
  @IsInt()
  @Field(() => Number)
  id!: number;

  @ApiProperty({
    required: false,
    type: Number,
  })
  @IsInt()
  @IsOptional()
  @Field(() => Number, {
    nullable: true,
  })
  idCertProtecAct!: number | null;

  @ApiProperty({
    required: false,
    type: Number,
  })
  @IsInt()
  @IsOptional()
  @Field(() => Number, {
    nullable: true,
  })
  idFicha!: number | null;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  nombreOriginal!: string | null;

  @ApiProperty({
    required: false,
    type: Number,
  })
  @IsInt()
  @IsOptional()
  @Field(() => Number, {
    nullable: true,
  })
  numTicket!: number | null;

  @ApiProperty({
    required: false,
    type: () => Payment,
  })
  @ValidateNested()
  @Type(() => Payment)
  @IsOptional()
  payments?: Payment | null;

  @ApiProperty({
    required: false,
    type: Boolean,
  })
  @IsBoolean()
  @IsOptional()
  @Field(() => Boolean, {
    nullable: true,
  })
  validado!: boolean | null;

  @ApiProperty({
    required: false,
  })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  @Field(() => Date, {
    nullable: true,
  })
  validatedAt!: Date | null;

  @ApiProperty({
    required: false,
    type: Number,
  })
  @IsInt()
  @IsOptional()
  @Field(() => Number, {
    nullable: true,
  })
  validationUserId!: number | null;
}

export { Document as Document };