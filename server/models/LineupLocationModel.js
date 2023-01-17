const mongoose = require('mongoose');
const validator = require('validator');
var uniqueValidator = require('mongoose-unique-validator');
MAPS = ['ascent', 'bind', 'breeze', 'fracture', 'haven', 'icebox', 'pearl', 'split']; 


const LineupLocation = mongoose.model("LineupLocation", {
    name: {
        type: String,
        required: true,
        unique: true
    },
    positionx: {
        type: Number,
        required: true,
        validate(value) {
            if (value < 0 || value > 500) {
                throw new Error("Lineup Location x position is an invalid number!")
            }
        }
    },
    positiony: {
        type: Number,
        required: true,
        validate(value) {
            if (value < 0 || value > 500) {
                throw new Error("Lineup Location y position is an invalid number!")
            }
        }
    },
    map: {
        type: String,
        required: true,
        validate(value) {
            if (!MAPS.includes(value.toLowerCase())) {
                throw new Error("Unknown map was submitted!")
            }
        }
    },

});
LineupLocation.schema.plugin(uniqueValidator);
module.exports = LineupLocation;
