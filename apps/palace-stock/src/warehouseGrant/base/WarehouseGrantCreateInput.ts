/*
------------------------------------------------------------------------------ 
This code was generated by Amplication. 
 
Changes to this file will be lost if the code is regenerated. 

There are other ways to to customize your code, see this doc to learn more
https://docs.amplication.com/how-to/custom-code

------------------------------------------------------------------------------
  */
import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, ValidateNested } from "class-validator";
import { UserModelWhereUniqueInput } from "../../userModel/base/UserModelWhereUniqueInput";
import { Type } from "class-transformer";
import { WarehouseWhereUniqueInput } from "../../warehouse/base/WarehouseWhereUniqueInput";

@InputType()
class WarehouseGrantCreateInput {
  @ApiProperty({
    required: true,
    type: Boolean,
  })
  @IsBoolean()
  @Field(() => Boolean)
  mainWhouse!: boolean;

  @ApiProperty({
    required: true,
    type: () => UserModelWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => UserModelWhereUniqueInput)
  @Field(() => UserModelWhereUniqueInput)
  users!: UserModelWhereUniqueInput;

  @ApiProperty({
    required: true,
    type: () => WarehouseWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => WarehouseWhereUniqueInput)
  @Field(() => WarehouseWhereUniqueInput)
  warehouses!: WarehouseWhereUniqueInput;
}

export { WarehouseGrantCreateInput as WarehouseGrantCreateInput };
