const express = require("express");
/* Objeto para organizar rutass*/ 
const router = express.Router();

router.get("/",(req,res)=>{
    res.send("Servidor PuntoGym funcionando");
});

module.exports = router;