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
import { UserModelCreateNestedManyWithoutAccessLevelsInput } from "./UserModelCreateNestedManyWithoutAccessLevelsInput";
import { Type } from "class-transformer";

@InputType()
class AccessLevelCreateInput {
  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  descripcionNivel?: string | null;

  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String)
  nivel!: string;

  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String)
  nivelConsulta!: string;

  @ApiProperty({
    required: false,
    type: () => UserModelCreateNestedManyWithoutAccessLevelsInput,
  })
  @ValidateNested()
  @Type(() => UserModelCreateNestedManyWithoutAccessLevelsInput)
  @IsOptional()
  @Field(() => UserModelCreateNestedManyWithoutAccessLevelsInput, {
    nullable: true,
  })
  users?: UserModelCreateNestedManyWithoutAccessLevelsInput;
}

export { AccessLevelCreateInput as AccessLevelCreateInput };
