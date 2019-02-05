const csv = require('fast-csv');
var path = require('path');
module.exports = {
    UploadQuestions(req, res) {
        console.log(req.body);
        const fileRows = [];

        // open uploaded file
        csv.fromPath(req.file.path)
            .on("data", function (data) {
                fileRows.push(data); // push each row
            })
            .on("end", function () {
                console.log(fileRows)
                fs.unlinkSync(req.file.path);   // remove temp file
                //process "fileRows" and respond
            })
    }
}