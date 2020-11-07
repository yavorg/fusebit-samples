# SDK generation script

Running this generates the 'xmlns' directory, which contains the "SDK" to parse documents that adhere to MITS Property-Marketing/ILS4.1 schema
* XSD https://www.retall.org/wp-content/uploads/2019/04/Property-Marketing-ILS-4.1-Schemaxsd.xml
* Documentation https://www.retall.org/wp-content/uploads/2019/04/Property-Marketing-ILS-4.1-Supplemental.html

How to run this:
1. Run `npm install cxsd` in this folder
2. Run `node index.js`
3. Run `npm run cxsd http://localhost:8080/property`

You should see a `xmlns` directory that basically contains the "SDK" used by the actual example.

The reason we need this script
* The official schema has some problems that we need to clean up (happens in `index.js`)
* https://www.npmjs.com/package/@wikipathways/cxsd for some bizarre reason doesn't take file input, only URL input. So `index.js` is a HTTP server that does the cleanup and proxies the file.