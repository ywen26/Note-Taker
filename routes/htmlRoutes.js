// Dependencies
var path = require('path');

// HTML GET requests
module.exports = function(app) {
    // Basic route that sends the user with notes editing page
    app.get("/notes", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/notes.html"));
    });

    // Basic route that sends the user with start page
    app.get("*", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/index.html"));
    })
}