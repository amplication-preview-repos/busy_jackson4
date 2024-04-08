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
import { ModifiedPaymentWhereUniqueInput } from "./ModifiedPaymentWhereUniqueInput";
import { ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { ModifiedPaymentUpdateInput } from "./ModifiedPaymentUpdateInput";

@ArgsType()
class UpdateModifiedPaymentArgs {
  @ApiProperty({
    required: true,
    type: () => ModifiedPaymentWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => ModifiedPaymentWhereUniqueInput)
  @Field(() => ModifiedPaymentWhereUniqueInput, { nullable: false })
  where!: ModifiedPaymentWhereUniqueInput;

  @ApiProperty({
    required: true,
    type: () => ModifiedPaymentUpdateInput,
  })
  @ValidateNested()
  @Type(() => ModifiedPaymentUpdateInput)
  @Field(() => ModifiedPaymentUpdateInput, { nullable: false })
  data!: ModifiedPaymentUpdateInput;
}

export { UpdateModifiedPaymentArgs as UpdateModifiedPaymentArgs };