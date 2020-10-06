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
exports.CandidateBackground_TalentPoolcorpRequestBuilder = void 0;
var core_1 = require("@sap-cloud-sdk/core");
var CandidateBackground_TalentPoolcorp_1 = require("./CandidateBackground_TalentPoolcorp");
/**
 * Request builder class for operations supported on the [[CandidateBackground_TalentPoolcorp]] entity.
 */
var CandidateBackground_TalentPoolcorpRequestBuilder = /** @class */ (function (_super) {
    __extends(CandidateBackground_TalentPoolcorpRequestBuilder, _super);
    function CandidateBackground_TalentPoolcorpRequestBuilder() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Returns a request builder for retrieving one `CandidateBackground_TalentPoolcorp` entity based on its keys.
     * @param backgroundElementId Key property. See [[CandidateBackground_TalentPoolcorp.backgroundElementId]].
     * @returns A request builder for creating requests to retrieve one `CandidateBackground_TalentPoolcorp` entity based on its keys.
     */
    CandidateBackground_TalentPoolcorpRequestBuilder.prototype.getByKey = function (backgroundElementId) {
        return new core_1.GetByKeyRequestBuilderV2(CandidateBackground_TalentPoolcorp_1.CandidateBackground_TalentPoolcorp, { backgroundElementId: backgroundElementId });
    };
    /**
     * Returns a request builder for querying all `CandidateBackground_TalentPoolcorp` entities.
     * @returns A request builder for creating requests to retrieve all `CandidateBackground_TalentPoolcorp` entities.
     */
    CandidateBackground_TalentPoolcorpRequestBuilder.prototype.getAll = function () {
        return new core_1.GetAllRequestBuilderV2(CandidateBackground_TalentPoolcorp_1.CandidateBackground_TalentPoolcorp);
    };
    /**
     * Returns a request builder for creating a `CandidateBackground_TalentPoolcorp` entity.
     * @param entity The entity to be created
     * @returns A request builder for creating requests that create an entity of type `CandidateBackground_TalentPoolcorp`.
     */
    CandidateBackground_TalentPoolcorpRequestBuilder.prototype.create = function (entity) {
        return new core_1.CreateRequestBuilderV2(CandidateBackground_TalentPoolcorp_1.CandidateBackground_TalentPoolcorp, entity);
    };
    /**
     * Returns a request builder for updating an entity of type `CandidateBackground_TalentPoolcorp`.
     * @param entity The entity to be updated
     * @returns A request builder for creating requests that update an entity of type `CandidateBackground_TalentPoolcorp`.
     */
    CandidateBackground_TalentPoolcorpRequestBuilder.prototype.update = function (entity) {
        return new core_1.UpdateRequestBuilderV2(CandidateBackground_TalentPoolcorp_1.CandidateBackground_TalentPoolcorp, entity);
    };
    return CandidateBackground_TalentPoolcorpRequestBuilder;
}(core_1.RequestBuilder));
exports.CandidateBackground_TalentPoolcorpRequestBuilder = CandidateBackground_TalentPoolcorpRequestBuilder;
//# sourceMappingURL=CandidateBackground_TalentPoolcorpRequestBuilder.js.map