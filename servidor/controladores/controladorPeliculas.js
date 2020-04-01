var connection = require('../lib/conexionbd');

function searchMovie(req,res){

  var anio = req.query.anio;
  var titulo = req.query.titulo;
  var genero = req.query.genero;
  var orden = req.query.columna_orden;
  var tipo_orden = req.query.tipo_orden;
  var pagina = req.query.pagina;
  var cantidad = req.query.cantidad;
  var total;
  var sql_;

  var sql='select * from pelicula';
  /* Primer envío de información*/ 
  /*con.query(sql,function(error,result,fields){
      if(error){
          console.log("Ha ocurrido un error en la busqueda, intenta nuevamente",error.message);
          return response.status(404).send("hubo un error en la consulta");
      }
      var res={
          'peliculas':result
      };
      response.send(JSON.stringify(res));
  });
};*/


/* Se instancia el titulo, anio,genero*/ 

if (titulo && anio && genero) {
  console.log(`título: ${titulo} \n año: ${anio} \n género: ${genero}`)
  sql += ` WHERE titulo LIKE \'\%${titulo}\%\' AND anio = ${anio} AND genero_id = ${genero}`;
  console.log(sql);
} else if (!titulo && anio && genero) {
  sql += ` WHERE anio = ${anio} AND genero_id = ${genero}`;    
  console.log('año y género: ' + sql);    
} else if (!anio && titulo && genero) {
  sql += ` WHERE titulo LIKE \'\%${titulo}\%\' AND genero_id = ${genero}`;
  console.log('género y título: ' + sql);
} else if (!genero && anio && titulo) {
  sql += ` WHERE titulo LIKE \'\%${titulo}\%\' AND anio =  ${anio}`;
  console.log('año y título: ' + sql);  
} else if (titulo) {
    sql += ` WHERE titulo LIKE \'\%${titulo}\%\'`;
    console.log('sólo título: ' + sql);
} else if (anio) {
  sql += ` WHERE anio = ${anio}`;
  console.log('sólo año: ' + sql);
} else if (genero) {
  sql += ` WHERE genero_id = ${genero}`;
  console.log('sólo género: ' + sql);
}

/*filtro para ordenar*/
if (orden === 'anio') {
  sql += ` ORDER BY fecha_lanzamiento ${tipo_orden}`;    
  console.log(sql);
} else if (orden === 'puntuacion') {
  sql += ` ORDER BY puntuacion ${tipo_orden}`;    
  console.log(sql);
} else if (orden === 'duracion') {
  sql += ` ORDER BY duracion ${tipo_orden}`;    
  console.log(sql);
}
sql_ = sql;      

/*se añade el limit de cantidad por página*/
sql += ` LIMIT ${(pagina - 1) * cantidad},${cantidad}`;

connection.query(sql, function(error, resultado, fields) {
  if (error) {
      console.log("Hubo un error en la consulta", error.message);
      return res.status(404).send("Hubo un error en la consulta");
      console.log(sql);        
  }
  
  //TOTAL DE PELÍCULAS
  connection.query(sql_, function(error_, resultado_, fields_) {
    if (error_) {
      console.log("Hubo un error en la consulta", error_.message);
      return res.status(404).send("Hubo un error en la consulta");       
    }
    total = resultado_.length;
    console.log(total);

      // al response anterior le agregamos el total que de peliculas 
    var response = {
      'peliculas': resultado,
      'total': total
    };

    res.send(JSON.stringify(response));   
  });

});
}




module.exports = {
  searchMovie : searchMovie,
}