var express 	= require("express");
var fs 			= require("fs");
var bodyParser  = require('body-parser');
var router 		= express.Router();


router.get("/", (req, res) => {
    var tipos = require('../models/getTipos.js')('', (err, tipo) => {
		if(err){
			console.log(err);
		}else{
			res.render("tipoFicheiros", {tipos: tipo})
		}
	})
})


module.exports = router;