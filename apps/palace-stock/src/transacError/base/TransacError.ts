/*
------------------------------------------------------------------------------ 
This code was generated by Amplication. 
 
Changes to this file will be lost if the code is regenerated. 

There are other ways to to customize your code, see this doc to learn more
https://docs.amplication.com/how-to/custom-code

------------------------------------------------------------------------------
  */
import { ObjectType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { BranchOffice } from "../../branchOffice/base/BranchOffice";
import { ValidateNested, IsInt, IsString, IsOptional } from "class-validator";
import { Type } from "class-transformer";

@ObjectType()
class TransacError {
  @ApiProperty({
    required: true,
    type: () => BranchOffice,
  })
  @ValidateNested()
  @Type(() => BranchOffice)
  branchOffices?: BranchOffice;

  @ApiProperty({
    required: true,
    type: Number,
  })
  @IsInt()
  @Field(() => Number)
  folioTrans!: number;

  @ApiProperty({
    required: true,
    type: Number,
  })
  @IsInt()
  @Field(() => Number)
  id!: number;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  seriesError!: string | null;
}

export { TransacError as TransacError };
