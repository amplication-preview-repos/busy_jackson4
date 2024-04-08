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
import { WarehouseGrantWhereInput } from "./WarehouseGrantWhereInput";
import { IsOptional, ValidateNested, IsInt } from "class-validator";
import { Type } from "class-transformer";
import { WarehouseGrantOrderByInput } from "./WarehouseGrantOrderByInput";

@ArgsType()
class WarehouseGrantFindManyArgs {
  @ApiProperty({
    required: false,
    type: () => WarehouseGrantWhereInput,
  })
  @IsOptional()
  @ValidateNested()
  @Field(() => WarehouseGrantWhereInput, { nullable: true })
  @Type(() => WarehouseGrantWhereInput)
  where?: WarehouseGrantWhereInput;

  @ApiProperty({
    required: false,
    type: [WarehouseGrantOrderByInput],
  })
  @IsOptional()
  @ValidateNested({ each: true })
  @Field(() => [WarehouseGrantOrderByInput], { nullable: true })
  @Type(() => WarehouseGrantOrderByInput)
  orderBy?: Array<WarehouseGrantOrderByInput>;

  @ApiProperty({
    required: false,
    type: Number,
  })
  @IsOptional()
  @IsInt()
  @Field(() => Number, { nullable: true })
  @Type(() => Number)
  skip?: number;

  @ApiProperty({
    required: false,
    type: Number,
  })
  @IsOptional()
  @IsInt()
  @Field(() => Number, { nullable: true })
  @Type(() => Number)
  take?: number;
}

export { WarehouseGrantFindManyArgs as WarehouseGrantFindManyArgs };