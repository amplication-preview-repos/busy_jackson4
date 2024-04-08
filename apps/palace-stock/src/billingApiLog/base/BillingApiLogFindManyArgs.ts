/*
------------------------------------------------------------------------------ 
This code was generated by Amplication. 
 
Changes to this file will be lost if the code is regenerated. 

There are other ways to to customize your code, see this doc to learn more
https://docs.amplication.com/how-to/custom-code

------------------------------------------------------------------------------
  */
import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { BillingApiLogWhereInput } from "./BillingApiLogWhereInput";
import { IsOptional, ValidateNested, IsInt } from "class-validator";
import { Type } from "class-transformer";
import { BillingApiLogOrderByInput } from "./BillingApiLogOrderByInput";

@ArgsType()
class BillingApiLogFindManyArgs {
  @ApiProperty({
    required: false,
    type: () => BillingApiLogWhereInput,
  })
  @IsOptional()
  @ValidateNested()
  @Field(() => BillingApiLogWhereInput, { nullable: true })
  @Type(() => BillingApiLogWhereInput)
  where?: BillingApiLogWhereInput;

  @ApiProperty({
    required: false,
    type: [BillingApiLogOrderByInput],
  })
  @IsOptional()
  @ValidateNested({ each: true })
  @Field(() => [BillingApiLogOrderByInput], { nullable: true })
  @Type(() => BillingApiLogOrderByInput)
  orderBy?: Array<BillingApiLogOrderByInput>;

  @ApiProperty({
    required: false,
    type: Number,
  })
  @IsOptional()
  @IsInt()
  @Field(() => Number, { nullable: true })
  @Type(() => Number)
  skip?: number;

  @ApiProperty({
    required: false,
    type: Number,
  })
  @IsOptional()
  @IsInt()
  @Field(() => Number, { nullable: true })
  @Type(() => Number)
  take?: number;
}

export { BillingApiLogFindManyArgs as BillingApiLogFindManyArgs };
