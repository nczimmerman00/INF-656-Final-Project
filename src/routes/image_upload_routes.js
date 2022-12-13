const express = require("express");
const router = express.Router();
const cors = require('cors');
var multer = require('multer');
var path = require('path');
const fs = require('fs');

router.use(cors());

// Image Post Routes
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null,'src/assets/img/uploads');
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  });
var upload = multer({storage});

router.post("/upload", upload.single('file'), (req, res) => {
    const file = req.file;
    if (file) {
        res.json(file);
    }
    else {
        throw new Error("File upload unsuccessful");
    }
})

module.exports = router