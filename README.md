# Sample Fusebit Functions

## Express

[Code](express)

A Fusebit function that exposes an Express-based programming model and supports returning a variety of content types (HTML, SVG, PNG etc.). 

```
fuse function edit --template fusebit/samples/express express
```

## Configuration

[Code](configuration)

A Fusebit function template that demonstrates how to scaffold configuration settings for the function. The [.env](configuration/.env) file of the template specifies placeholder values of the configuration settings required by the function. Developer creating a function from the template needs to replace these placeholder values with actual configuration settings. 

```
fuse function edit --template fusebit/samples/configuration configuration
```

## Domain Specific Language (DSL)

[Code](dsl)

A Fusebit function that presents the end user with a custom JavaScript programming model. Key elements of this template: 

* The [index.js](dsl/index.js) entry point implements a programming model tranformation logic that delegates the implementation to the [onPayment.js](dsl/onPayment.js) handler exposing a domain-speific programming model to the end user.  
* The details of the transformation logic are hidden from the end user of the Fusebit editor using the *hideFiles* property of [fusebit.json](dsl/fusebit.json). In addition, the CRON settings are hidden in the editor, since they are not relevant to the use case.  
* The [fusebit.json](dsl/fusebit.json) specifies a custom *runner* property that invokes the function with HTTP POST and a payload allowing for quick ad-hoc testing of the implementation.  

```
fuse function edit --template fusebit/samples/dsl dsl
```
