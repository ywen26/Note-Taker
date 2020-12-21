// var path = require('path');
var fs = require('fs');

var data = fs.readFileSync("db/db.json");
var notesData = JSON.parse(data);

module.exports = function(app) {
    app.get("/api/notes", function(req, res) {
        res.json(notesData);
    });

    app.post("/api/notes", function(req, res) {
        var newNotes = req.body;
        newNotes.id = newNotes.title.replace(/\s+/g, "").toLowerCase();
        notesData.push(newNotes);
        fs.writeFileSync("db/db.json", JSON.stringify(notesData));
        return res.json(newNotes);
    });

    // app.get("/api/notes/:id", function(req, res) {
    //     var notesArray = [];
    //     notesArray = notesData;
    //     // var chosen = req.params.id;
    //     // res.json(notesData[chosen]);
    //     for (var i = 0; i < notesArray.length; i++) {
    //         res.json(notsArray[i]);
    //     }
    // });

    app.delete("/api/notes/:id", function(req, res) {
        var chosen = req.params.id;
        notesData.splice(chosen, 1);
        fs.writeFileSync("db/db.json", JSON.stringify(notesData));
        console.log(chosen + "is Deleted.");
        return res.json(chosen);
        
    });
}