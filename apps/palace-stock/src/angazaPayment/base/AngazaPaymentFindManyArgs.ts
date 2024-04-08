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
import { AngazaPaymentWhereInput } from "./AngazaPaymentWhereInput";
import { IsOptional, ValidateNested, IsInt } from "class-validator";
import { Type } from "class-transformer";
import { AngazaPaymentOrderByInput } from "./AngazaPaymentOrderByInput";

@ArgsType()
class AngazaPaymentFindManyArgs {
  @ApiProperty({
    required: false,
    type: () => AngazaPaymentWhereInput,
  })
  @IsOptional()
  @ValidateNested()
  @Field(() => AngazaPaymentWhereInput, { nullable: true })
  @Type(() => AngazaPaymentWhereInput)
  where?: AngazaPaymentWhereInput;

  @ApiProperty({
    required: false,
    type: [AngazaPaymentOrderByInput],
  })
  @IsOptional()
  @ValidateNested({ each: true })
  @Field(() => [AngazaPaymentOrderByInput], { nullable: true })
  @Type(() => AngazaPaymentOrderByInput)
  orderBy?: Array<AngazaPaymentOrderByInput>;

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

export { AngazaPaymentFindManyArgs as AngazaPaymentFindManyArgs };
