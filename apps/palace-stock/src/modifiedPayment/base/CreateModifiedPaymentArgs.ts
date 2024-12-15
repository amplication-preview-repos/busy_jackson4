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
import { ModifiedPaymentCreateInput } from "./ModifiedPaymentCreateInput";
import { ValidateNested } from "class-validator";
import { Type } from "class-transformer";

@ArgsType()
class CreateModifiedPaymentArgs {
  @ApiProperty({
    required: true,
    type: () => ModifiedPaymentCreateInput,
  })
  @ValidateNested()
  @Type(() => ModifiedPaymentCreateInput)
  @Field(() => ModifiedPaymentCreateInput, { nullable: false })
  data!: ModifiedPaymentCreateInput;
}

export { CreateModifiedPaymentArgs as CreateModifiedPaymentArgs };
