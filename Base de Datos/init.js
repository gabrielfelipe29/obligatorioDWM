<<<<<<< HEAD
use obligatorio
db.createCollection("administradores")
db.createCollection("propuestas")
db.createCollection("actividades")
db.createCollection("salas")
db.createUser({user: "admin",pwd: "admin", roles:[{ role: 'root', db: 'admin' }]})


=======
use obligatorio
db.createCollection("administradores")
db.createCollection("propuestas")
db.createCollection("actividades")
db.createCollection("salas")
db.createUser({user: "admin",pwd: "admin", roles:[{ role: 'root', db: 'admin' }]})


>>>>>>> b40f81b840f2ad8dbca8a9d7fe72966e69af7b3c
