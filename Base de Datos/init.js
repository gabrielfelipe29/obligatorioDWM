use obligatorio
db.createCollection("administradores")
db.createCollection("propuestas")
db.createCollection("actividades")
db.createCollection("salas")
db.createUser({user: "admin",pwd: "admin", roles:[{ role: 'root', db: 'admin' }]})


