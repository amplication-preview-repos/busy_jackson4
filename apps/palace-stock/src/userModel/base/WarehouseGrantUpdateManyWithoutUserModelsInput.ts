/*
------------------------------------------------------------------------------ 
This code was generated by Amplication. 
 
Changes to this file will be lost if the code is regenerated. 

There are other ways to to customize your code, see this doc to learn more
https://docs.amplication.com/how-to/custom-code

------------------------------------------------------------------------------
  */
import { InputType, Field } from "@nestjs/graphql";
import { WarehouseGrantWhereUniqueInput } from "../../warehouseGrant/base/WarehouseGrantWhereUniqueInput";
import { ApiProperty } from "@nestjs/swagger";

@InputType()
class WarehouseGrantUpdateManyWithoutUserModelsInput {
  @Field(() => [WarehouseGrantWhereUniqueInput], {
    nullable: true,
  })
  @ApiProperty({
    required: false,
    type: () => [WarehouseGrantWhereUniqueInput],
  })
  connect?: Array<WarehouseGrantWhereUniqueInput>;

  @Field(() => [WarehouseGrantWhereUniqueInput], {
    nullable: true,
  })
  @ApiProperty({
    required: false,
    type: () => [WarehouseGrantWhereUniqueInput],
  })
  disconnect?: Array<WarehouseGrantWhereUniqueInput>;

  @Field(() => [WarehouseGrantWhereUniqueInput], {
    nullable: true,
  })
  @ApiProperty({
    required: false,
    type: () => [WarehouseGrantWhereUniqueInput],
  })
  set?: Array<WarehouseGrantWhereUniqueInput>;
}

export { WarehouseGrantUpdateManyWithoutUserModelsInput as WarehouseGrantUpdateManyWithoutUserModelsInput };
