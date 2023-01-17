var express = require("express");
const mongoose = require("mongoose");
const apiRoutes = require("./routes/api_routes.js");
const imageRoutes = require("./routes/image_upload_routes");
var bodyParser = require('body-parser');
//var multer = require('multer');
//var upload = multer();
const cors = require('cors');

// Create link to Angular build directory
// The `ng build` command will save the result
// under the `dist` folder.
var distDir = __dirname + "/dist/";
mongoose.connect('mongodb://127.0.0.1:27017/lineupWebsite', { useNewUrlParser: true }).then(() => {
    var app = express();
    app.use(cors());
    //app.use(upload.array()); 

    app.use(express.json());
    app.use(bodyParser.urlencoded({extended: true}));

    app.use(express.static(distDir));

    /*app.use((error, req, res, next) => {
        console.log('This is the rejected field ->', error.field);
      });*/

    app.use('/api', apiRoutes);
    app.use('/images', imageRoutes);

    var server = app.listen(process.env.PORT || 8080, function () {
        var port = server.address().port;
        console.log("App now running on port", port);
    });

});


