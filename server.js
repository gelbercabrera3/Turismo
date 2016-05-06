/**
 * Created by GelberCC on 05/05/2016.
 */

(function () {
    var express = require('express');
    var bodyParser = require('body-parser');
    var morgan = require('morgan');
    var mysql = require('mysql');
    var Sequelize = require('sequelize');

    var sequelize = new Sequelize('db_turismo_ejemplo', 'root', '',{
        host: 'localhost',
        dialect: 'mysql',
        pool: {
            max: 20,
            min: 0
        }
    });

    // Modelos

    var Rol = sequelize.define('rol',{
        id_Rol: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
        nombre: {type: Sequelize.STRING, allowNull: false},
        descripcion: {type: Sequelize.STRING} 
    });

    var Usuario = sequelize.define('usuario',{
        id_Usuario: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
        nombre: {type: Sequelize.STRING, allowNull: false},
        nick: {type: Sequelize.STRING, allowNull: false},
        contrasena: {type: Sequelize.STRING, allowNull: false},
        correo: {type: Sequelize.STRING},
        telefono: {type: Sequelize.INTEGER},
        id_Rol: {type: Sequelize.INTEGER, references:{
            model: Rol,
            key: 'id_Rol'
        }}
    });

    var Categoria = sequelize.define('categoria',{
        id_Categoria: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
        nombre: {type: Sequelize.STRING, allowNull: false}
    });

    var Lugar = sequelize.define('lugar',{
        id_Lugar: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
        nombre: {type: Sequelize.STRING, allowNull: false},
        descripcion: {type: Sequelize.STRING, allowNull: false},
        ubicacion: {type:Sequelize.STRING, allowNull: false}
    });

    var Extra = sequelize.define('extra',{
       id_Extra: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
       id_Categoria: {type: Sequelize.INTEGER, references:{
           model: Categoria,
           key: 'id_Categoria'
       }},
        id_Lugar: {type: Sequelize.INTEGER, references:{
            model: Lugar,
            key: 'id_Lugar'
        }},
        nombre: {type: Sequelize.STRING, allowNull: false},
        descripcion: {type: Sequelize.STRING, allowNull: false},
        direccion: {type: Sequelize.STRING, allowNull: false},
        correo: {type: Sequelize.STRING, allowNull:false},
        telefono: {type: Sequelize.STRING, allowNull: false}
    });

    var Opcion = sequelize.define('opcion', {
       id_Opcion: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
        id_Extra: {type: Sequelize.INTEGER, references:{
            model: Extra,
            key: 'id_Extra'
        }},
        descripcion: {type: Sequelize.STRING, allowNull: false},
        costo: {type: Sequelize.DOUBLE, allowNull: false}
    });

    var Reserva = sequelize.define('reserva',{
        id_Reserva: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
        id_Opcion: {type: Sequelize.INTEGER, references:{
            model: Opcion,
            key: 'id_Opcion'
        }},
        id_Usuario: {type: Sequelize.INTEGER, references:{
            model: Usuario,
            key: 'id_Usuario'
        }},
        fecha: {type: Sequelize.DATE, allowNull: false}
    });

    var ImagenLugar = sequelize.define('imagenLugar',{
        id_imagenLugar: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
        id_Lugar: {type: Sequelize.INTEGER, references:{
            model: Lugar,
            key: 'id_Lugar'
        }},
        contenido: {type: Sequelize.STRING}
    });

    //Referencias

    Rol.hasMany(Usuario, {foreignKey: 'id_Rol'}, {constraints: true});
    Usuario.belongsTo(Rol,{foreignKey: 'id_Rol'},{constraints: true});

    Categoria.hasMany(Extra, {foreignKey: 'id_Categoria'}, {constraints: true});
    Extra.belongsTo(Categoria, {foreignKey: 'id_Categoria'}, {constraints: true});

    Lugar.hasMany(Extra, {foreignKey:'id_Lugar'}, {constraints: true});
    Extra.belongsTo(Lugar, {foreignKey:'id_Lugar'}, {constraints: true});

    Extra.hasMany(Opcion, {foreignKey:'id_Extras'}, {constraints: true});
    Opcion.belongsTo(Extra, {foreignKey:'id_Extras'}, {constraints: true});

    Opcion.hasMany(Reserva, {foreignKey:'id_Opcion'}, {constraints: true});
    Reserva.belongsTo(Opcion, {foreignKey:'id_Opcion'}, {constraints: true});

    Usuario.hasMany(Reserva, {foreignKey:'id_Usuario'},{constraints: true});
    Reserva.belongsTo(Usuario, {foreignKey:'id_Usuario'}, {constraints: true});

    Lugar.hasMany(ImagenLugar, {foreignKey:'id_Lugar'}, {constraints: true});
    ImagenLugar.belongsTo(Lugar, {foreignKey:'id_Lugar'}, {constraints: true});

    //Otros

    sequelize.sync({force: false});
    var puerto=3000;
    var conf=require('./config');
    var app=express();
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
    app.use('/api/v1', require('./routes')(app));
    app.use(morgan('dev'));

    app.set('rol', Rol);
    app.set('usuario', Usuario);
    app.set('lugar', Lugar);
    app.set('categoria', Categoria);
    app.set('extra', Extra);
    app.set('opcion', Opcion);
    app.set('reserva', Reserva);

    app.listen(puerto, function () {
        console.log("Servidor iniciado en el puerto " +puerto);
        console.log("Debug del servidor: ")
    })
})();