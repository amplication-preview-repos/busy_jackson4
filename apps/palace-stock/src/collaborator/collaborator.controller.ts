import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { CollaboratorService } from "./collaborator.service";
import { CollaboratorControllerBase } from "./base/collaborator.controller.base";

@swagger.ApiTags("collaborators")
@common.Controller("collaborators")
export class CollaboratorController extends CollaboratorControllerBase {
  constructor(
    protected readonly service: CollaboratorService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
