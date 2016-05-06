/**
 * Created by GelberCC on 05/05/2016.
 */
var ruta = require('express').Router();
module.exports = (function (app) {
    var rol = require('../controller/RolController')(app);

    ruta.get('/rol', rol.list);
    ruta.post('/rol', rol.add);
    ruta.put('/rol', rol.edit);
    ruta.delete('/rol', rol.delete);
    ruta.get('/rol/:id', rol.rolConUsuarios);


    var usuario = require('../controller/UsuarioController')(app);
    ruta.get('/usuario', usuario.list);
    ruta.post('/usuario', usuario.add);
    ruta.put('/usuario', usuario.edit);
    ruta.delete('/usuario', usuario.delete);

    return ruta;
});