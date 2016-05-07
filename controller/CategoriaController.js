/**
 * Created by GelberCC on 05/05/2016.
 */
modules.exports = function (app) {
    return{
        
        add:function (req, res) {
            var Categoria = app.get('categoria');
            Categoria.create({
                id_Categoria: req.body.id_Categoria,
                nombre : req.body.nombre
            }).then(function (categoria) {
                res.json(categoria)
            });
        },
        
        list: function (req, res) {
            var Categoria = app.get('categoria');
            Categoria.findAll().then(function (categoria) {
                res.json(categoria)
            });
        },
        
        edit: function (req, res) {
            var Categoria = app.get('categoria');
            Categoria.find(req.body.id_Categoria).then(function (categoria) {
                if(categoria){
                    categoria.updateAttributes({
                        id_Categoria: req.body.id_Categoria,
                        nombre : req.body.nombre
                    }).then(function (categoria) {
                        res.json(categoria)
                    });
                }else{
                    res.status(404).send({message: "Categoria no encontrada"})
                }
            });
        },
        
        delete:function (req, res) {
            var Categoria = app.get('categoria');
            Categoria.destroy({
                where: {
                    id_Categoria: req.body.id_Categoria
                }
            }).then(function (categoria) {
                res.json(categoria)
            });
        },
        
        find: function (req, res) {
            var Categoria = app.get('categoria');
            Categoria.find(req.body.id_Categoria).then(function (categoria) {
                if(categoria){
                    res.json(categoria);
                }else {
                    res.status(404).send({message: "Categoria no encontrada"})
                }
            });
        }
    }
};