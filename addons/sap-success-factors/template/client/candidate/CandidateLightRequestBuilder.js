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
exports.CandidateLightRequestBuilder = void 0;
var core_1 = require("@sap-cloud-sdk/core");
var CandidateLight_1 = require("./CandidateLight");
/**
 * Request builder class for operations supported on the [[CandidateLight]] entity.
 */
var CandidateLightRequestBuilder = /** @class */ (function (_super) {
    __extends(CandidateLightRequestBuilder, _super);
    function CandidateLightRequestBuilder() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Returns a request builder for retrieving one `CandidateLight` entity based on its keys.
     * @param candidateId Key property. See [[CandidateLight.candidateId]].
     * @returns A request builder for creating requests to retrieve one `CandidateLight` entity based on its keys.
     */
    CandidateLightRequestBuilder.prototype.getByKey = function (candidateId) {
        return new core_1.GetByKeyRequestBuilderV2(CandidateLight_1.CandidateLight, { candidateId: candidateId });
    };
    /**
     * Returns a request builder for querying all `CandidateLight` entities.
     * @returns A request builder for creating requests to retrieve all `CandidateLight` entities.
     */
    CandidateLightRequestBuilder.prototype.getAll = function () {
        return new core_1.GetAllRequestBuilderV2(CandidateLight_1.CandidateLight);
    };
    /**
     * Returns a request builder for creating a `CandidateLight` entity.
     * @param entity The entity to be created
     * @returns A request builder for creating requests that create an entity of type `CandidateLight`.
     */
    CandidateLightRequestBuilder.prototype.create = function (entity) {
        return new core_1.CreateRequestBuilderV2(CandidateLight_1.CandidateLight, entity);
    };
    /**
     * Returns a request builder for updating an entity of type `CandidateLight`.
     * @param entity The entity to be updated
     * @returns A request builder for creating requests that update an entity of type `CandidateLight`.
     */
    CandidateLightRequestBuilder.prototype.update = function (entity) {
        return new core_1.UpdateRequestBuilderV2(CandidateLight_1.CandidateLight, entity);
    };
    return CandidateLightRequestBuilder;
}(core_1.RequestBuilder));
exports.CandidateLightRequestBuilder = CandidateLightRequestBuilder;
//# sourceMappingURL=CandidateLightRequestBuilder.js.map