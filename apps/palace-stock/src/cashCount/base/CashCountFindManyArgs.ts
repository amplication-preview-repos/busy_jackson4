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
import { CashCountWhereInput } from "./CashCountWhereInput";
import { IsOptional, ValidateNested, IsInt } from "class-validator";
import { Type } from "class-transformer";
import { CashCountOrderByInput } from "./CashCountOrderByInput";

@ArgsType()
class CashCountFindManyArgs {
  @ApiProperty({
    required: false,
    type: () => CashCountWhereInput,
  })
  @IsOptional()
  @ValidateNested()
  @Field(() => CashCountWhereInput, { nullable: true })
  @Type(() => CashCountWhereInput)
  where?: CashCountWhereInput;

  @ApiProperty({
    required: false,
    type: [CashCountOrderByInput],
  })
  @IsOptional()
  @ValidateNested({ each: true })
  @Field(() => [CashCountOrderByInput], { nullable: true })
  @Type(() => CashCountOrderByInput)
  orderBy?: Array<CashCountOrderByInput>;

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

export { CashCountFindManyArgs as CashCountFindManyArgs };