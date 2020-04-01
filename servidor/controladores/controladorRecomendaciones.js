var connection = require('../lib/conexionbd');

function recommendedMovie (req, res) {
  console.log(req.query);   
  /*datos traidos de las q*/
  let genero = req.query.genero;  
  let anio_inicio = req.query.anio_inicio;
  let anio_fin = req.query.anio_fin;
  let puntuacion = req.query.puntuacion;
  /*selección de todos los atributos de pelicula*/
  let sql = `SELECT * FROM pelicula`;
  /*Mandamos la query con los parametros de pelicula y el nombre del genero. El resto se pone de manera auto según lo seleccionado con el array*/
  let sqlGenre = `SELECT pelicula.id, pelicula.poster, pelicula.trama,pelicula.titulo,genero.nombre FROM pelicula`;
  /*let generos;*/
  /*let parametrosQuery*/
 /*nombre de la instancia con su valor y la query a realizar KEY AND VALUE*/
  let paramsArray = [
    {'nombre': 'genero', 'valor': genero, 'query': ` INNER JOIN genero ON pelicula.genero_id = genero.id WHERE genero.nombre = \'${genero}\'`},
    {'nombre': 'anio_inicio', 'valor': anio_inicio, 'query': ` AND pelicula.anio BETWEEN ${anio_inicio}`, 'querywogenre': ` WHERE anio BETWEEN ${anio_inicio}`}, 
    {'nombre': 'anio_fin', 'valor':anio_fin, 'query': ` AND ${anio_fin}`, 'querywogenre': ` AND ${anio_fin}`}, 
    {'nombre': 'puntuacion', 'valor': puntuacion, 'query': ` AND pelicula.puntuacion = ${puntuacion}`, 'querywogenre': ` AND puntuacion = ${puntuacion}`}
  ];
  /*recorremos el array con el FOREACH con el parametro*/
  paramsArray.forEach(e => {
    if (genero) {
      if (e.valor !== "" && e.valor !== undefined) {
        sqlGenre += e.query;
        sql = sqlGenre;
        /*console.log(sqlGenre);*/
      }
    }else if (puntuacion && !anio_inicio && !anio_fin) {
      sql = `SELECT * FROM pelicula WHERE puntuacion = ${puntuacion}`;
    }else{
      if (e.valor !== "" && e.valor !== undefined) {
        sql += e.querywogenre;
      }
    }
  });
  console.log(sql);


  connection.query(sql, function(error, resultado, fields) {
    if (error) {
        console.log("Hubo un error al buscar la pelicula", error.message);
        return res.status(404).send("Hubo un error al buscar la pelicula, intenta nuevamente");
    } 
    var response = {
      'peliculas': resultado
    };

    // no pasa el generos en la peli recomendadaaa
    // será problema de la vista del back? VER ANTS DE ENVIAR

    res.send(JSON.stringify(response));
  });
}


/*exportamos la function*/
  module.exports = {
    recommendedMovie : recommendedMovie
}