const mongoose = require('mongoose');
const validator = require('validator');
var uniqueValidator = require('mongoose-unique-validator');
MAPS = ['ascent', 'bind', 'breeze', 'fracture', 'haven', 'icebox', 'pearl', 'split']; 

const Lineup = mongoose.model("Lineup", {
    name: {
        type: String,
        required: true,
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
    map: {
        type: String,
        required: true,
        validate(value) {
            if (!MAPS.includes(value)) {
                throw new Error("Unknown map was submitted! (make sure map name is lowercase!)")
            }
        }
    },
    side: {
        type: String,
        required: true,
        validate(value) {
            if (value === 'attack' && value === 'defense') {
                throw new Error("Invalid side submitted! (enter 'attack' or 'defense')");
            }
        }
    },
    throwType: {
        type: String,
        default: "Standing throw"
    },
    abilityLocation: {
        type: String,
        required: true,
    },
    lineupLocation: {
        type: String,
        required: true,
    }
});
Lineup.schema.plugin(uniqueValidator);
module.exports = Lineup;
