// configurando o servidor
const express = require("express");
const server = express()

// configurando o server pra apresentar arquivos extras
server.use(express.static('public'))

// habilitar body do form
server.use(express.urlencoded({ extended: true }))

//configurando a template engine
const nunjucks = require("nunjucks")
nunjucks.configure("./", {
  express: server,
  noCache:true,
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
    blood: "O+"
  },
  {
    name: "Mayk Brito",
    blood: "A-"
  },
]


// configurar a apresentação da página
server.get("/", function(req, res) {
  return res.render("index.html", { donors })
})

server.post("/", function(req, res) {
  //pegar dados do formulario
  const name = req.body.name
  const email = req.body.email
  const blood = req.body.blood

  //push - coloca valor dentro do array
  donors.push({
    name: name,
    blood: blood
  })

  return res.redirect("/")

})

//ligar servidor e permitir acesso a port 3001
server.listen(3001, function() {
  console.log("start server")  
})