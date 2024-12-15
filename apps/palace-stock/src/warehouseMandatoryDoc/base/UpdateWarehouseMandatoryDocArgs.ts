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
import { WarehouseMandatoryDocWhereUniqueInput } from "./WarehouseMandatoryDocWhereUniqueInput";
import { ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { WarehouseMandatoryDocUpdateInput } from "./WarehouseMandatoryDocUpdateInput";

@ArgsType()
class UpdateWarehouseMandatoryDocArgs {
  @ApiProperty({
    required: true,
    type: () => WarehouseMandatoryDocWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => WarehouseMandatoryDocWhereUniqueInput)
  @Field(() => WarehouseMandatoryDocWhereUniqueInput, { nullable: false })
  where!: WarehouseMandatoryDocWhereUniqueInput;

  @ApiProperty({
    required: true,
    type: () => WarehouseMandatoryDocUpdateInput,
  })
  @ValidateNested()
  @Type(() => WarehouseMandatoryDocUpdateInput)
  @Field(() => WarehouseMandatoryDocUpdateInput, { nullable: false })
  data!: WarehouseMandatoryDocUpdateInput;
}

export { UpdateWarehouseMandatoryDocArgs as UpdateWarehouseMandatoryDocArgs };
