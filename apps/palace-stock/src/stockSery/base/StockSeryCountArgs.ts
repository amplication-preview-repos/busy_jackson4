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
import { StockSeryWhereInput } from "./StockSeryWhereInput";
import { Type } from "class-transformer";

@ArgsType()
class StockSeryCountArgs {
  @ApiProperty({
    required: false,
    type: () => StockSeryWhereInput,
  })
  @Field(() => StockSeryWhereInput, { nullable: true })
  @Type(() => StockSeryWhereInput)
  where?: StockSeryWhereInput;
}

export { StockSeryCountArgs as StockSeryCountArgs };
