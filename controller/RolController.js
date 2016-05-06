/**
 * Created by GelberCC on 05/05/2016.
 */
module.exports = function (app) {
    return{
        add:function (req, res ) {
            var Rol = app.get('rol');
            Rol.create({
                nombre: req.body.nombre,
                descripcion: req.body.descripcion
            }).then(function (rol) {
                res.json(rol);
            });
        },

        list:function (req, res) {
            var Rol = app.get('rol');
            Rol.findAll().then(function (rol) {
                res.json(rol);
            });
        },

        edit:function (req, res) {
            var Rol = app.get('rol');
            Rol.find(req.body.id_Rol).then(function (rol) {
                if (rol){
                    rol.updateAttributes({
                        nombre: req.body.nombre,
                        descripcion: req.body.descripcion
                    }).then(function (rol) {
                        res.json(rol);
                    }) ;
                }else {
                    res.status(404).send({ message: "Rol no encontrado"});
                }
            });
        },

        delete: function (req, res) {
            var Rol = app.get('rol');
            Rol.destroy({
                where: {
                    id_Rol: req.body.id_Rol
                }
            }).then(function (rol) {
              res.json(rol);
            });
        },
        
        find: function (req, res) {
            var Rol = app.get('rol');
            Rol.find(req.body.id_Rol).then(function (rol) {
                if(rol){
                    res.json(rol);
                }else{
                    res.status(404).send({ message: "Rol no encontrado"})
                }
            });
        },
        
        rolConUsuarios:function (req, res) {
            var Rol = app.get('rol');
            var Usuario = app.get('usuario');
            Rol.find({ where: {id_Rol: req.params.id}, include: [Usuario]}).then(function (rol) {
                res.json(rol);
            });
        }
    }
};