var connection = require('../lib/conexionbd');

function getMovie(req, res) {
/*  Intento 1?
    let id=request.params.id;
    let sqlMovie="SELECT pelicula.*,genero.nombre FROM pelicula LEFT JOIN genero ON genero.id=pelicula.genero_id WHERE pelicula.id='" + id + "'";
    let sqlActor="SELECT actor_pelicula.*,actor.nombre FROM actor_pelicula LEFT JOIN actor ON actor.id=actor_pelicula.actor_id WHERE pelicula_id='" + id + "'";*/
    var id = req.params.id
    /*Query para traer el genero de cada pelicula se le pasa el ID traido en HTTP*/
    var sqlMovie = 
        `SELECT pelicula.*, genero.nombre 
        FROM pelicula 
        LEFT JOIN genero ON (genero.id = pelicula.genero_id)
        WHERE pelicula.id = ${id}`
    /*Query para traer el actor por pelicula: se pasa por parametro el ID que se envía por HTTP*/
       var sqlActor = `SELECT * FROM actor_pelicula INNER JOIN actor ON actor_id = actor.id WHERE pelicula_id = ${id}`


        connection.query(sqlMovie,function(error,result,fields){
            if(error){
                console.log("ha ocurrido un error buscando el genero,intenta nuevamente",error.message);
                return res.status(404).send("hubo un error, no se encontró la pelicula");
            /*window.location.href = "../../html/error.html"*/
            }
        connection.query(sqlActor,function(error,resultTwo,fields){
            if (error) {
                console.log("Hubo un error en la consulta", error.message);
                return res.status(404).send("Hubo un error en la consulta");
            }
                var response={
                    'pelicula':result[0],
                    'genero':result[0].nombre,
                    'actores':resultTwo
                };
            res.send(JSON.stringify(response));  
        });
        
    });
};
    
    

module.exports = {
  getMovie: getMovie
};