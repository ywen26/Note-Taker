// Dependencies
var fs = require('fs');

// Read and parse notes data to objects from database file
var data = fs.readFileSync("db/db.json");
var notesData = JSON.parse(data);

module.exports = function(app) {
    // Read the db.json file and return all saved notes as JSON
    app.get("/api/notes", function(req, res) {
        res.json(notesData);
    });

    // Receive a new note to save on the request body
    app.post("/api/notes", function(req, res) {
        var newNotes = req.body;
        // Create unique id for each note to be retrieved
        newNotes.id = newNotes.title.replace(/\s+/g, "").toLowerCase();
        // Add the new note to db.json file
        notesData.push(newNotes);
        // Rewrite and return the new notes to client
        fs.writeFileSync("db/db.json", JSON.stringify(notesData));
        return res.json(newNotes);
    });

    // To delete the selected notes in server
    app.delete("/api/notes/:id", function(req, res) {
        var chosen = req.params.id;
        // Remove the note with the given id
        notesData = notesData.filter(({ id }) => id != chosen);
        // Rewrite the new notes to db.json
        fs.writeFileSync("db/db.json", JSON.stringify(notesData));
        return res.json(true);
    });
}