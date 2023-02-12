const noShow = true

class UsuariosController {
    login = async (req, res) => {
        res.render('login', {noShow});
    };

    loginError = async (req,res) => {
        res.render('login-error', {noShow});
    };

    registro = async (req,res) => {
        res.render('registro', {noShow});
    };

    registroError = async (req,res) => {
        res.render('registro-error', {noShow});
    };

    logOut = async (req,res) => {
        const user = req.user;
        req.logOut(err => {
        const noShow = true
            res.render('logout', {user, noShow})
        })
    }    
    /*
    obtenerUsuarios = async (req, res) => {
        try {
            let docs = await DAO.listarAll();
            res.status(200).json(docs);
        }catch (error){
            logger.error(error);
        }
    };
    
    obtenerUsuario = async (req, res) => {
        try {
            let doc = await DAO.listar(req.params.id)
            res.status(200).json(doc);
        }catch (error){
            logger.error(error);
        }
    };
    
    actualizarUsuario = async (req, res) => {
        try {
            let id = req.params.id;
            let obj = req.body
            await DAO.actualizar(id, obj);
            res.status(201).json({msg:'Perfil de Usuario Actualizado', new:{...obj}});
        } catch (error){
            logger.error(error);
        }
    };
    
    guardarUsuario = async (req, res) => {
        try{
            let obj = req.body
            let doc = await DAO.guardar(obj);
            res.status(200).json({msg:'Usuario creado', data: doc});
        }catch (error){
            logger.error(error);
        }
    };
    
    borrarUsuario = async ( req, res) => {
        try{
            let id = req.params.id;
            await DAO.borrar(id);
            res.status(200).json({msg:'Perfil de Usuario Borrado'});
        }catch (error){
            logger.error(error);
        }
    };

    borrarUsuarios = async ( req, res) => {
        try{
            await DAO.borrarAll();
            res.status(200).json({msg:'Todos los Usuarios fueron Borrados'});
        } catch (error){
            logger.error(error);
        }
    };*/
};

export default UsuariosController;