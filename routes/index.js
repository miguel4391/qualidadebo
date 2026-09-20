var express 	= require("express");
var fs 			= require("fs");
var bodyParser  = require('body-parser');
var flash		= require("connect-flash");
const isLogged 	= require("../models/loggin.js");
const session = require("express-session");
const ExcelJS = require('exceljs');
var router 		= express.Router();


router.get("/", isLoggedIn, (req, res) => {
	if(req.session.access=='rh') return res.redirect("https://qualidadebo.uatlantica.pt/fichaDocente");

	var tipos = require('../models/getTipos.js')('', (err, tipo) => {
		if(err){
			console.log(err);
		}else{
			var depart = require('../models/getDepart.js')('', (err, dep) =>{
				if(err){
					console.log(err)
				}else{
					let curso = require('../models/getCursoSigla.js')('A', (err, curso) =>{
						if(err){
							console.log(err)
						}else{
							console.log('acessos->', req.session.access)
							res.render("landing", {tipos: tipo, depart:dep, curso, curso, acessos:req.session.access})
						}
					})
					
				}	
			})
		}
	})
});

router.get("/essatla", isLoggedIn, (req, res) => {
	var tipos = require('../models/getTipos.js')('', (err, tipo) => {
		if(err){
			console.log(err);
		}else{
			var depart = require('../models/getDepartEssatla.js')('', (err, dep) =>{
				if(err){
					console.log(err)
				}else{
					let curso = require('../models/getCursoSigla.js')('E', (err, curso) =>{
						if(err){
							console.log(err)
						}else{
							res.render("landingEssatla", {tipos: tipo, depart:dep, curso, curso})
						}
					})
				}	
			})
		}
	})
});

router.get("/editFicAtla", isLoggedIn, (req, res) => {
	var tipos = require('../models/getTipos.js')('', (err, tipo) => {
		if(err){
			console.log(err);
		}else{		
			var depart = require('../models/getDepart.js')('', (errd, dep) => {
				if(errd){
					console.log(errd);
				}else{
					let curso = require('../models/getCursoSigla.js')("A", (err, curso) =>{
						if(err){
							console.log(err)
						}else{
							res.render("editFicAtla", {tipos:tipo, depart:dep, curso, curso});
						}
					})
					
				}
			})
		}
	})
});

router.get("/editFicEssatla", isLoggedIn, (req, res) => {
	var tipos = require('../models/getTipos.js')('', (err, tipo) => {
		if(err){
			console.log(err);
		}else{		
			var depart = require('../models/getDepartEssatla.js')('', (errd, dep) => {
				if(errd){
					console.log(errd);
				}else{
					let curso = require('../models/getCursoSigla.js')("E", (err, curso) =>{
						if(err){
							console.log(err)
						}else{
							res.render("editFicEssatla", {tipos:tipo, depart:dep, curso, curso});
						}
					})
				}
			})
		}
	})
});

router.get("/getFicheirosByTypeAtla/:tipo", isLoggedIn, (req, res) =>{
	let tipo = req.params.tipo;
	if(tipo === "Políticas") tipo = "Politica";
	var files = require('../models/getFilesByType')(tipo, "atlantica", (err, files) =>{
		if(err){
			console.log(err)
		}else{
			res.send(files);
		}
	})
})

router.get("/getFicheirosByTypeEssatla/:tipo", isLoggedIn, (req, res) =>{
	let tipo = req.params.tipo;
	if(tipo === "Políticas") tipo = "Politica";
	var files = require('../models/getFilesByType')(tipo, "essatla", (err, files) =>{
		if(err){
			console.log(err)
		}else{
			res.send(files);
		}
	})
})

router.get("/getFicheirosById/:id", isLoggedIn, (req, res) =>{
	let id = req.params.id;
	var file = require("../models/getFileById")(id, (err, file) =>{
		if(err){
			console.log(err);
		}else{
			res.send(file);
		}
	})
})

router.get("/enable/:id", (req, res) => {
	var enFile = require("../models/enFile.js") (req.params.id , (err, enabled) => {
		if(err){
			console.log(err);
		}else{
			var tipos = require('../models/getTipos.js')('', (err, tipo) => {
				if(err){
					console.log(err);
				}else{
					var depart = require('../models/getDepart.js')('', (err, dep) =>{
						if(err){
							console.log(err)
						}else{
							let curso = require('../models/getCursoSigla.js')('A', (err, curso) =>{
								if(err){
									console.log(err)
								}else{
									res.render("landing", {tipos: tipo, depart:dep, curso, curso})
								}
							})
						}	
					})
				}
			})
		}
	})
})

router.get("/disable/:id", (req, res) => {
	var enFile = require("../models/disFile.js") (req.params.id , (err, disabled) => {
		if(err){
			console.log(err);
		}else{
			var tipos = require('../models/getTipos.js')('', (err, tipo) => {
				if(err){
					console.log(err);
				}else{
					var depart = require('../models/getDepart.js')('', (err, dep) =>{
						if(err){
							console.log(err)
						}else{
							let curso = require('../models/getCursoSigla.js')('A', (err, curso) =>{
								if(err){
									console.log(err)
								}else{
									res.render("landing", {tipos: tipo, depart:dep, curso, curso})
								}
							})
						}	
					})
				}
			})
		}
	})
})

router.get("/delFucs", isLoggedIn, (req, res) => {
	let cursos = require("../models/cursos.js")("admin", (err, cursos) =>{
		if(err)
			console.log(err);
		else
			res.render("delFucs", {cursos:cursos})
	})
})

router.get("/getUC/:ce", isLoggedIn, (req, res) =>{
	let lstUcs = require("../models/getUCbyCE.js")(req.params.ce, (err,lstUcs) =>{
		if(err)
			console.log(err);
		else
		res.send(lstUcs);
	})
})

router.get("/getFuc/:id", isLoggedIn, (req, res) => {
	console.log("Olá")
	let fuc = require("../models/getFucbyId.js")(req.params.id, (err, fuc) =>{
		if(err)
			console.log(err);
		else{
			console.log(fuc);
			res.send(fuc);
		}
			
	})
})
router.get("/relatorios", isLoggedIn, (req, res) => {
	res.render("relatorios");
})


router.get('/exportarDocentes', isLoggedIn, async (req, res) => {
	var db = require('../models/db.js');
    try {

        const [rows] = await db.promise().query(`
            SELECT 
                nomeDoc,
                catDoc,
                grauDocExt,
                vinculoIes,
                especialDoc,
                percIes,
                orcid,
                CiencVitae
            FROM Qualidade.fichaDoc_slt
            WHERE vinculoIes IN ('A', 'E')
            ORDER BY nomeDoc
        `);

        const workbook = new ExcelJS.Workbook();

        const wsAtlantica = workbook.addWorksheet('Atlantica');
        const wsEssatla = workbook.addWorksheet('Essatla');


        // =========================
        // ATLANTICA
        // =========================

        wsAtlantica.columns = [
            { header: 'Nome', key: 'nomeDoc', width: 35 },
            { header: 'Categoria', key: 'catDoc', width: 20 },
            { header: 'Grau Docente', key: 'grauDocExt', width: 20 },
            { header: 'Vínculo IES', key: 'vinculoIes', width: 15 },
            { header: '% IES', key: 'percIes', width: 12 },
            { header: 'ORCID', key: 'orcid', width: 25 },
            { header: 'Ciência Vitae', key: 'CiencVitae', width: 30 }
        ];


        // =========================
        // ESSATLA
        // =========================

        wsEssatla.columns = [
            { header: 'Nome', key: 'nomeDoc', width: 35 },
            { header: 'Categoria', key: 'catDoc', width: 20 },
            { header: 'Grau Docente', key: 'grauDocExt', width: 20 },
            { header: 'Vínculo IES', key: 'vinculoIes', width: 15 },
            { header: 'Especialista', key: 'especialDoc', width: 15 },
            { header: '% IES', key: 'percIes', width: 12 },
            { header: 'ORCID', key: 'orcid', width: 25 },
            { header: 'Ciência Vitae', key: 'CiencVitae', width: 30 }
        ];


        // =========================
        // DADOS
        // =========================

        rows.forEach(doc => {

            if (doc.vinculoIes === 'A') {

                wsAtlantica.addRow({
                    nomeDoc: doc.nomeDoc,
                    catDoc: doc.catDoc,
                    grauDocExt: doc.grauDocExt,
                    vinculoIes: doc.vinculoIes,
                    percIes: doc.percIes,
                    orcid: doc.orcid,
                    CiencVitae: doc.CiencVitae
                });

            } else if (doc.vinculoIes === 'E') {

                wsEssatla.addRow({
                    nomeDoc: doc.nomeDoc,
                    catDoc: doc.catDoc,
                    grauDocExt: doc.grauDocExt,
                    vinculoIes: doc.vinculoIes,
                    especialDoc: Number(doc.especialDoc) === 1
                        ? 'Sim'
                        : 'Não',
                    percIes: doc.percIes,
                    orcid: doc.orcid,
                    CiencVitae: doc.CiencVitae
                });

            }

        });


        // =========================
        // FORMATAÇÃO
        // =========================

        [wsAtlantica, wsEssatla].forEach(ws => {

            const header = ws.getRow(1);

            header.font = {
                bold: true
            };

            header.alignment = {
                vertical: 'middle',
                horizontal: 'center'
            };

            ws.views = [
                {
                    state: 'frozen',
                    ySplit: 1
                }
            ];

            ws.autoFilter = {
                from: {
                    row: 1,
                    column: 1
                },
                to: {
                    row: 1,
                    column: ws.columnCount
                }
            };

        });


        // =========================
        // GERAR EXCEL EM MEMÓRIA
        // =========================

        const buffer = await workbook.xlsx.writeBuffer();


        // =========================
        // DOWNLOAD
        // =========================

        res.status(200);

        res.setHeader(
            'Content-Type',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        );

        res.setHeader(
            'Content-Disposition',
            'attachment; filename="Docentes.xlsx"'
        );

        res.setHeader(
            'Content-Length',
            buffer.length
        );

        res.end(buffer);

    } catch (error) {

        console.error('Erro ao gerar Excel:', error);

        if (!res.headersSent) {
            res.status(500).send('Erro ao gerar o ficheiro Excel.');
        }

    }

});



router.get('/exportarFichaDocentesCompleta', isLoggedIn, async (req, res) => {
    const db = require('../models/db.js');
    try {

        const [rows] = await db.promise().query(`
            SELECT 
                idfichaDoc,
                auth,
                nomeDoc,
                emailDoc,
                vinculoIes,
                anoVinculo,
                tipoDoc,
                tipoDoc2,
                nomeIesProtoc,
                catDoc,
                grauDoc,
                grauDocExt,
                areaCientDoc,
                areCient2Doc,
                anoGrauDoc,
                iesGrauDoc,
                grauEstrangDoc,
                grauNivelDoc,
                dataRegEst,
                equivGraduEst,
                especialDoc,
                nomeTitEspec,
                nomeTitEspecEng,
                areaCientEsp,
                areaCient2Esp,
                anoTitEspec,
                iesTitEspec,
                iesTitEspecEng,
                percIes,
                CiencVitae,
                orcid,
                doutorando,
                anoDoutorando,
                ativo,
                nrMec,
                AreaGest
            FROM Qualidade.fichaDoc_slt
            WHERE vinculoIes IN ('A', 'E')
            ORDER BY nomeDoc
        `);

        const workbook = new ExcelJS.Workbook();
        
        // Criar apenas uma única sheet com todos os docentes
        const wsDocentes = workbook.addWorksheet('Docentes');

        // Cabeçalhos idênticos à imagem fornecida (ordem e nomes exatos)
        wsDocentes.columns = [
            { header: 'idfichaDoc', key: 'idfichaDoc', width: 12 },
            { header: 'auth', key: 'auth', width: 10 },
            { header: 'nomeDoc', key: 'nomeDoc', width: 35 },
            { header: 'emailDoc', key: 'emailDoc', width: 30 },
            { header: 'vinculoIes', key: 'vinculoIes', width: 12 },
            { header: 'anoVinculo', key: 'anoVinculo', width: 12 },
            { header: 'tipoDoc', key: 'tipoDoc', width: 15 },
            { header: 'tipoDoc2', key: 'tipoDoc2', width: 15 },
            { header: 'nomeIesProtoc', key: 'nomeIesProtoc', width: 25 },
            { header: 'catDoc', key: 'catDoc', width: 20 },
            { header: 'grauDoc', key: 'grauDoc', width: 12 },
            { header: 'grauDocExt', key: 'grauDocExt', width: 20 },
            { header: 'areaCientDoc', key: 'areaCientDoc', width: 25 },
            { header: 'areCient2Doc', key: 'areCient2Doc', width: 25 },
            { header: 'anoGrauDoc', key: 'anoGrauDoc', width: 12 },
            { header: 'iesGrauDoc', key: 'iesGrauDoc', width: 25 },
            { header: 'grauEstrangDoc', key: 'grauEstrangDoc', width: 15 },
            { header: 'grauNivelDoc', key: 'grauNivelDoc', width: 15 },
            { header: 'dataRegEst', key: 'dataRegEst', width: 15 },
            { header: 'equivGraduEst', key: 'equivGraduEst', width: 20 },
            { header: 'especialDoc', key: 'especialDoc', width: 12 },
            { header: 'nomeTitEspec', key: 'nomeTitEspec', width: 25 },
            { header: 'nomeTitEspecEng', key: 'nomeTitEspecEng', width: 25 },
            { header: 'areaCientEsp', key: 'areaCientEsp', width: 25 },
            { header: 'areaCient2Esp', key: 'areaCient2Esp', width: 25 },
            { header: 'anoTitEspec', key: 'anoTitEspec', width: 12 },
            { header: 'iesTitEspec', key: 'iesTitEspec', width: 25 },
            { header: 'iesTitEspecEng', key: 'iesTitEspecEng', width: 25 },
            { header: 'percIes', key: 'percIes', width: 12 },
            { header: 'CiencVitae', key: 'CiencVitae', width: 30 },
            { header: 'orcid', key: 'orcid', width: 25 },
            { header: 'doutorando', key: 'doutorando', width: 12 },
            { header: 'anoDoutorando', key: 'anoDoutorando', width: 12 },
            { header: 'ativo', key: 'ativo', width: 10 },
            { header: 'nrMec', key: 'nrMec', width: 15 },
            { header: 'AreaGest', key: 'AreaGest', width: 30 }
        ];

        // Povoamento dos Dados sem separação por vínculo
        rows.forEach(doc => {
            let areasGestTexto = '';
            if (doc.AreaGest) {
                try {
                    const parsed = typeof doc.AreaGest === 'string' ? JSON.parse(doc.AreaGest) : doc.AreaGest;
                    if (Array.isArray(parsed)) {
                        areasGestTexto = parsed.filter(Boolean).join(', ');
                    }
                } catch (e) {
                    areasGestTexto = String(doc.AreaGest);
                }
            }

            wsDocentes.addRow({
                idfichaDoc: doc.idfichaDoc,
                auth: doc.auth,
                nomeDoc: doc.nomeDoc,
                emailDoc: doc.emailDoc,
                vinculoIes: doc.vinculoIes === 'A' ? 'Atlântica' : doc.vinculoIes === 'E' ? 'Essatla' : '',
                anoVinculo: doc.anoVinculo,
                tipoDoc: doc.tipoDoc,
                tipoDoc2: doc.tipoDoc2,
                nomeIesProtoc: doc.nomeIesProtoc,
                catDoc: doc.catDoc,
                grauDoc: doc.grauDoc,
                grauDocExt: doc.grauDocExt,
                areaCientDoc: doc.areaCientDoc,
                areCient2Doc: doc.areCient2Doc,
                anoGrauDoc: doc.anoGrauDoc,
                iesGrauDoc: doc.iesGrauDoc,
                grauEstrangDoc: doc.grauEstrangDoc,
                grauNivelDoc: doc.grauNivelDoc,
                dataRegEst: doc.dataRegEst ? new Date(doc.dataRegEst).toLocaleDateString('pt-PT') : '',
                equivGraduEst: doc.equivGraduEst,
                especialDoc: doc.especialDoc,
                nomeTitEspec: doc.nomeTitEspec,
                nomeTitEspecEng: doc.nomeTitEspecEng,
                areaCientEsp: doc.areaCientEsp,
                areaCient2Esp: doc.areaCient2Esp,
                anoTitEspec: doc.anoTitEspec,
                iesTitEspec: doc.iesTitEspec,
                iesTitEspecEng: doc.iesTitEspecEng,
                percIes: doc.percIes,
                CiencVitae: doc.CiencVitae,
                orcid: doc.orcid,
                doutorando: doc.doutorando,
                anoDoutorando: doc.anoDoutorando,
                ativo: Number(doc.ativo) === 1 ? 'Sim' : Number(doc.ativo) === 0 ? 'Não' : '',
                nrMec: doc.nrMec,
                AreaGest: areasGestTexto
            });
        });

        // Formatação da Folha
        const header = wsDocentes.getRow(1);
        header.font = { bold: true };
        header.alignment = { vertical: 'middle', horizontal: 'center' };

        wsDocentes.views = [{ state: 'frozen', ySplit: 1 }];

        wsDocentes.autoFilter = {
            from: { row: 1, column: 1 },
            to: { row: 1, column: wsDocentes.columnCount }
        };

        // Resposta HTTP
        const buffer = await workbook.xlsx.writeBuffer();

        res.status(200);
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename="FichaDocentes_Completa.xlsx"');
        res.setHeader('Content-Length', buffer.length);

        res.end(buffer);

    } catch (error) {
        console.error('Erro ao gerar Excel:', error);
        if (!res.headersSent) {
            res.status(500).send('Erro ao gerar o ficheiro Excel.');
        }
    }
});


router.get("/login", function(req, res){
	res.render("login");
});


router.post("/login", (req, res) =>{
	let user = req.body.username;
	let pass = req.body.password;
	
	if(user && pass){
		let isLogged = require('../models/loggin.js')(user, pass, (err, isLogged) => {
			if(err){
				console.log(err);
			}else{
				if(isLogged && isLogged != ''){
					req.session.user = user;
					req.session.access = isLogged;
					res.redirect('/');
				}else{
					res.locals.error = "Erro de Login";
					res.render("login");
				}
			}
		})
	}
})

router.get("/regentes", (req, res) =>{
	let cursos = require('../models/cursoCoord.js')(null, (err, cursos)=>{
		if(err){
			console.log(err);
		}else{
			res.render("regentes", {cursos:cursos});
		}
	})
})

router.get("/regentes/:ce", (req, res) =>{

	let curso = require('../models/getCurso.js')(req.params.ce, (err, curso) =>{
		if(err){
			console.log(err);
		}else{
			let docente = require('../models/getDocente.js')(curso[0].idCurso,(err, docente) =>{
				if(err){
					console.log(err);
				}else{
					res.render("regentesCurso", {curso:curso, docentes:docente})
				}
			})
		}
	})	
})

router.get("/logout", (req, res) => {
	// Destroy session
	req.session.destroy((err) => {
		if (err) {
			console.error(err);
			res.status(500).send('Error logging out');
		} else {
			res.render("login");
		}
	});
})


router.get("/fichaDocente", isLoggedIn, (req, res) => {
	let ficha = require('../models/getFichaDoc.js')((err, docentes) =>{
		if(err){
			console.log(err);
		}else{
			let catDocente = require("../models/getCatDocente.js")((err, catDocente) =>{
				if(err){
					console.log(err);
				}else{
					let grauDocente = require("../models/getGrauDocente.js")((err, grauDocente) =>{
						if(err){
							console.log(err);
						}else{
							let tipoDocente = require("../models/getTipoDocente.js")((err, tipoDocente) =>{
								if(err){
									console.log(err);
								}else{
									let OrgGest = require("../models/getOrgaosGestao.js")((err, orgGest) =>{
										if(err){
											console.log(err);
										}else{
											res.render("fichaDocente", {docentes:docentes, catDocente:catDocente, grauDocente:grauDocente, tipoDocente:tipoDocente, orgGest:orgGest});
										}
									})
								}
							})
						}
					});
				}
			});
		}
	})
	
})



router.get("/visFichaDoc/:id", isLoggedIn, (req, res) => {
	let user = req.params.id;
	let tipoDocente = require("../models/getTipoDocente.js")((errp, tipoDocente) =>{
		if(errp){
			console.log(errp);
		}else{
			let catDocente = require("../models/getCatDocente.js")((err, catDocente) =>{
				if(err){
					console.log(err);
				}else{
					let grauDocente = require("../models/getGrauDocente.js")((err, grauDocente) =>{
						if(err){
							console.log(err);
						}else{
							let areaDoc = require("../models/getAreaDocente.js")((err, areaDoc) =>{
								if(err){
									console.log(err);
								}else{
									let ficha = require("../models/getFichaDocenteBo.js")(user, (err, ficha) => {
										if(err){
											console.log(err);
										}else{
											let forma = require("../models/getFormaDoc.js")(ficha[0].idfichaDoc, (err, forma) =>{
												if(err){
													console.log(err);
												}else{
													let pedag = require("../models/getFormPedag.js")(ficha[0].idfichaDoc, (err, pedag) =>{
														if(err){
															console.log(err);
														}else{
															let invest = require("../models/getInvestigacao")(ficha[0].idfichaDoc, (err, invest) =>{
																if(err){
																	console.log(err);
																}else{
																	let OrgGest = require("../models/getOrgaosGestao.js")((err, orgGest) =>{
																		if(err){
																			console.log(err);
																		}else{
																			res.render("fichadocente", {user:user, tipoDocente:tipoDocente, catDocente:catDocente, grauDocente:grauDocente, areaDoc:areaDoc, ficha:ficha, forma:forma,pedag:pedag,invest:invest, orgGest:orgGest})
																		}
																	})
																}
															})
														}
													})
												}
											})																
										}
									})						
								}
							})
						}
					})
				}
			})
		}
	})
})

router.get("/getTipoDoc/docTipo", isLoggedIn, (req, res) =>{
	let lstUcs = require("../models/getOpcaoCarreira.js")((err,lstUcs) =>{
		if(err)
			console.log(err);
		else
			res.send(lstUcs);
	})
})

router.get("/getTipoDoc/out", isLoggedIn, (req, res) =>{
	let lstUcs = require("../models/getOpcaoCarreiraOut.js")((err,lstUcs) =>{
		if(err)
			console.log(err);
		else
			res.send(lstUcs);
	})
})

router.get("/getArea2/:cod", isLoggedIn,(req, res) =>{
	let areaDoc = require("../models/getAreaDocente2.js")(req.params.cod, (err, areaDoc) =>{
		if(err)
			console.log(err);
		else
			res.send(areaDoc);
	})
})


router.get("/getFichaDoc/:id", (req, res) =>{
	let docente = require("../models/getFichaDocByID.js")(req.params.id, (err,ficha) =>{
		if(err)
			console.log(err);
		else
			res.send(ficha);
	})
})

router.get("/getFormaDoc/:id", (req, res) =>{
	let docente = require("../models/getFormaDocByID.js")(req.params.id, (err,ficha) =>{
		if(err)
			console.log(err);
		else
			res.send(ficha);
	})
})

router.get("/getFormaPedagDoc/:id", (req, res) =>{
	let docente = require("../models/getFormaPedagDocByID.js")(req.params.id, (err,ficha) =>{
		if(err)
			console.log(err);
		else
			res.send(ficha);
	})
})

router.get("/getInvestigacao/:id", (req, res) =>{
	let docente = require("../models/getInvestigacaoByID.js")(req.params.id, (err,ficha) =>{
		if(err)
			console.log(err);
		else
			res.send(ficha);
	})
})

router.post('/setFichaDoc', (req, res) => {
	let id = req.body.idFicha;
	let nomeDoc = req.body.tbNome;
	let emailDoc = req.body.tbEmail;
	if (emailDoc.includes('@')) {
		emailDoc = emailDoc.split('@')[0];
	}
	let catDoc = req.body.cbCatDocente;
	let grauDoc = req.body.cbGrauDocente;
	let iesDoc = req.body.cbVinvulo;
	let tipoDoc = req.body.cbTipo;
	let tipoDoc2 = req.body.cbTipo2;
	let iesProtoc = req.body.nomeIES;
	let orgGestSelected = req.body.areas;
	let docAtivo = req.body.ativo;
	let anoVinculo = req.body.anoVinculo;
	let nrMec = req.body.tbNrMec ? req.body.tbNrMec : 0;
	let perDedic = req.body.tbPercDedic;

	if(docAtivo == "on") docAtivo = 1
	else docAtivo = 0;

	console.log("ativo" , docAtivo)
	if(orgGestSelected instanceof Array){
		orgGestSelected.forEach(area =>{
			require('../models/insertAreaGest.js')(id, area);
		})
	}
	else{
		require('../models/insertAreaGest.js')(id, orgGestSelected);
	}
	
	
	
	let ficha = require('../models/setFichaDoc.js')(id, nomeDoc, emailDoc, catDoc, grauDoc, iesDoc, anoVinculo, tipoDoc, tipoDoc2, iesProtoc, docAtivo, nrMec,perDedic,(err, ficha) => {
		
		if(err){
			console.log(err);

			let mensagem = "Erro na base de dados";

			if(err.code === 'ER_DUP_ENTRY'){
				mensagem = "Utilizador já existe na IES";
			}
			let catDocente = require("../models/getCatDocente.js")((err, catDocente) =>{
				if(err){
					console.log(err);
				}else{
					let grauDocente = require("../models/getGrauDocente.js")((err, grauDocente) =>{
						if(err){
							console.log(err);
						}else{
							let ficha = require('../models/getFichaDoc.js')((err, docentes) =>{
								if(err){
									console.log(err);
								}else{
									let tipoDocente = require("../models/getTipoDocente.js")((err, tipoDocente) =>{
										if(err){
											console.log(err);
										}else{
											let OrgGest = require("../models/getOrgaosGestao.js")((err, orgGest) =>{
												if(err){
													console.log(err);
												}else{
													return res.render("fichaDocente", {docentes:docentes, catDocente:catDocente, grauDocente:grauDocente, tipoDocente:tipoDocente, orgGest:orgGest, error: mensagem});
												}
											})
										}
									})
								}
							});
						}
					});
				}
			});
			
		}else{
			let catDocente = require("../models/getCatDocente.js")((err, catDocente) =>{
				if(err){
					console.log(err);
				}else{
					let grauDocente = require("../models/getGrauDocente.js")((err, grauDocente) =>{
						if(err){
							console.log(err);
						}else{
							let ficha = require('../models/getFichaDoc.js')((err, docentes) =>{
								if(err){
									console.log(err);
								}else{
									let tipoDocente = require("../models/getTipoDocente.js")((err, tipoDocente) =>{
										if(err){
											console.log(err);
										}else{
											let OrgGest = require("../models/getOrgaosGestao.js")((err, orgGest) =>{
												if(err){
													console.log(err);
												}else{
													res.render("fichaDocente", {docentes:docentes, catDocente:catDocente, grauDocente:grauDocente, tipoDocente:tipoDocente, orgGest:orgGest});
												}
											})
										}
									})
								}
							});
						}
					});
				}
			});
		}
	})
})

router.post("/setFichaDocCompleto", isLoggedIn, (req, res) =>{
	let id = req.body.idDoc;
	let auth = req.body.autoriza ? 1 : 0 ;
	let nomeDoc = req.body.tbNome;
	let emailDoc = req.body.tbEmail;
	if (emailDoc.includes('@')) {
		emailDoc = emailDoc.split('@')[0];
	}
	let vinculoIes = req.body.cbVinvulo;
	let anoVinc = req.body.tbAnoVinc ? req.body.tbAnoVinc : 0;
	let tipoDoc = req.body.cbTipo;
	let tipoDoc2 = req.body.cbTipo2;
	let catDoc = req.body.cbCatDocente;
	let grauDoc = req.body.cbGrauDocente;
	let areaCientDoc = req.body.cbAreaDocente;
	let areCient2Doc = req.body.cbAreaDocente2;
	let anoGrauDoc = req.body.tbAnoGrau;
	let iesGrauDoc = req.body.tbIesGrau;
	let grauEstrangDoc = req.body.grauEstrang ? 1 : 0;
	let grauNivelDoc = req.body.optionsGrau;
	let dataRegEst = req.body.tbDataGrauEstrang;
	let equivGraduEst = req.body.tbnotaEstrang;
	let especialDoc = req.body.tituloEsp ? 1 : 0;
	let nomeTitEspec = req.body.tbNomeTituloEdsp;
	let nomeTitEspecEng = req.body.tbNomeTituloEdspEst;
	let areaCientEsp = req.body.cbAreaDocenteEsp;
	let areaCient2Esp = req.body.cbAreaDocente2Esp;
	let anoTitEspec = req.body.tbAnoEsp;
	let iesTitEspec = req.body.tbIesEsp;
	let iesTitEspecEng = req.body.tbIesEspEst;
	let percIes = req.body.tbPercDedic;
	let ciencVitae = req.body.tbCienciaVitae;
	let orcid = req.body.tbOrcid;
	let doutorando = req.body.doutorando ? 1 : 0;
	let anoDoutorando = req.body.tbAnoDoutorando ? req.body.tbAnoDoutorando : 0;
    let nomeIES = req.body.nomeIES;

	console.log(req.body)
	let ficha = require("../models/setFichaDocCompleto.js")(id, auth,nomeDoc,emailDoc,vinculoIes,anoVinc,tipoDoc,tipoDoc2,vinculoIes,catDoc,grauDoc,areaCientDoc,areCient2Doc,anoGrauDoc,iesGrauDoc,grauEstrangDoc,grauNivelDoc,dataRegEst,equivGraduEst,especialDoc,nomeTitEspec,nomeTitEspecEng,areaCientEsp,areaCient2Esp,anoTitEspec,iesTitEspec,iesTitEspecEng,percIes,ciencVitae,orcid,doutorando,anoDoutorando,(err, fic) => {
		console.log()
		if(err){
				console.log(err);
			}else{
				res.locals.success = "Enviado";	
				//return renderFichaDoc(req, res);
				res.redirect("https://qualidadebo.uatlantica.pt/fichadocente");
			}
	})
})

router.get("/delFichaDoc/:id", (req, res) => {
	let delFicha = require('../models/delFichaDoc.js')(req.params.id, (err, delFicha) => {
		if(err)
			console.log(err);
		else{
			let ficha = require('../models/getFichaDoc.js')((err, docentes) =>{
				if(err){
					console.log(err);
				}else{
					let catDocente = require("../models/getCatDocente.js")((err, catDocente) =>{
						if(err){
							console.log(err);
						}else{
							let grauDocente = require("../models/getGrauDocente.js")((err, grauDocente) =>{
								if(err){
									console.log(err);
								}else{
									let OrgGest = require("../models/getOrgaosGestao.js")((err, orgGest) =>{
										if(err){
											console.log(err);
										}else{
											let tipoDocente = require("../models/getTipoDocente.js")((err, tipoDocente) =>{
												if(err){
													console.log(err);
												}else{
													res.render("fichaDocente", {docentes:docentes, catDocente:catDocente, grauDocente:grauDocente, tipoDocente:tipoDocente, orgGest:orgGest});
												}
											})
											
										}
									})
								}
							});
						}
					});
				}
			})
		}
	})
})

router.get("/delFormaDoc/:id", (req, res) => {
	//const user = req.session.passport.user.sAMAccountName;
	let delForma = require('../models/delFormaDoc')(req.params.id, (err, delFicha) => {
		if(err)
			console.log(err);
		else{
			res.locals.success = "Apagado";	
			return res.redirect("https://qualidadebo.uatlantica.pt/fichadocente");
		}
	})
})

router.get("/delFormaPedagDoc/:id", (req, res) => {
	//const user = req.session.passport.user.sAMAccountName;
	let delForma = require('../models/delFormaPedagDoc')(req.params.id, (err, delFicha) => {
		if(err)
			console.log(err);
		else{
			res.locals.success = "Apagado";	
			return res.redirect("https://qualidadebo.uatlantica.pt/fichadocente");
		}
	})
})

router.get("/delInvestigDoc/:id", (req, res) => {
	//const user = req.session.passport.user.sAMAccountName;
	let delForma = require('../models/delInvestDoc')(req.params.id, (err, delFicha) => {
		if(err)
			console.log(err);
		else{
			res.locals.success = "Apagado";	
			return res.redirect("https://qualidadebo.uatlantica.pt/fichadocente");
		}
	})
})

router.post("/setFormacao", (req, res) =>{
	let idDoc = req.body.idDocTitulo;
	let idForma = req.body.idFormaDoc;
	let ano = req.body.tbAnoTitulo ? req.body.tbAnoTitulo : 0;
	let nome = req.body.tbnomeTitulo;
	let nomeEng = req.body.tbnomeTituloEng;
	let area = req.body.cbAreaTitulo;
	let area2 = req.body.cbAreaTitulo2;
	let ies = req.body.tbIesTitulo;
	let iesEng = req.body.tbIesTituloEng;
	let classif = req.body.tbGrauTitulo;
	let classifEng = req.body.tbGrauTituloEng;
	let tituloEstrang = req.body.grauEstrangTitulo ? 1 : 0;
	let GrauTitulo = req.body.optionsGrauTitulo;
	let dataReg = req.body.tbDataGrauEstrangTitulo;
	let equivGrau = req.body.tbnotaEstrangTitulo;
	let iesEstrang = req.body.tbIesEstrangTitulo;


	console.log("--req.body--")
	let ficha = require("../models/setTituloDoc.js")(idDoc,idForma,ano,nome,nomeEng,area,area2,ies,iesEng,classif,classifEng,tituloEstrang,GrauTitulo,dataReg,equivGrau,iesEstrang,(err, fic) => {
		if(err){
				console.log(err);
			}else{
				res.locals.success = "Enviado";	
				//return renderFichaDoc(req, res);
				return res.redirect("https://qualidadebo.uatlantica.pt/fichadocente");
			}
	})
})

router.post("/setFormacaoPedag", (req, res) =>{
	let idDoc = req.body.idDocPedag;
	let idForma = req.body.idFormaPedagDoc;
	let formPedag = req.body.tbFormPedag;

	let form = require("../models/setFormPedag.js")(idDoc, idForma, formPedag, (err, form) =>{
		if(err){
			console.log(err);
		}else{
			res.locals.success = "Enviado";
			//return renderFichaDoc(req, res);
			return res.redirect("https://qualidadebo.uatlantica.pt/fichadocente");
		}
	})
})

router.post("/setInvestigacao", (req, res) =>{
	let idDoc = req.body.idDocInvest;
	let idForma = req.body.idAfiliacaoDoc;
	let unidade = req.body.tbUniInvest;
	let iesInvest = req.body.tbIesInvest;
	let classInvest = req.body.cbClassInvest;
	let investInteg = req.body.cbIntegradoInvest;
	let tipoInvest = req.body.cbTipoInvest;

	let form = require("../models/setInvest.js")(idDoc, idForma, unidade, iesInvest, classInvest, investInteg, tipoInvest, (err, form) =>{
		if(err){
			console.log(err);
		}else{
			res.locals.success = "Enviado";
			//return renderFichaDoc(req, res);
			return res.redirect("https://qualidadebo.uatlantica.pt/fichadocente");
		}
	})
})

router.post('/upload', (req, res) => {
	var nome = req.body.fileName;
	var tipo = req.body.fileType;
	var path = "Documents/" + req.body.formFile;
	//var atlanCheked = req.body.atlantica;
	var atlan = req.body.atlan;
	//var essatlaCheked = req.body.essatla;
	var essatla = req.body.essatla;
	let depart = req.body.fileDepartment;
	let cod = req.body.codFile;
	
	if(tipo == "Planos de Estudo") tipo = req.body.formCurso;

	//if(atlanCheked) atlan = 1;
	//if(essatlaCheked) essatla = 1;

	var ficheiro = require('../models/ficheiro.js')(nome, tipo, path, cod, depart, atlan, essatla, (err, ficheiro) => {
		if(err){
			console.log(err);
		}else{
			var tipos = require('../models/getTipos.js')('', (err, tipo) => {
				if(err){
					console.log(err);
				}else{
					let tipos = require('../models/getTipos.js')("", (err, tipo) =>{
						if(err){
							console.log(err);
						}else{
							let depart = require('../models/getDepart.js')('', (err, dep) => {
								if(err){
									console.log(err);
								}else{
									let curso = require('../models/getCursoSigla.js')('A', (err, curso) =>{
										if(err){
											console.log(err)
										}else{
											res.render("landing", {tipos: tipo, depart:dep, curso, curso})
										}
									})
								}
							})
						}
					})
				}
			})
		}
	})

})



router.post('/delFuc/:id', (req, res) =>{
	let ficheiro = require('../models/delFuc.js')(req.params.id, (err, ficheiro) =>{
		if(err){
			console.log(err);
		}else{
			var tipos = require('../models/getTipos.js')('', (err, tipo) => {
				if(err){
					console.log(err);
				}else{
					let tipos = require('../models/getTipos.js')("", (err, tipo) =>{
						if(err){
							console.log(err);
						}else{
							let depart = require('../models/getDepart.js')('', (err, dep) => {
								if(err){
									console.log(err);
								}else{
									let curso = require('../models/getCursoSigla.js')('A', (err, curso) =>{
										if(err){
											console.log(err)
										}else{
											res.render("landing", {tipos: tipo, depart:dep, curso, curso})
										}
									})
								}
							})
						}
					})
				}
			})
		}
	})
})

router.post('/editFile', (req, res) => {
	var id = req.body.tbIdFile;
	var cod = req.body.tbCodigo;
	var path = "Documents/" + req.body.tbNomeFic;
	var nome = req.body.tbNomeSite;
	var dep = req.body.tbDepart;

	let ficheiro = require('../models/editFicheiro.js')(id, cod, path, nome, dep, (err, ficheiro) => {
		if(err){
			console.log(err);
		}else{
			var tipos = require('../models/getTipos.js')('', (err, tipo) => {
				if(err){
					console.log(err);
				}else{
					let tipos = require('../models/getTipos.js')("", (err, tipo) =>{
						if(err){
							console.log(err);
						}else{
							let depart = require('../models/getDepart.js')('', (err, dep) => {
								if(err){
									console.log(err);
								}else{
									let curso = require('../models/getCursoSigla.js')('A', (err, curso) =>{
										if(err){
											console.log(err)
										}else{
											res.render("landing", {tipos: tipo, depart:dep, curso, curso})
										}
									})
								}
							})
						}
					})
				}
			})
		}
	})
})

router.post('/setRegentes/:idCurso', (req, res) =>{
	console.log("ID Curso: ", req.params.idCurso)
	Object.entries(req.body).forEach(([idUC, value]) => {
		let uc = require('../models/setUC.js')(idUC, value[0], value[1],(err, uc) =>{
			if(err){
				console.log(err);
			}
		})
	});
	let ce = require('../models/setCurso.js')(req.params.idCurso, req.body.tbCoordCurso, req.body.tbNomeCoord, (err, ce) =>{
		if(err){
			console.log(err);
		}else{
			res.redirect("/regentes");
		}
	})

})

// routes/colaborador.js
const InsertColaborador = require('../models/colaborador'); // ajusta o caminho conforme o teu projeto
const GetColaboradorByNumero = require('../models/getColaboradorByNumero');
const DeleteColaborador = require('../models/deleteColaborador');
let pool = require('../models/db.js');
const query = (sql) => new Promise((resolve, reject) => {
    pool.query(sql, (err, results) => err ? reject(err) : resolve(results));
});


router.get('/lstFichaColab', isLoggedIn, async (req, res) => {
    try {
        const colaboradores = await query(
            'SELECT numero, nome, ativo FROM Qualidade.Colaborador ORDER BY nome'
        );

        res.render('lstFichaColab', { colaboradores });
    } catch (err) {
        console.error('Erro ao carregar lista de colaboradores:', err);
        res.status(500).render('error', { message: 'Erro ao carregar dados' });
    }
});
async function carregarOpcoes() {
    const [regimes, niveisQNQ, funcoes, areasFunc, catColab] = await Promise.all([
        query('SELECT idtbOpcaoRegimeColab, nome FROM Qualidade.tbOpcaoRegimeColab ORDER BY nome'),
        query('SELECT idtbOpcaoNiveisQNQ, nome, nivel FROM Qualidade.tbOpcaoNiveisQNQ ORDER BY nivel'),
        query('SELECT idtbOpcaoFuncaoColab, nome FROM Qualidade.tbOpcaoFuncaoColab ORDER BY nome'),
        query('SELECT idtbOpcaoAreasFunc, nome, sigla FROM Qualidade.tbOpcaoAreasFunc ORDER BY nome'),
        query('SELECT idtrOpcaoCatColab, nome FROM Qualidade.trOpcaoCatColab WHERE ativo = 1 ORDER BY nome')
    ]);
    return { regimes, niveisQNQ, funcoes, areasFunc, catColab };
}
 
// Adicionar novo colaborador -> form vazio (colab = null)
router.get('/fichaColab', isLoggedIn, async (req, res) => {
    try {
        const opcoes = await carregarOpcoes();
        res.render('fichaColab', { ...opcoes, colab: null });
    } catch (err) {
        console.error('Erro ao carregar opções da fichaColab:', err);
        res.status(500).send('Erro ao carregar dados');
    }
});
 
// Editar colaborador existente -> form preenchido (colab = registo encontrado)
router.get('/fichaColab/:id', isLoggedIn, async (req, res) => {
    try {
        const opcoes = await carregarOpcoes();
 
        GetColaboradorByNumero(req.params.id, (err, colab) => {
            if (err) {
                console.error('Erro ao procurar colaborador:', err);
                return res.status(500).send('Erro ao carregar dados');
            }
            if (!colab) {
                return res.status(404).send('Colaborador não encontrado.');
            }
            res.render('fichaColab', { ...opcoes, colab });
        });
    } catch (err) {
        console.error('Erro ao carregar opções da fichaColab:', err);
        res.status(500).send('Erro ao carregar dados');
    }
});
 
// Apagar (soft delete) colaborador
router.post('/fichaColab/:id/delete', isLoggedIn, (req, res) => {
    DeleteColaborador(req.params.id, (err) => {
        if (err) {
            console.error('Erro ao apagar colaborador:', err);
            return res.status(500).send('Erro ao apagar colaborador.');
        }
        // Ajusta para a rota real da tua listagem de colaboradores
        res.redirect('/lstFichaColab');
    });
});

router.post('/enviarColab', (req, res) => {
    const b = req.body;
 
    // Validação dos campos "required" no form
    if (!b.tbNumero || !b.tbNome || !b.tbDataAdmissao || !b.tbEmail) {
        return res.status(400).send('Preenche os campos obrigatórios: Nº, Nome, Data de Admissão e Email.');
    }
 
    // Validação do email institucional: formato válido e domínio @uatlantica.pt
    const emailRegex = /^[^\s@]+@uatlantica\.pt$/i;
    if (!emailRegex.test(b.tbEmail.trim())) {
        return res.status(400).send('Email inválido. Tem de ser um endereço @uatlantica.pt.');
    }
 
    const v = (val) => (val === undefined || val === null || val === '' ? null : val);
 
    InsertColaborador(
        b.tbNumero,
        b.tbNome,
        b.tbDataAdmissao,
        b.tbEmail,
 
        v(b.cbDepartamento),   // idAreaFunc
        v(b.cbCatProfissional),// idCatColab
        v(b.cbCargo),          // idFuncao
        v(b.cbTipoContrato),   // idRegime
        v(b.tbCargaHoraria),   // cargaHoraria
        v(b.cbQNQ),            // idNivelQNQ
        v(b.tbAreaForma),      // areaFormacao
        v(b.tbOutForma),       // outrasFormacoes
 
        (err, result) => {
            if (err) {
                console.error('Erro ao gravar Colaborador:', err);
                // erro típico: numero duplicado (chave única) -> código ER_DUP_ENTRY
                if (err.code === 'ER_DUP_ENTRY') {
                    return res.status(409).send('Já existe um colaborador com esse número.');
                }
                return res.status(500).send('Erro ao gravar os dados do colaborador.');
            }
            // Ajusta o redirecionamento ao fluxo real da aplicação
            res.redirect('/lstFichaColab?ok=1');
        }
    );
});



function isLoggedIn(req, res, next){
	if(req.session.user){
		return next();
	}
	res.redirect("/login");
}

module.exports = router;
