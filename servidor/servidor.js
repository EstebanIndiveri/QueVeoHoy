var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

var controladorPeliculas = require ('./controladores/controladorPeliculas');
var controladorGeneros = require ('./controladores/controladorGeneros');
var controladorRecomendaciones = require ('./controladores/controladorRecomendaciones');
var controladorInformacionDePelicula = require ('./controladores/controladorInformacionDePelicula');

/*sive para nodemon=??*/

var app = express();

app.use(cors());

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.get ('/peliculas', controladorPeliculas.searchMovie);
app.get ('/generos', controladorGeneros.getGenre);
app.get ('/peliculas/recomendacion', controladorRecomendaciones.recommendedMovie);
app.get ('/peliculas/:id', controladorInformacionDePelicula.getMovie);

var puerto = '8080';

app.listen(puerto, function () {
  console.log( "Escuchando en el puerto " + puerto );
});
