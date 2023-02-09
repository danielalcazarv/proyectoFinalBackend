import passport from 'passport';
import bCrypt from "bcrypt";
import JWTStrategy from '../services/jwt.js';
import { logger } from '../utils/logger.js';
import { Strategy } from "passport-local";
//import { buscarUsuarios, crearUsuario } from '../controllers/users.controller.js';
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
passport.use(
    'login' ,
    new LocalStrategy(
    async (username, password, done) => {
        try {
            const user = await buscarUsuarios(username);
            if (user) {
                if ( verifyPass(user, password) ) {
                    return done(null, user);
                } else {
                    logger.info("password incorrecto");
                    return done(null, false);
                }
            } else {
                logger.info(`Usuario ${username} no encontrado`);
                return done(null, false);
            }
        } catch (error) {
            logger.error(error);
        }   
    })
);

passport.use(
    'signup',
    new LocalStrategy(
        {
            passReqToCallback: true,
        },
        async (req, username, password, done) => {
            try {
                let usuario = await buscarUsuarios(username);
                let newUser;
                const { checkPassword } = req.body;;
                if(usuario) {
                    logger.info('Usuario existente');
                    return done (null, false);
                }else if (password !== checkPassword){
                    logger.info('Las contraseñas no coinciden');
                    return done (null, false);                    
                }else{
                    logger.info('Pasamos a crear al usuario');
                    const { 
                        username, 
                        password, 
                        name,
                        phone,
                        age,
                        address,
                        avatar
                    } = req.body;
                    const nuevoUsuario = await crearUsuario({
                        userEmail: username ,
                        password: generateHashPassword(password),
                        name : name ,
                        phone : phone ,
                        age : age ,
                        address : address ,
                        avatar : avatar
                    });
                    newUser = await buscarUsuarios(username);
                }
                logger.info('usuario creado ');
                return done(null, newUser);
                
            } catch (error) {
                logger.error( 'Error en el strategy de signup' , error);
            }
        }
    )
);

passport.use(JWTStrategy);

export default passport;