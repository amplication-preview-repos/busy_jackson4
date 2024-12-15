import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { MandatoryDocumentService } from "./mandatoryDocument.service";
import { MandatoryDocumentControllerBase } from "./base/mandatoryDocument.controller.base";

@swagger.ApiTags("mandatoryDocuments")
@common.Controller("mandatoryDocuments")
export class MandatoryDocumentController extends MandatoryDocumentControllerBase {
  constructor(
    protected readonly service: MandatoryDocumentService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
