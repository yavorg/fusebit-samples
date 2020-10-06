"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultCandidatePath = exports.changeset = exports.batch = void 0;
/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
var core_1 = require("@sap-cloud-sdk/core");
var index_1 = require("./index");
/**
 * Batch builder for operations supported on the Candidate.
 * @param requests The requests of the batch
 * @returns A request builder for batch.
 */
function batch() {
    var requests = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        requests[_i] = arguments[_i];
    }
    return new core_1.ODataBatchRequestBuilderV2(exports.defaultCandidatePath, requests, map);
}
exports.batch = batch;
/**
 * Change set constructor consists of write operations supported on the Candidate.
 * @param requests The requests of the change set
 * @returns A change set for batch.
 */
function changeset() {
    var requests = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        requests[_i] = arguments[_i];
    }
    return new core_1.ODataBatchChangeSetV2(requests);
}
exports.changeset = changeset;
exports.defaultCandidatePath = '/sap/opu/odata/sap/SFOData';
var map = { 'CandidateBackground_InsideWorkExperience': index_1.CandidateBackground_InsideWorkExperience, 'CandidateLight': index_1.CandidateLight, 'CandidateComments': index_1.CandidateComments, 'CandidateBackground_Education': index_1.CandidateBackground_Education, 'Candidate': index_1.Candidate, 'JobApplicationSnapshot_TalentPoolcorp': index_1.JobApplicationSnapshot_TalentPoolcorp, 'JobApplicationSnapshot_Education': index_1.JobApplicationSnapshot_Education, 'JobApplicationSnapshot_TalentPool': index_1.JobApplicationSnapshot_TalentPool, 'CandidateBackground_OutsideWorkExperience': index_1.CandidateBackground_OutsideWorkExperience, 'CandidateBackground_Certificates': index_1.CandidateBackground_Certificates, 'CandidateBackground_Languages': index_1.CandidateBackground_Languages, 'JobApplicationSnapshot_InsideWorkExperience': index_1.JobApplicationSnapshot_InsideWorkExperience, 'JobApplicationSnapshot_Certificates': index_1.JobApplicationSnapshot_Certificates, 'JobApplicationSnapshot_OutsideWorkExperience': index_1.JobApplicationSnapshot_OutsideWorkExperience, 'JobApplicationSnapshot_Languages': index_1.JobApplicationSnapshot_Languages, 'CandidateBackground_TalentPool': index_1.CandidateBackground_TalentPool, 'CandidateProfileExtension': index_1.CandidateProfileExtension, 'CandidateTags': index_1.CandidateTags, 'CandidateBackground_TalentPoolcorp': index_1.CandidateBackground_TalentPoolcorp };
//# sourceMappingURL=BatchRequest.js.map