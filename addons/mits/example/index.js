const cxml = require('@wikipathways/cxml');
const schema = require('../script/xmlns/mits-property-marketing-ils');
const https = require('https');

const parser = new cxml.Parser();
https.get('https://raw.githubusercontent.com/utensils/mits/master/spec/fixtures/MITS_4.1_Sample.xml', async (res) => {
  const result = await parser.parse(res, schema.document);
  console.log(result.PhysicalProperty.Property[0].PropertyID.MarketingName);
});
