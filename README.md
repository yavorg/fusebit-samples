# Sample Fusebit Functions

## Express

[Code](express)

A Fusebit function that exposes an Express-based programming model and supports returning a variety of content types (HTML, SVG, PNG etc.). 

```
fuse function edit --template /fusebit/samples/express express
```

## Configuration

[Code](configuration)

A Fusebit function template that demonstrates how to scaffold configuration settings for the function. The [.env](configuration/.env) file of the template specifies placeholder values of the configuration settings required by the function. Developer creating a function from the template needs to replace these placeholder values with actual configuration settings. 

```
fuse function edit --template /fusebit/samples/configuration configuration
```
