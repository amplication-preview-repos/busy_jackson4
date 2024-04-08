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
import { ItemCreateNestedManyWithoutMeasuringUnitsInput } from "./ItemCreateNestedManyWithoutMeasuringUnitsInput";
import { Type } from "class-transformer";

@InputType()
class MeasuringUnitCreateInput {
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
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String)
  descripcionUm!: string;

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
    type: () => ItemCreateNestedManyWithoutMeasuringUnitsInput,
  })
  @ValidateNested()
  @Type(() => ItemCreateNestedManyWithoutMeasuringUnitsInput)
  @IsOptional()
  @Field(() => ItemCreateNestedManyWithoutMeasuringUnitsInput, {
    nullable: true,
  })
  items?: ItemCreateNestedManyWithoutMeasuringUnitsInput;

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
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String)
  unidadMedida!: string;
}

export { MeasuringUnitCreateInput as MeasuringUnitCreateInput };
