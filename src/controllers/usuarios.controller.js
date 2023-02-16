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
        res.render('logout', {user, noShow});
        })
    };

    perfil = async (req, res) => {
        const user = req.user;
        res.render('perfil', {user});
    }
};

export default UsuariosController;