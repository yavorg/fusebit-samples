const app = require('./app');

app.set('view engine', 'ejs');
app.set('views', __dirname);

// This programming model exposes raw Node.js HTTP request/response mock
module.exports = (ctx, req, res) => {
    // Delegate processing to Express
    req.fusebit = ctx;
    return app.handle(req, res);
}