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
import { PaycodeWebhookLogWhereUniqueInput } from "./PaycodeWebhookLogWhereUniqueInput";
import { ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { PaycodeWebhookLogUpdateInput } from "./PaycodeWebhookLogUpdateInput";

@ArgsType()
class UpdatePaycodeWebhookLogArgs {
  @ApiProperty({
    required: true,
    type: () => PaycodeWebhookLogWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => PaycodeWebhookLogWhereUniqueInput)
  @Field(() => PaycodeWebhookLogWhereUniqueInput, { nullable: false })
  where!: PaycodeWebhookLogWhereUniqueInput;

  @ApiProperty({
    required: true,
    type: () => PaycodeWebhookLogUpdateInput,
  })
  @ValidateNested()
  @Type(() => PaycodeWebhookLogUpdateInput)
  @Field(() => PaycodeWebhookLogUpdateInput, { nullable: false })
  data!: PaycodeWebhookLogUpdateInput;
}

export { UpdatePaycodeWebhookLogArgs as UpdatePaycodeWebhookLogArgs };
