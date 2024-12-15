/*
------------------------------------------------------------------------------ 
This code was generated by Amplication. 
 
Changes to this file will be lost if the code is regenerated. 

There are other ways to to customize your code, see this doc to learn more
https://docs.amplication.com/how-to/custom-code

------------------------------------------------------------------------------
  */
import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import { isRecordNotFoundError } from "../../prisma.util";
import * as errors from "../../errors";
import { Request } from "express";
import { plainToClass } from "class-transformer";
import { ApiNestedQuery } from "../../decorators/api-nested-query.decorator";
import * as nestAccessControl from "nest-access-control";
import * as defaultAuthGuard from "../../auth/defaultAuth.guard";
import { SimPlanService } from "../simPlan.service";
import { AclValidateRequestInterceptor } from "../../interceptors/aclValidateRequest.interceptor";
import { AclFilterResponseInterceptor } from "../../interceptors/aclFilterResponse.interceptor";
import { SimPlanCreateInput } from "./SimPlanCreateInput";
import { SimPlan } from "./SimPlan";
import { SimPlanFindManyArgs } from "./SimPlanFindManyArgs";
import { SimPlanWhereUniqueInput } from "./SimPlanWhereUniqueInput";
import { SimPlanUpdateInput } from "./SimPlanUpdateInput";

@swagger.ApiBearerAuth()
@common.UseGuards(defaultAuthGuard.DefaultAuthGuard, nestAccessControl.ACGuard)
export class SimPlanControllerBase {
  constructor(
    protected readonly service: SimPlanService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}
  @common.UseInterceptors(AclValidateRequestInterceptor)
  @common.Post()
  @swagger.ApiCreatedResponse({ type: SimPlan })
  @nestAccessControl.UseRoles({
    resource: "SimPlan",
    action: "create",
    possession: "any",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async createSimPlan(
    @common.Body() data: SimPlanCreateInput
  ): Promise<SimPlan> {
    return await this.service.createSimPlan({
      data: data,
      select: {
        descripccionPlan: true,
        id: true,
      },
    });
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @common.Get()
  @swagger.ApiOkResponse({ type: [SimPlan] })
  @ApiNestedQuery(SimPlanFindManyArgs)
  @nestAccessControl.UseRoles({
    resource: "SimPlan",
    action: "read",
    possession: "any",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async simPlans(@common.Req() request: Request): Promise<SimPlan[]> {
    const args = plainToClass(SimPlanFindManyArgs, request.query);
    return this.service.simPlans({
      ...args,
      select: {
        descripccionPlan: true,
        id: true,
      },
    });
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @common.Get("/:id")
  @swagger.ApiOkResponse({ type: SimPlan })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @nestAccessControl.UseRoles({
    resource: "SimPlan",
    action: "read",
    possession: "own",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async simPlan(
    @common.Param() params: SimPlanWhereUniqueInput
  ): Promise<SimPlan | null> {
    const result = await this.service.simPlan({
      where: params,
      select: {
        descripccionPlan: true,
        id: true,
      },
    });
    if (result === null) {
      throw new errors.NotFoundException(
        `No resource was found for ${JSON.stringify(params)}`
      );
    }
    return result;
  }

  @common.UseInterceptors(AclValidateRequestInterceptor)
  @common.Patch("/:id")
  @swagger.ApiOkResponse({ type: SimPlan })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @nestAccessControl.UseRoles({
    resource: "SimPlan",
    action: "update",
    possession: "any",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async updateSimPlan(
    @common.Param() params: SimPlanWhereUniqueInput,
    @common.Body() data: SimPlanUpdateInput
  ): Promise<SimPlan | null> {
    try {
      return await this.service.updateSimPlan({
        where: params,
        data: data,
        select: {
          descripccionPlan: true,
          id: true,
        },
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new errors.NotFoundException(
          `No resource was found for ${JSON.stringify(params)}`
        );
      }
      throw error;
    }
  }

  @common.Delete("/:id")
  @swagger.ApiOkResponse({ type: SimPlan })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @nestAccessControl.UseRoles({
    resource: "SimPlan",
    action: "delete",
    possession: "any",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async deleteSimPlan(
    @common.Param() params: SimPlanWhereUniqueInput
  ): Promise<SimPlan | null> {
    try {
      return await this.service.deleteSimPlan({
        where: params,
        select: {
          descripccionPlan: true,
          id: true,
        },
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new errors.NotFoundException(
          `No resource was found for ${JSON.stringify(params)}`
        );
      }
      throw error;
    }
  }
}
