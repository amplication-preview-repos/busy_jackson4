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
import { IsString, IsOptional, ValidateNested } from "class-validator";
import { ItemUpdateManyWithoutMeasuringUnitsInput } from "./ItemUpdateManyWithoutMeasuringUnitsInput";
import { Type } from "class-transformer";

@InputType()
class MeasuringUnitUpdateInput {
  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  claveSatUm?: string | null;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  descripcionUm?: string;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  descripcionUmSat?: string | null;

  @ApiProperty({
    required: false,
    type: () => ItemUpdateManyWithoutMeasuringUnitsInput,
  })
  @ValidateNested()
  @Type(() => ItemUpdateManyWithoutMeasuringUnitsInput)
  @IsOptional()
  @Field(() => ItemUpdateManyWithoutMeasuringUnitsInput, {
    nullable: true,
  })
  items?: ItemUpdateManyWithoutMeasuringUnitsInput;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  umCfdi?: string | null;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  unidadMedida?: string;
}

export { MeasuringUnitUpdateInput as MeasuringUnitUpdateInput };