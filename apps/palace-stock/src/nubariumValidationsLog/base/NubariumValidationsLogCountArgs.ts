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
import { NubariumValidationsLogWhereInput } from "./NubariumValidationsLogWhereInput";
import { Type } from "class-transformer";

@ArgsType()
class NubariumValidationsLogCountArgs {
  @ApiProperty({
    required: false,
    type: () => NubariumValidationsLogWhereInput,
  })
  @Field(() => NubariumValidationsLogWhereInput, { nullable: true })
  @Type(() => NubariumValidationsLogWhereInput)
  where?: NubariumValidationsLogWhereInput;
}

export { NubariumValidationsLogCountArgs as NubariumValidationsLogCountArgs };