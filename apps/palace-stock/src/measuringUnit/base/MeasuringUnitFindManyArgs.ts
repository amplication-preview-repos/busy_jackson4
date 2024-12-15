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
import { MeasuringUnitWhereInput } from "./MeasuringUnitWhereInput";
import { IsOptional, ValidateNested, IsInt } from "class-validator";
import { Type } from "class-transformer";
import { MeasuringUnitOrderByInput } from "./MeasuringUnitOrderByInput";

@ArgsType()
class MeasuringUnitFindManyArgs {
  @ApiProperty({
    required: false,
    type: () => MeasuringUnitWhereInput,
  })
  @IsOptional()
  @ValidateNested()
  @Field(() => MeasuringUnitWhereInput, { nullable: true })
  @Type(() => MeasuringUnitWhereInput)
  where?: MeasuringUnitWhereInput;

  @ApiProperty({
    required: false,
    type: [MeasuringUnitOrderByInput],
  })
  @IsOptional()
  @ValidateNested({ each: true })
  @Field(() => [MeasuringUnitOrderByInput], { nullable: true })
  @Type(() => MeasuringUnitOrderByInput)
  orderBy?: Array<MeasuringUnitOrderByInput>;

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

export { MeasuringUnitFindManyArgs as MeasuringUnitFindManyArgs };
