const axios = require('axios');
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;


app.get('/',(req,res) =>{
    res.json({no: 'hay Nada todavía'});
})

app.listen(port, () => console.log("Listenting on port "+port));