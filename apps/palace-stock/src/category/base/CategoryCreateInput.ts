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
import { IsString, IsInt, IsOptional, ValidateNested } from "class-validator";
import { ItemCreateNestedManyWithoutCategoriesInput } from "./ItemCreateNestedManyWithoutCategoriesInput";
import { Type } from "class-transformer";

@InputType()
class CategoryCreateInput {
  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String)
  catCode!: string;

  @ApiProperty({
    required: false,
    type: Number,
  })
  @IsInt()
  @IsOptional()
  @Field(() => Number, {
    nullable: true,
  })
  claveSatPs?: number | null;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  codigoClasificacion?: string | null;

  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String)
  descripcionCat!: string;

  @ApiProperty({
    required: false,
    type: () => ItemCreateNestedManyWithoutCategoriesInput,
  })
  @ValidateNested()
  @Type(() => ItemCreateNestedManyWithoutCategoriesInput)
  @IsOptional()
  @Field(() => ItemCreateNestedManyWithoutCategoriesInput, {
    nullable: true,
  })
  items?: ItemCreateNestedManyWithoutCategoriesInput;
}

export { CategoryCreateInput as CategoryCreateInput };
