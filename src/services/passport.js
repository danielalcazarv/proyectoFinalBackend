import passport from 'passport';
import bCrypt from "bcrypt";
import JWTStrategy from '../services/jwt.js';
import { logger } from '../utils/logger.js';
import { Strategy } from "passport-local";
import UsuariosDAOFactory from '../classes/UsuariosDAOFactory.class.js';

const DAO = UsuariosDAOFactory.get();
const LocalStrategy = Strategy;

/*++++++++++ Serialize & funciones ++++++++++ */
passport.serializeUser((usuario, done) => {
    done(null, usuario);
});

passport.deserializeUser((usuario, done) => {
    done(null, usuario);
});

const verifyPass = (usuario, password) =>{
    return bCrypt.compareSync(password, usuario.password);
};

const generateHashPassword = (password) => {
    return bCrypt.hashSync(
        password,
        bCrypt.genSaltSync(10),
        null
    );
};

/*++++++++++ Middlewares ++++++++++ */
passport.use( 'login', new LocalStrategy(
    async function (username, password, done){
        const usuariosDb = await DAO.listarAll()
        const existeUsuario = usuariosDb.find(x=>x.username == username);
        
        if (!existeUsuario) {
            logger.info('No existe el usuario.');
            return done(null, false);
        } else {
            const match = verifyPass(existeUsuario, password);
            if (!match){
                logger.info('La contraseña no coincide.');
                return done(null, false);
            }
            logger.info('Usuario logueado.');
            return done(null, existeUsuario);
        }
    }
));

passport.use(
    'signup',
    new LocalStrategy(
        { passReqToCallback: true },
        async (req, username, password, done) => {
            const usuariosDb = await DAO.listarAll()
            let usuarioCreado;
            try {
                const existeUsuario = usuariosDb.find(x=>x.username == username);
                const { checkPassword } = req.body;
                if (existeUsuario) {
                    logger.info('El usuario ya esta registrado');
                    return done(null, false, { message: 'El usuario ya existe' });
                } 
                else if (password !== checkPassword){
                    logger.info('Las contraseñas no coinciden');
                    return done (null, false);                    
                } 
                else {
                    const { username, password, nombre, telefono } = req.body;
                    const hashPassword = generateHashPassword(password);
                    if (!hashPassword) {
                        logger.info('Error al generar hash de contraseña');
                        return done(null, false);
                    }
                    const usuarioNuevo = await DAO.guardar({
                        username,
                        password: hashPassword,
                        nombre,
                        telefono
                    });
                }
                const newDB = await DAO.listarAll()
                const userWithId= newDB.find(x=>x.username == username);
                logger.info('Nuevo usuario creado con éxito!');
                return done(null, userWithId);
            } catch (error) {
                logger.error('Error en signup', error);
                return done(error);
            }
        }
    )
);

passport.use(JWTStrategy);

export default passport;