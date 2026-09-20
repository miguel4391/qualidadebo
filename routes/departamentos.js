var express 	= require("express");
var fs 			= require("fs");
var bodyParser  = require('body-parser');
var router 		= express.Router();


router.get("/", (req, res) => {
    var tipos = require('../models/getDepartamentos.js')('', (err, tipo) => {
		if(err){
			console.log(err);
		}else{
			res.render("tipoDepartamentos", {tipos: tipo})
		}
	})
})

router.post("/setDepartamento", (req, res) =>{
	let idDepart = 0;
	let nomeDepart = req.body.departamentoNovo;

	if(idDepart && nomeDepart){
		let DepartNew = require('../models/setDepart.js')(idDepart, nomeDepart, (err, DepartNew) => {
			if(err){
				console.log(err);
			}else{
				if(DepartNew){
					res.redirect('/');
				}else{
					res.locals.error = "Erro ao adicionar departamento";
				}
			}
		})
	}
})


module.exports = router;