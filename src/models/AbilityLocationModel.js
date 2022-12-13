const mongoose = require('mongoose');
const validator = require('validator');
var uniqueValidator = require('mongoose-unique-validator');
//import { MAPS } from '../app/config/constants'
MAPS = ['ascent', 'bind', 'breeze', 'fracture', 'haven', 'icebox', 'pearl', 'split']; 

const AbilityLocation = mongoose.model("AbilityLocation", {
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    ability: {
        type: String,
        required: true,
        validate(value) {
            abilites = ['snake-bite', 'poison-orb', 'toxic-screen', 'vipers-pit'];
            if (!abilites.includes(value)) {
                throw new Error("Invalid abliity submitted!");
            }
        }
    },
    positionx: {
        type: Number,
        required: true,
        validate(value) {
            if (value < 0 || value > 500) {
                throw new Error("Ability Location x position is an invalid number!")
            }
        }
    },
    positiony: {
        type: Number,
        required: true,
        validate(value) {
            if (value < 0 || value > 500) {
                throw new Error("Ability Location y position is an invalid number!")
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
    }
});

AbilityLocation.schema.plugin(uniqueValidator);
module.exports = AbilityLocation;
