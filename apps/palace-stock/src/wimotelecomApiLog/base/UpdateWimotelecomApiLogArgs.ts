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
import { WimotelecomApiLogWhereUniqueInput } from "./WimotelecomApiLogWhereUniqueInput";
import { ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { WimotelecomApiLogUpdateInput } from "./WimotelecomApiLogUpdateInput";

@ArgsType()
class UpdateWimotelecomApiLogArgs {
  @ApiProperty({
    required: true,
    type: () => WimotelecomApiLogWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => WimotelecomApiLogWhereUniqueInput)
  @Field(() => WimotelecomApiLogWhereUniqueInput, { nullable: false })
  where!: WimotelecomApiLogWhereUniqueInput;

  @ApiProperty({
    required: true,
    type: () => WimotelecomApiLogUpdateInput,
  })
  @ValidateNested()
  @Type(() => WimotelecomApiLogUpdateInput)
  @Field(() => WimotelecomApiLogUpdateInput, { nullable: false })
  data!: WimotelecomApiLogUpdateInput;
}

export { UpdateWimotelecomApiLogArgs as UpdateWimotelecomApiLogArgs };