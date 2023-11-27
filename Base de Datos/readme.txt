Para levantar el docker, hacen el docker-compose up y debería correr.

El docker usa la imagen de mongo oficial, y además levanta el init.js
que crea la BD, las colecciones y un usuario que sirve solo para
acceder a la BD.

Les dejé también un archivo "mongo" que tiene algunos comandos que pueden
correr en la BD usando datagrip. EL DATAGRIP NO ES NECESARIO, pero sirve
si quieren verificar si quedaron los datos bien colocados, borrarlos y
probar denuevo, etc.

Para conectar datagrip con mongo ponen los siguientes datos en la conexion:
Host: localhost
Puerto: 27017
Usuario: root
Password: example

