const express = require('express');
const router = express.Router();

router.get('/', (req, res)=>{
    req.getConnection((error, connection)=>{
      if (error) {
        console.error(error);
        res.status(500).render('erreur',{error});
      } else {
        connection.query('SELECT * FROM listee', [], (error, data)=>{
          if (error) {
            console.error(error);
            res.status(500).render('erreur',{error});
          } else {
            res.status(200).render('index', {data})
          }
        })
      }
    })
  });
router.post('/listee',(req,res)=>{
  let id = req.body.id === "" ? null : req.body.id;
 let title =req.body.title;
 let description = req.body.description;
 let requeteSQL = id === null ? 'INSERT INTO listee(title,description) VALUES (?,?)' 
 : 'UPDATE listee SET title = ?,description = ? WHERE id = ?';
 let data = id === null ? [title, description] : [title, description, id]
 req.getConnection((error, connection)=>{
  if (error) {
    console.error(error);
    res.status(500).render('erreur',{error});
  } else {
    connection.query(
    requeteSQL,
   data, 
    (error, data)=>{
      if (error) {
        console.error(error);
        res.status(500).render('erreur',{error});
      } else {
        res.status(302).redirect('/');
    }})
  }
})

})

router.delete('/listee/:id',(req,res)=>{
  let id = req.params.id;

    req.getConnection((error, connection)=>{
      if (error) {
        console.error(error);
        res.status(500).render('erreur',{error});
      } else {
        connection.query('DELETE FROM listee WHERE id = ?', [id], (error, data)=>{
          if (error) {
            console.error(error);
            res.status(500).render('erreur',{error});
          } else {
            res.status(200).json({routeRacine : '/'})
          }
        })
      }
    })
  })

  module.exports = router;