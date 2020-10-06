/*
This is the installation logic of the Lifecycle Manager. 
*/

const Fs = require('fs');
const Sdk = require('@fusebit/add-on-sdk');
const Superagent = require('superagent');

const getTemplateFiles = (fileNames) =>
  fileNames.reduce((a, c) => {
    a[c] = Fs.readFileSync(__dirname + `/template/${c}`, { encoding: 'utf8' });
    return a;
  }, {});

module.exports = async (ctx) => {
  let storageSpecification = await Sdk.createStorage(ctx);

  // Create the Add-On Handler
  try {
    const clientFiles = [
      'client/candidate/BatchRequest.js',
      'client/candidate/Candidate.js',
      'client/candidate/CandidateBackground_Certificates.js',
      'client/candidate/CandidateBackground_Education.js',
      'client/candidate/CandidateBackground_EducationRequestBuilder.js',
      'client/candidate/CandidateBackground_CertificatesRequestBuilder.js',
      'client/candidate/CandidateBackground_InsideWorkExperience.js',
      'client/candidate/CandidateBackground_InsideWorkExperienceRequestBuilder.js',
      'client/candidate/CandidateBackground_Languages.js',
      'client/candidate/CandidateBackground_LanguagesRequestBuilder.js',
      'client/candidate/CandidateBackground_OutsideWorkExperience.js',
      'client/candidate/CandidateBackground_OutsideWorkExperienceRequestBuilder.js',
      'client/candidate/CandidateBackground_TalentPool.js',
      'client/candidate/CandidateBackground_TalentPoolRequestBuilder.js',
      'client/candidate/CandidateBackground_TalentPoolcorp.js',
      'client/candidate/CandidateBackground_TalentPoolcorpRequestBuilder.js',
      'client/candidate/CandidateComments.js',
      'client/candidate/CandidateCommentsRequestBuilder.js',
      'client/candidate/CandidateLight.js',
      'client/candidate/CandidateLightRequestBuilder.js',
      'client/candidate/CandidateProfileExtension.js',
      'client/candidate/CandidateProfileExtensionRequestBuilder.js',
      'client/candidate/CandidateRequestBuilder.js',
      'client/candidate/CandidateTags.js',
      'client/candidate/CandidateTagsRequestBuilder.js',
      'client/candidate/JobApplicationSnapshot_Certificates.js',
      'client/candidate/JobApplicationSnapshot_CertificatesRequestBuilder.js',
      'client/candidate/JobApplicationSnapshot_Education.js',
      'client/candidate/JobApplicationSnapshot_EducationRequestBuilder.js',
      'client/candidate/JobApplicationSnapshot_InsideWorkExperience.js',
      'client/candidate/JobApplicationSnapshot_InsideWorkExperienceRequestBuilder.js',
      'client/candidate/JobApplicationSnapshot_Languages.js',
      'client/candidate/JobApplicationSnapshot_LanguagesRequestBuilder.js',
      'client/candidate/JobApplicationSnapshot_OutsideWorkExperience.js',
      'client/candidate/JobApplicationSnapshot_OutsideWorkExperienceRequestBuilder.js',
      'client/candidate/JobApplicationSnapshot_TalentPool.js',
      'client/candidate/JobApplicationSnapshot_TalentPoolRequestBuilder.js',
      'client/candidate/JobApplicationSnapshot_TalentPoolcorp.js',
      'client/candidate/JobApplicationSnapshot_TalentPoolcorpRequestBuilder.js',
      'client/candidate/function-imports.js',
      'client/candidate/index.js',
    ];

    await Sdk.createFunction(ctx, {
      configurationSerialized: `# Add-on configuration settings
${Object.keys(ctx.body.configuration)
  .sort()
  .map((k) => `${k}=${ctx.body.configuration[k]}`)
  .join('\n')}

  # Storage configuration settings
${Object.keys(storageSpecification)
  .sort()
  .map((k) => `${k}=${storageSpecification[k]}`)
  .join('\n')}
`,
      nodejs: {
        files: getTemplateFiles(['index.js', 'package.json', 'success-factors.js', ...clientFiles]),
      },
      metadata: {
        fusebit: {
          editor: {
            navigationPanel: {
              hideFiles: ['index.js', ...clientFiles],
            },
          },
        },
        ...ctx.body.metadata,
      },
    });
  } catch (e) {
    // Could not create function, clean up storage
    await Sdk.deleteStorage(ctx, storageSpecification);
    throw e;
  }

  return { status: 200, body: { status: 200 } };
};
