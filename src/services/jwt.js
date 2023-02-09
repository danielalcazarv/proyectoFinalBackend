import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';
//import { UsuariosMongoDBModel } from '../models/UsuariosMongoDB.models.js';
// 
const jwtSecret = process.env.JWT_SECRET;
const Users = UsuariosMongoDBModel;

const cookieExtractor = function (req) {
    let jwt = null; 
    if (req && req.cookies) jwt = req.cookies['jwt'];
    return jwt;
};

export default new JWTStrategy({
    jwtFromRequest: cookieExtractor,
    secretOrKey: jwtSecret,
    }, 
    async (payload, done) => {
        try {
            const user = await Users.findOne({ _id: payload.id });
                if (!user) {
                return done(null, false);
                }
            return done(null, user);
        } catch (error) {
            return done(error, false);
        }
    } 
);
