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
        fs.writeFile("db/db.json", JSON.stringify(notesData));
        res.json(noteData);
    });

    // app.delete("/api/notes/:id", function(req, res) {

    // });

}