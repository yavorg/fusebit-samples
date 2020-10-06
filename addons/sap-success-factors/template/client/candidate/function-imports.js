"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.functionImports = exports.setSmsNotificationPreference = void 0;
var core_1 = require("@sap-cloud-sdk/core");
/**
 * Set Sms Notification Preference.
 *
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resultng request.
 */
function setSmsNotificationPreference(parameters) {
    var params = {
        optIn: new core_1.FunctionImportParameter('optIn', 'Edm.Boolean', parameters.optIn),
        candidateId: new core_1.FunctionImportParameter('candidateId', 'Edm.Int64', parameters.candidateId),
        isoCountryCode: new core_1.FunctionImportParameter('isoCountryCode', 'Edm.String', parameters.isoCountryCode),
        cellPhone: new core_1.FunctionImportParameter('cellPhone', 'Edm.String', parameters.cellPhone)
    };
    return new core_1.FunctionImportRequestBuilderV2('post', 'odata/v2', 'setSmsNotificationPreference', function (data) { return core_1.transformReturnValueForEdmTypeV2(data, function (val) { return core_1.edmToTsV2(val, 'Edm.String'); }); }, params);
}
exports.setSmsNotificationPreference = setSmsNotificationPreference;
exports.functionImports = {
    setSmsNotificationPreference: setSmsNotificationPreference
};
//# sourceMappingURL=function-imports.js.map