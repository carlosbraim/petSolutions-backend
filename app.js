const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()

const routerCategory = require('./routes/category') 
const routerUser = require('./routes/user')
const routerPet = require('./routes/pet') 
const routerClient = require('./routes/client')
const routerClientVet = require('./routes/clientVet')
const routerPostlog = require('./routes/user')

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())

app.use((req, res, next)=>{
    try{
        res.header('Access-Control-Allow-Origin', '*');
        res.header(
         'Access-Control-Allow-Header',
         'Origin, X-Requested-With, Content-Type, Accept, Authorization'
         );
    
         if(req.method === 'OPTIONS'){
            res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
            return res.status(200).send({});
         }
         next();
    }catch{
        return res.status(405).json({ error: 'error ao conectar na api'});
    }
})


try {
    app.use('/category', routerCategory);
    app.use('/user', routerUser);
    app.use('/pet', routerPet);
    app.use('/client', routerClient);
    app.use('/clientVet', routerClientVet);
    app.use('/log', routerPostlog);
} catch (error) {
    throw new Error('Erro ao executar rota get.');
}




app.use((req, res, next) => {
    try{
        const erro = new Error('Erro ao conectar na api')
        erro.status = 404
        next(erro)
    }catch{
        return res.status(405).json({ error: 'erro ao conectar na base de dados'});
    }
})

app.use((error, req, res, next) =>{
    try{
        res.status(error.status || 500);
        return res.send({
            erro:{
                mensagem: error.message
            }
        })
    }catch{
        return res.status(405).json({ error: ''});
    }
})

module.exports = app;