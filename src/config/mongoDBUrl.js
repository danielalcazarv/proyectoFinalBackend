import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });

let mongodbUrl;

switch (process.env.PERS){
    case 'MONGODB_ATLAS':
        mongodbUrl = process.env.MONGODB_ATLAS_URL;
        break
    default:
        mongodbUrl = process.env.MONGODB_URL;
};

export default mongodbUrl;