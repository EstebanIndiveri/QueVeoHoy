/*SE CREA LA BASE y la seleccionamos*/
CREATE DATABASE queveo;
USE queveo;
/*CREAMOS LAS TABLAS*/
CREATE TABLE pelicula (
  id int auto_increment,
  titulo varchar(100),
  duracion int(5),
  director varchar(400),
  anio int(5),
  fecha_lanzamiento date,
  puntuacion int(2),
  poster varchar(300),
  trama varchar(700),
  PRIMARY KEY(id)
);

CREATE TABLE genero (
  id int auto_increment,
  nombre varchar(30),
  PRIMARY KEY(id)
);

/*AGREGA COLUMNA Y FK*/
ALTER TABLE pelicula ADD COLUMN genero_id int;

ALTER TABLE pelicula ADD FOREIGN KEY (genero_id) REFERENCES genero(id);
/*CREAMOS TABLA ACTOR Y ACTOR_PELICULA para vincular actor con pelicula*/
CREATE TABLE actor (
  id INT auto_increment,
  nombre varchar(70),
  PRIMARY KEY(id)
);

CREATE TABLE actor_pelicula (
  id INT auto_increment,
  actor_id int,
  pelicula_id int,
  PRIMARY KEY(id)
);

/*Relacionamos las tablas anteriores con unas FK correspondientes*/

ALTER TABLE actor_pelicula  ADD FOREIGN KEY (actor_id) REFERENCES actor (id);

ALTER TABLE actor_pelicula  ADD FOREIGN KEY (pelicula_id) REFERENCES pelicula (id);
