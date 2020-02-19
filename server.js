// configurando o servidor
const express = require("express");
const server = express()

// configurando o server pra apresentar arquivos extras
server.use(express.static('public'))

//configurando a template engine
const nunjucks = require("nunjucks")
nunjucks.configure("./", {
  express: server,
  noCache: true,
})

// lista dos doadores -- array

const donors = [
  {
    name: "Diego Fernandes",
    blood: "AB+"
  },
  {
    name: "Cleiton Silva",
    blood: "B+"
  },
  {
    name: "Robson Junior",
    blood: "A+"
  },
  {
    name: "Mayk Brito",
    blood: "O+"
  }
]


// configurar a apresentação da página
server.get("/", function(req, res) {
  return res.render("index.html", { donors })
})

//ligar servidor e permitir acesso a port 3001
server.listen(3001, function() {
  console.log("start server")  
})