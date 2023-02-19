import { createTransport } from "nodemailer";
import { logger } from '../utils/logger.js';
import dotenv from 'dotenv';
dotenv.config();

const EMAIL = process.env.GMAIL;
const EMAIL_PASS = process.env.GMAIL_PASS;

const transporter = createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: EMAIL,
        pass: EMAIL_PASS
    }
});

export const emailUsuarioNuevo = async (user) => {
    const emailContent = {
        from: 'Servidor <noreply@prueba.com.ar>',
        to: EMAIL,
        subject: 'Nuevo Usuario',
        html:  `<html>
                    <h1>Usuario nuevo:</h1>
                    <hr>
                    <p>
                        <span style="font-weight: bolder">
                            ${user.nombre}</span>, username: <span style="font-weight: bolder">${user.username}
                        </span>
                    </p>
                </html>`,
    };

    try {
        const info = await transporter.sendMail(emailContent);
        logger.info('E-mail de usuario nuevo' , info);
    } catch (error) {
        logger.error(error);
    }
};

export const emailOrdenNueva = async (orden, user) => {
    const emailContent = {
        from: 'Servidor <noreply@prueba.com.ar>',
        to: EMAIL,
        subject: 'Nueva orden generada',
        html:  `<html>
                    <h1>Nueva orden generada:</h1>
                    <hr>
                    <p>
                        <span style="font-weight: bolder">De: ${user.nombre}</span>, username: <span style="font-weight: bolder">${user.username}</span>
                    </p>
                    <hr>
                    <p><span style="text-decoration: underline">Pedido generado:</span> ${orden.pedido}</p>
                    <hr>
                    <p><span style="text-decoration: underline">Total USD$:</span> ${orden.total}</p> 
                </html>`,
    };

    try {
        const info = await transporter.sendMail(emailContent);
        logger.info('E-mail de orden nueva' , info);
    } catch (error) {
        logger.error(error);
    };
};