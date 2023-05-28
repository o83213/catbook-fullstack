import nodemailer from "nodemailer";
// async..await is not allowed in global scope, must use a wrapper
export const sendEmail = async (eamil: string, url: string) => {
  // const account = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "o83213@gmail.com", // generated ethereal user
      pass: "ptxgkyfamfdqouft", // generated ethereal password
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const mailOptions = {
    from: "o83213@gmail.com", // sender address
    to: eamil, // list of receivers
    subject: "Confirm mail from Chatting.io", // Subject line
    text: "Confirm mail.", // plain text body
    html: `<h3>Hello Dear User</h3>
    <p>
      The link below is the URL to confirm your email, this link will only
      available for 15 mins
    </p>
    <a href="${url}">${url}</a>
    <p>
      If you have any concerns, please email us for better service
    </p>
    <p>Best regards</p>
    <p>Brain</p>`, // html body
  };

  // send mail with defined transport object
  const info = await transporter.sendMail(mailOptions, (err, success) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Email send success!");
    }
  });
};
