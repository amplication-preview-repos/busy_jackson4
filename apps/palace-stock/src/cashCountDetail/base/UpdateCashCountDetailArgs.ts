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
import { CashCountDetailWhereUniqueInput } from "./CashCountDetailWhereUniqueInput";
import { ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { CashCountDetailUpdateInput } from "./CashCountDetailUpdateInput";

@ArgsType()
class UpdateCashCountDetailArgs {
  @ApiProperty({
    required: true,
    type: () => CashCountDetailWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => CashCountDetailWhereUniqueInput)
  @Field(() => CashCountDetailWhereUniqueInput, { nullable: false })
  where!: CashCountDetailWhereUniqueInput;

  @ApiProperty({
    required: true,
    type: () => CashCountDetailUpdateInput,
  })
  @ValidateNested()
  @Type(() => CashCountDetailUpdateInput)
  @Field(() => CashCountDetailUpdateInput, { nullable: false })
  data!: CashCountDetailUpdateInput;
}

export { UpdateCashCountDetailArgs as UpdateCashCountDetailArgs };
