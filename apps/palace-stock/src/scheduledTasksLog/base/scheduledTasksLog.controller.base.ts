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
import { ScheduledTasksLogService } from "../scheduledTasksLog.service";
import { AclValidateRequestInterceptor } from "../../interceptors/aclValidateRequest.interceptor";
import { AclFilterResponseInterceptor } from "../../interceptors/aclFilterResponse.interceptor";
import { ScheduledTasksLogCreateInput } from "./ScheduledTasksLogCreateInput";
import { ScheduledTasksLog } from "./ScheduledTasksLog";
import { ScheduledTasksLogFindManyArgs } from "./ScheduledTasksLogFindManyArgs";
import { ScheduledTasksLogWhereUniqueInput } from "./ScheduledTasksLogWhereUniqueInput";
import { ScheduledTasksLogUpdateInput } from "./ScheduledTasksLogUpdateInput";

@swagger.ApiBearerAuth()
@common.UseGuards(defaultAuthGuard.DefaultAuthGuard, nestAccessControl.ACGuard)
export class ScheduledTasksLogControllerBase {
  constructor(
    protected readonly service: ScheduledTasksLogService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}
  @common.UseInterceptors(AclValidateRequestInterceptor)
  @common.Post()
  @swagger.ApiCreatedResponse({ type: ScheduledTasksLog })
  @nestAccessControl.UseRoles({
    resource: "ScheduledTasksLog",
    action: "create",
    possession: "any",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async createScheduledTasksLog(
    @common.Body() data: ScheduledTasksLogCreateInput
  ): Promise<ScheduledTasksLog> {
    return await this.service.createScheduledTasksLog({
      data: data,
      select: {
        bitacora: true,
        codigosCompletados: true,
        codigosInvalidos: true,
        fechaRegistro: true,
        id: true,
        tarea: true,
      },
    });
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @common.Get()
  @swagger.ApiOkResponse({ type: [ScheduledTasksLog] })
  @ApiNestedQuery(ScheduledTasksLogFindManyArgs)
  @nestAccessControl.UseRoles({
    resource: "ScheduledTasksLog",
    action: "read",
    possession: "any",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async scheduledTasksLogs(
    @common.Req() request: Request
  ): Promise<ScheduledTasksLog[]> {
    const args = plainToClass(ScheduledTasksLogFindManyArgs, request.query);
    return this.service.scheduledTasksLogs({
      ...args,
      select: {
        bitacora: true,
        codigosCompletados: true,
        codigosInvalidos: true,
        fechaRegistro: true,
        id: true,
        tarea: true,
      },
    });
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @common.Get("/:id")
  @swagger.ApiOkResponse({ type: ScheduledTasksLog })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @nestAccessControl.UseRoles({
    resource: "ScheduledTasksLog",
    action: "read",
    possession: "own",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async scheduledTasksLog(
    @common.Param() params: ScheduledTasksLogWhereUniqueInput
  ): Promise<ScheduledTasksLog | null> {
    const result = await this.service.scheduledTasksLog({
      where: params,
      select: {
        bitacora: true,
        codigosCompletados: true,
        codigosInvalidos: true,
        fechaRegistro: true,
        id: true,
        tarea: true,
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
  @swagger.ApiOkResponse({ type: ScheduledTasksLog })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @nestAccessControl.UseRoles({
    resource: "ScheduledTasksLog",
    action: "update",
    possession: "any",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async updateScheduledTasksLog(
    @common.Param() params: ScheduledTasksLogWhereUniqueInput,
    @common.Body() data: ScheduledTasksLogUpdateInput
  ): Promise<ScheduledTasksLog | null> {
    try {
      return await this.service.updateScheduledTasksLog({
        where: params,
        data: data,
        select: {
          bitacora: true,
          codigosCompletados: true,
          codigosInvalidos: true,
          fechaRegistro: true,
          id: true,
          tarea: true,
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
  @swagger.ApiOkResponse({ type: ScheduledTasksLog })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @nestAccessControl.UseRoles({
    resource: "ScheduledTasksLog",
    action: "delete",
    possession: "any",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async deleteScheduledTasksLog(
    @common.Param() params: ScheduledTasksLogWhereUniqueInput
  ): Promise<ScheduledTasksLog | null> {
    try {
      return await this.service.deleteScheduledTasksLog({
        where: params,
        select: {
          bitacora: true,
          codigosCompletados: true,
          codigosInvalidos: true,
          fechaRegistro: true,
          id: true,
          tarea: true,
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