const http = require('http');
const readline = require('readline');

http
  .createServer(function (req, res) {
    if (req.url === '/property') {
      http.get(
        'http://www.retall.org/wp-content/uploads/2019/04/Property-Marketing-ILS-4.1-Schemaxsd.xml',
        (innerRes) => {
          const file = readline.createInterface({
            input: innerRes,
            output: process.stdout,
            terminal: false,
          });
          file.on('line', (line) => {
            // FIX UP INCOMING SCHEMA
            let l = line;

            // Add this back if using the cxml stuff, not needed when using jsonix stuff
            // l = l.replace(/<xs:schema/gi, '<xs:schema targetNamespace="urn:mits-property-marketing-ils"');

            l = l.replace(
              /<xs:include schemaLocation="CoreData4_0.xsd"\/>/gi,
              '<xs:include schemaLocation="https://www.retall.org/wp-content/uploads/2019/04/Core-Data-4.0.xml"/>'
            );
            l = l.replace(
              /<xs:include schemaLocation="http:\/\/www.nmhc.info\/MITS\/MITSCustomExtension.xsd"\/>/gi,
              ''
            );
            l = l.replace(/<xs:element ref="CustomRecords" minOccurs="0" maxOccurs="unbounded"\/>/gi, '');

            res.write(l);
          });
          file.on('close', () => {
            res.end();
          });
        }
      );
    }
  })
  .listen(8080);
