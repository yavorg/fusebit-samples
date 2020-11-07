
# Generate JSON schema
1. Run the HTTP server from `mits/script/index.js`
2. Pipe the output of http://localhost:8080/property to a local file `property.xml`
2. `npm install` in this folder
2. Call `java -jar node_modules/jsonix/lib/jsonix-schema-compiler-full.jar -d mappings -p MITSPropertyMarketing property.xml`