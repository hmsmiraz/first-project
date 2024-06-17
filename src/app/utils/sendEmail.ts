import nodemailer from 'nodemailer';
import config from '../config';
export const sendEmail = async (to: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: config.NODE_ENV === 'production', // Use `true` for port 465, `false` for all other ports
    auth: {
      user: 'hmsmiraz64729@gmail.com',
      pass: 'iayz ujdu tkqy dfzl',
    },
  });
  await transporter.sendMail({
    from: '"hmsmiraz64729@gmail.com>', // sender address
    to, // list of receivers
    subject: 'Change Your Password', // Subject line
    text: 'Reset your password by clicking this link within 5 minutes:- ', // plain text body
    html, // html body
  });
};
