/**
 * Created by GelberCC on 05/05/2016.
 */
module.exports = function (app) {
    return{
        
        add:function (req, res) {
            var Usuario = app.get('usuario');
            Usuario.create({
                id_Rol: req.body.id_Rol,
                nombre: req.body.nombre,
                nick: req.body.nick,
                contrasena: req.body.contrasena,
                correo: req.body.correo,
                telefono: req.body.telefono
            }).then(function (usuario) {
                res.json(usuario)
            });
        },
        
        list: function (req, res) {
            var Usuario = app.get('usuario');
            Usuario.findAll().then(function (usuario) {
                res.json(usuario)
            });
        },
        
        edit: function (req, res) {
            var Usuario = app.get('usuario');
            Usuario.find(req.body.id_Usuario).then(function (usuario) {
                if (usuario){
                    usuario.updateAttributes({
                        nombre: req.body.nombre,
                        nick: req.body.nick,
                        contrasena: req.body.contrasena,
                        correo: req.body.correo,
                        telefono: req.body.telefono 
                    }).then(function (usuario) {
                        res.json(usuario)
                    });
                }else{
                    res.status(404).send({message: "Usuario no encontrado"});
                }
            });
        },
        
        delete: function (req, res) {
            var Usuario = app.get('usuario');
            Usuario.destroy({
                where: {
                    id_Usuario: req.body.id_Usuario
                }
            }).then(function (usuario) {
                res.json(usuario)
            });
        },
        
        find: function (req, res) {
            var Usuario = app.get('usuario');
            Usuario.find(req.body.id_Usuario).then(function (usuario) {
                if(usuario){
                    res.json(usuario);
                }else {
                    res.status(404).send({message: "Usuario no encontrado"});
                }
            });
        }
    }
};