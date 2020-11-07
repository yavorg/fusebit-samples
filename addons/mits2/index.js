const Jsonix = require('jsonix').Jsonix;
const MITSPropertyMarketing = require('./mappings/MITSPropertyMarketing').MITSPropertyMarketing;

var context = new Jsonix.Context([MITSPropertyMarketing]);
var unmarshaller = context.createUnmarshaller();

unmarshaller.unmarshalURL(
  'https://raw.githubusercontent.com/utensils/mits/master/spec/fixtures/MITS_4.1_Sample.xml',
  function (unmarshalled) {
    const original = JSON.parse(JSON.stringify(unmarshalled));
    console.log(unmarshalled.value.property[0].propertyID.marketingName);

    var marshaller = context.createMarshaller();

    var doc = marshaller.marshalDocument(original);
    console.log(doc.toString());
  }
);

const handcrafted = JSON.parse(`{
    "name":{
       "localPart":"PhysicalProperty"
    },
    "value":{
       "management":[
          {
             "propertyContacts":{
                "companies":[
                   {
                      "identification":[
                         {
                            "idValue":"guid: 1",
                            "idType":"Company"
                         }
                      ],
                      "companyName":"Roob Inc",
                      "address":[
                         {
                            "addressType":"other",
                            "description":"Address of Property Management Company",
                            "addressLine1":"",
                            "addressLine2":"",
                            "city":"",
                            "state":"",
                            "postalCode":"",
                            "country":""
                         }
                      ],
                      "webSite":"http://leannonlehner.info/rory_mueller",
                      "logo":""
                   }
                ]
             }
          }
       ],
       "property":[
          {
             "propertyID":{
                "marketingName":"Old Apartment"
             },
             "information":{
                "structureType":"Standard",
                "unitCount":1,
                "yearBuilt":{
                   "year":1970
                },
                "shortDescription":"Very crappy",
                "longDescription":"Very crappy and haunted",
                "rents":{
                   "standardRent":3400
                }
             },
             "floorplan":[
                {
                   "unitCount":1,
                   "room":[
                      {
                         "roomType":"Bedroom",
                         "count":4,
                         "comment":""
                      },
                      {
                         "roomType":"Bathroom",
                         "count":4,
                         "comment":""
                      }
                   ]
                }
             ]
          }
       ]
    }
 }`);
