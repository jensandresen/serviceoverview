const express = require("express");
const bodyParser = require('body-parser');
const readyaml = require("read-yaml");
const app = express();

app.use(bodyParser.json());

app.get('/data', function (req, res) {
    readyaml("./fake_backend/services.yaml", (err, obj) => {
        if (err) {
            res.status(500).json(err);
            return;
        }

        res.status(200).json(obj);
    });
});

app.listen(3000, function () {
  console.log('Fake backend listening on port 3000!');
});