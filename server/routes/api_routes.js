const express = require("express");
AbilityLocation = require('../models/AbilityLocationModel.js');
LineupLocation = require('../models/LineupLocationModel.js');
Lineup = require('../models/LineupModel.js');
const router = express.Router();
const cors = require('cors');
const { exists } = require("../models/AbilityLocationModel.js");
const fs = require('fs');

router.use(cors());

// Get routes
router.get("/abilityLocations/:map", async (req, res) => {
	var query = {map: req.params.map}
	const returnValues = await AbilityLocation.find(query)
	res.send(returnValues)
});
router.get("/lineupLocations/:map", async (req, res) => {
	var query = {map: req.params.map}
	const returnValues = await LineupLocation.find(query)
	res.send(returnValues)
});
router.get("/lineups/:map", async (req, res) => {
	var query = {map: req.params.map}
	const returnValues = await Lineup.find(query)
	res.send(returnValues)
});

// Post Routes
router.post('/abilityLocations', async (req, res) => {
	if (!req.body.name || !req.body.ability || !req.body.positionx || !req.body.positiony || !req.body.map) {
		console.log("Missing Parameter\nname: " + req.body.name + '\nability: ' + req.body.ability +
		 "\npositionx: " + req.body.positionx + '\npositiony: ' + req.body.positiony +
		  '\nmap: ' + req.body.map);
	}
	const submission = new AbilityLocation({
		name: req.body.name,
		ability: req.body.ability,
		positionx: req.body.positionx,
		positiony: req.body.positiony,
		map: req.body.map
	})
	await submission.save((err, result) => {
		if (err) { 
			res.send({error: "AbilityLocation submission failed!", errorMessage: err});
		}
    	res.status(201).json(result);
	})
});

router.post('/lineupLocations', async (req, res) => {
	if (!req.body.name || !req.body.positionx || !req.body.positiony || !req.body.map) {
		console.log("Missing Parameter\nname: " + req.body.name + "\npositionx: " + req.body.positionx + 
		'\npositiony: ' + req.body.positiony + '\nmap: ' + req.body.map);
	}
	const submission = new LineupLocation({
		name: req.body.name,
		positionx: req.body.positionx,
		positiony: req.body.positiony,
		map: req.body.map
	})
	await submission.save((err, result) => {
		if (err) { 
			res.send({error: "LineupLocation submission failed!", errorMessage: err});
		}
    	res.status(201).json(result);
	})
});

router.post('/lineups', async (req, res) => {
	if (!req.body.map || !req.body.name || !req.body.ability || !req.body.side || !req.body.throwType || !req.body.abilityLocation || !req.body.lineupLocation) {
		throw "Missing Parameter";
	}
	const submission = new Lineup({
		name: req.body.name,
		ability: req.body.ability,
		map: req.body.map,
		side: req.body.side,
		throwType: req.body.throwType,
		abilityLocation: req.body.abilityLocation,
		lineupLocation: req.body.lineupLocation
	})
	await submission.save((err, result) => {
		if (err) { 
			res.send({error: "Lineup submission failed!", errorMessage: err});
		}
    	res.status(201).json(result);
	})
});

// Update Routes
router.patch("/abilityLocations/:id", async (req, res) => {
	try {
		const submission = await AbilityLocation.findOne({ _id: req.params.id })

		if (req.body.name) {
			submission.name = req.body.name
		}
		if (req.body.ability) {
			submission.ability = req.body.ability
		}
		if (req.body.positionx) {
			submission.positionx = req.body.positionx
		}
		if (req.body.positiony) {
			submission.positiony = req.body.positiony
		}
		await submission.save()
		res.status(201).json(submission);
	
	} catch {
		res.status(404)
		res.send({ error: "Ability Location doesn't exist!" })
	}
});

router.patch("/lineupLocations/:id", async (req, res) => {
	try {
		const submission = await LineupLocation.findOne({ _id: req.params.id })

		if (req.body.name) {
			submission.name = req.body.name
		}
		if (req.body.positionx) {
			submission.positionx = req.body.positionx
		}
		if (req.body.positiony) {
			submission.positiony = req.body.positiony
		}
		await submission.save();
		res.status(201).json(submission);
	
	} catch {
		res.status(404)
		res.send({ error: "Lineup Location doesn't exist!" })
	}
});

router.patch("/lineups/:id", async (req, res) => {
	try {
		const submission = await Lineup.findOne({ _id: req.params.id })

		if (req.body.name) {
			submission.name = req.body.name
		}
		if (req.body.side) {
			submission.side = req.body.side
		}
		if (req.body.throwType) {
			submission.throwType = req.body.throwType
		}
		await submission.save()
		res.status(201).json(submission);
	
	} catch {
		res.status(404)
		res.send({ error: "Lineup doesn't exist!" })
	}
});

// Delete Routes
router.delete("/abilityLocations/:id", async (req, res) => {
	try {
		await AbilityLocation.deleteOne({ _id: req.params.id })
		// Delete Image
		var path = "client/assets/img/uploads/" + req.params.id + ".png";
		if (!fs.existsSync(path)) {
			path = "client/assets/img/uploads/" + req.params.id + ".jpeg";
			if (!fs.existsSync(path)) {
				res.status(404).send({ error: "Unable to find and delete ability location image!" })
			}
		}
		fs.unlink(path, (err) => {
			if (err) {
				console.log(err);
				throw err;
			}
		});
		res.status(204).send({"success": "Deletion was successful!"})
	} catch(err) {
		console.log(err);
		res.status(500).send({ error: "Error occured while deleting ability location!" })
	};
});


router.delete("/lineupLocations/:id", async (req, res) => {
	try {
		await LineupLocation.deleteOne({ _id: req.params.id })
		// Delete Image
		var path = "client/assets/img/uploads/" + req.params.id + ".png";
		if (!fs.existsSync(path)) {
			path = "client/assets/img/uploads/" + req.params.id + ".jpeg";
			if (!fs.existsSync(path)) {
				res.status(404).send({ error: "Unable to find and delete lineup location image!" })
			}
		}
		fs.unlink(path, (err) => {
			if (err) {
				console.log(err);
				throw err;
			}
		});
		res.status(204).send({"success": "Deletion was successful!"})
	} catch(err) {
		console.log(err);
		res.status(500).send({ error: "Error occured while deleting lineup location!" })
	};
});

router.delete("/lineups/:id", async (req, res) => {
	try {
		await Lineup.deleteOne({ _id: req.params.id })
		// Delete Image
		var path = "client/assets/img/uploads/" + req.params.id + ".png";
		if (!fs.existsSync(path)) {
			path = "client/assets/img/uploads/" + req.params.id + ".jpeg";
			if (!fs.existsSync(path)) {
				res.status(404).send({ error: "Unable to find and delete lineup image!" })
			}
		}
		fs.unlink(path, (err) => {
			if (err) {
				console.log(err);
				throw err;
			}
		});
		res.status(204).send({"success": "Deletion was successful!"})
	} catch(err) {
		console.log(err);
		res.status(500).send({ error: "Error occured while deleting lineup!" })
	};
});


module.exports = router