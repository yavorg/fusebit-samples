"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.CandidateBackground_OutsideWorkExperienceRequestBuilder = void 0;
var core_1 = require("@sap-cloud-sdk/core");
var CandidateBackground_OutsideWorkExperience_1 = require("./CandidateBackground_OutsideWorkExperience");
/**
 * Request builder class for operations supported on the [[CandidateBackground_OutsideWorkExperience]] entity.
 */
var CandidateBackground_OutsideWorkExperienceRequestBuilder = /** @class */ (function (_super) {
    __extends(CandidateBackground_OutsideWorkExperienceRequestBuilder, _super);
    function CandidateBackground_OutsideWorkExperienceRequestBuilder() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Returns a request builder for retrieving one `CandidateBackground_OutsideWorkExperience` entity based on its keys.
     * @param backgroundElementId Key property. See [[CandidateBackground_OutsideWorkExperience.backgroundElementId]].
     * @returns A request builder for creating requests to retrieve one `CandidateBackground_OutsideWorkExperience` entity based on its keys.
     */
    CandidateBackground_OutsideWorkExperienceRequestBuilder.prototype.getByKey = function (backgroundElementId) {
        return new core_1.GetByKeyRequestBuilderV2(CandidateBackground_OutsideWorkExperience_1.CandidateBackground_OutsideWorkExperience, { backgroundElementId: backgroundElementId });
    };
    /**
     * Returns a request builder for querying all `CandidateBackground_OutsideWorkExperience` entities.
     * @returns A request builder for creating requests to retrieve all `CandidateBackground_OutsideWorkExperience` entities.
     */
    CandidateBackground_OutsideWorkExperienceRequestBuilder.prototype.getAll = function () {
        return new core_1.GetAllRequestBuilderV2(CandidateBackground_OutsideWorkExperience_1.CandidateBackground_OutsideWorkExperience);
    };
    /**
     * Returns a request builder for creating a `CandidateBackground_OutsideWorkExperience` entity.
     * @param entity The entity to be created
     * @returns A request builder for creating requests that create an entity of type `CandidateBackground_OutsideWorkExperience`.
     */
    CandidateBackground_OutsideWorkExperienceRequestBuilder.prototype.create = function (entity) {
        return new core_1.CreateRequestBuilderV2(CandidateBackground_OutsideWorkExperience_1.CandidateBackground_OutsideWorkExperience, entity);
    };
    /**
     * Returns a request builder for updating an entity of type `CandidateBackground_OutsideWorkExperience`.
     * @param entity The entity to be updated
     * @returns A request builder for creating requests that update an entity of type `CandidateBackground_OutsideWorkExperience`.
     */
    CandidateBackground_OutsideWorkExperienceRequestBuilder.prototype.update = function (entity) {
        return new core_1.UpdateRequestBuilderV2(CandidateBackground_OutsideWorkExperience_1.CandidateBackground_OutsideWorkExperience, entity);
    };
    return CandidateBackground_OutsideWorkExperienceRequestBuilder;
}(core_1.RequestBuilder));
exports.CandidateBackground_OutsideWorkExperienceRequestBuilder = CandidateBackground_OutsideWorkExperienceRequestBuilder;
//# sourceMappingURL=CandidateBackground_OutsideWorkExperienceRequestBuilder.js.map