var con = require('../lib/conexionbd');

function getGenre(req, res){
    var sql = "SELECT * FROM genero";
    
    con.query(sql, function(error, resultado, fields){
        if (error) {
          console.log('Hubo un error en la consulta', error.message);
          return res.status(404).send('Hubo un error en la consulta');
        }
        var response = {
          'generos': resultado
        };

        res.send(JSON.stringify(response));
    });
}

module.exports = {
    getGenre : getGenre
};