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
import { TransitTransferWhereInput } from "./TransitTransferWhereInput";
import { Type } from "class-transformer";

@ArgsType()
class TransitTransferCountArgs {
  @ApiProperty({
    required: false,
    type: () => TransitTransferWhereInput,
  })
  @Field(() => TransitTransferWhereInput, { nullable: true })
  @Type(() => TransitTransferWhereInput)
  where?: TransitTransferWhereInput;
}

export { TransitTransferCountArgs as TransitTransferCountArgs };
