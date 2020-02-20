// configurando o servidor
const express = require("express");
const server = express()

// configurando o server pra apresentar arquivos extras
server.use(express.static('public'))

//configurar db
const Pool = require('pg').Pool
const db = new Pool({
  user: 'postgres',
  password: 'postgres',
  host: '127.0.0.1',
  port: 5432,
  database: 'doe'
})

// habilitar body do form
server.use(express.urlencoded({ extended: true }))

//configurando a template engine
const nunjucks = require("nunjucks")
nunjucks.configure("./", {
  express: server,
  noCache:true,
})



// configurar a apresentação da página
server.get("/", function(req, res) {

  db.query(`SELECT DISTINCT ON
  (BLOOD) BLOOD,
  NAME,
  EMAIL,
  CREATE_AT
  FROM DONORS
  WHERE ID IN 
  
  (
  SELECT ID FROM DONORS ORDER BY ID DESC
  )
  
  GROUP BY NAME, EMAIL, BLOOD, ID 
  ORDER BY  BLOOD DESC, ID DESC
  FETCH FIRST 8 ROWS ONLY`, function(err, result){
    if (err) return res.send("Erro no db")

    result.rows.forEach(testei)
    

    function testei(item, index, arr){
      arr[index].create_at = item.create_at.getUTCDate() + '/' + (item.create_at.getMonth() + 1) + '/' +  item.create_at.getFullYear()
    }


    const donors = result.rows

    return res.render("index.html", { donors })
  })

})

server.post("/", function(req, res) {
  //pegar dados do formulario

  const blood = req.body.blood
  const name = req.body.name
  const email = req.body.email
  
  
  

  if (name == "" || email == "" || blood == "" ) {
    return res.send("Todos os campos são obrigatórios.")
  
  }

  //push - coloca valor dentro do db
  const query = `
  INSERT INTO donors ("blood", "name", "email")
  VALUES ($1, $2, $3)`

 

  const values = [blood, name, email, ]

  db.query(query, values, function(err) {
    //fluxo de erro
    if (err) return res.send("Erro no db")

    //fluxo ideal
    return res.redirect("/")
  })


})

//ligar servidor e permitir acesso a port 3001
server.listen(3001, function() {
  console.log("start server")  
})