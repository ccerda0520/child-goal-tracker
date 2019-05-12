import nodemailer from 'nodemailer';
import mg from 'nodemailer-mailgun-transport';

// async..await is not allowed in global scope, must use a wrapper
export async function sendEmail(email: string, url: string) {
    let account = await nodemailer.createTestAccount();
    const mailgunOptions = {
        auth: {
            api_key: process.env.MG_API_KEY as string,
            domain: process.env.MG_DOMAIN as string,
        },
    };
    const mgTransport = mg(mailgunOptions);
    const transporter = nodemailer.createTransport(mgTransport);

    const mailOptions = {
        from: '"Fred Foo 👻" <foo@example.com>', // sender address
        to: email, // list of receivers
        subject: 'Hello ✔', // Subject line
        html: `<a href="${url}">${url}</a>`, // html body
    };

    // send mail with defined transport object
    const info = await transporter.sendMail(mailOptions);
}
