// var noteData = require("../db/db.json");
var path = require('path');
var fs = require('fs');

var data = fs.readFileSync("db/db.json");
var notesData = JSON.parse(data);

module.exports = function(app) {
    app.get("/api/notes", function(req, res) {
        res.json(notesData);
    });

    app.post("/api/notes", function(req, res) {
        notesData.push(req.body);
        fs.writeFileSync("db/db.json", JSON.stringify(notesData));
        return res.json(req.body);
    });

    // app.delete("/api/notes/:id", function(req, res) {

    // });

}