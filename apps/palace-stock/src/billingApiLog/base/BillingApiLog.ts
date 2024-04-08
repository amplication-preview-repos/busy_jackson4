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
import { IsInt, IsOptional, IsDate, IsString } from "class-validator";
import { Type } from "class-transformer";

@ObjectType()
class BillingApiLog {
  @ApiProperty({
    required: false,
    type: Number,
  })
  @IsInt()
  @IsOptional()
  @Field(() => Number, {
    nullable: true,
  })
  billingId!: number | null;

  @ApiProperty({
    required: true,
  })
  @IsDate()
  @Type(() => Date)
  @Field(() => Date)
  callDate!: Date;

  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String)
  calledMethod!: string;

  @ApiProperty({
    required: true,
  })
  @IsDate()
  @Type(() => Date)
  @Field(() => Date)
  callTime!: Date;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  calltrace!: string | null;

  @ApiProperty({
    required: false,
    type: Number,
  })
  @IsInt()
  @IsOptional()
  @Field(() => Number, {
    nullable: true,
  })
  complementId!: number | null;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  dataSend!: string | null;

  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String)
  headers!: string;

  @ApiProperty({
    required: true,
    type: Number,
  })
  @IsInt()
  @Field(() => Number)
  id!: number;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  referenceId!: string | null;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  response!: string | null;

  @ApiProperty({
    required: false,
  })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  @Field(() => Date, {
    nullable: true,
  })
  responseDatetime!: Date | null;

  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String)
  url!: string;
}

export { BillingApiLog as BillingApiLog };