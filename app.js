const express = require('express');
const app = express();
const mysql = require('mysql');
const myConnection = require('express-myconnection');
const port = 3000;
const listeRoutes = require('./routes/listeRoutes')
const optionBDD = {
    host: 'localhost',
    user: 'root',
    password: 'root',
    port: 3306,
    database: 'todolist'
}
// const humain = {
//     name: "Marie-CLaire",
//     age:32};


//   const liste = [
//     {titre: 'apprendre NodeJs', description: 'Node c\'est la vie'},
//     {titre: 'apprendre express', description: 'Express c\'trop cool'}
// ]
app.use(myConnection(mysql,optionBDD,'pool'));
app.use(express.static('public'));
app.set('views','./IHM'); // définition du chemin de mes views
app.set('view engine','ejs'); // définition du moteur de render ou de views ou de templates 
app.use(express.urlencoded({extended : false}))
app.use(listeRoutes); // j'utilise le component d'accès aux données poru listee



app.get('/a-propos', function (req, res) { 
    res.status(200).render('a-propos');
    })

app.get('/accueil', function (req, res) { 
    res.status(200).render('accueil');
    })


app.use((req,res)=>{ 
    res.status(404).render('404');
})

app.listen(port, () => { 
    console.log("Server listening on port "+port);
})

// const express = require('express');
// const app = express();
// const mysql = require('mysql');
// const myConnection = require('express-myconnection');
// const port = 3000;
// const optionBDD = {
//   host: 'localhost',
//   user: 'root',
//   password: 'root',
//   port: 3306,
//   database: 'todolist'
// }

// app.use(myConnection(mysql, optionBDD, 'pool'));
// app.use(express.static('public')); //definition des resources static
// app.set('views', './IHM'); //definition du chemin de mes views
// app.set('view engine', 'ejs'); // definition du moteur de views

// app.get('/', (req, res)=>{
//   req.getConnection((error, connection)=>{
//     if (error) {
//       console.error(error);
//     } else {
//       connection.query('SELECT * FROM listee', [], (error, data)=>{
//         if (error) {
//           console.error(error);
//         } else {
//           res.status(200).render('index', {data})
//         }
//       })
//     }
//   })
// });

// app.get('/a_propos', (req, res)=>{
//   res.status(200).render('a_propos')
// });

// app.use((req, res)=>{
//   res.status(404).render('404')
// });

// app.listen(port, ()=>{
//   console.log("Server listening on port " + port);
// });