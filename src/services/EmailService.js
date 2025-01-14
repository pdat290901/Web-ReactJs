// const nodemailer = require("nodemailer");
// const dotenv = require("dotenv");
// dotenv.config();

// const sendEmailCreateOrder = async () => {
//   const transporter = nodemailer.createTransport({
//     host: "smtp.gmail.com",
//     port: 465,
//     secure: true, // true for port 465, false for other ports
//     auth: {
//       user: process.env.MAIL_ACCOUNT,
//       pass: process.env.MAIL_PASSWORD,
//     },
//   });

//   // async..await is not allowed in global scope, must use a wrapper
//   async function main() {
//     // send mail with defined transport object
//     const info = await transporter.sendMail({
//       from: "phatdatnguyen31@gmail.com", // sender address
//       to: "datnancy147@gmail.com , phatdatnguyen31@gmail.com", // list of receivers
//       subject: "Hello ✔", // Subject line
//       text: "Hello world?", // plain text body
//       html: "<b>Hello world?</b>", // html body
//     });
//   }
// };
// module.exports = {
//   sendEmailCreateOrder,
// };




const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

const sendEmailCreateOrder = async (email, orderItems) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for port 465, false for other ports
    auth: {
      user: process.env.MAIL_ACCOUNT,
      pass: process.env.MAIL_PASSWORD,
    },
  });

    let listItem = '';
    const attachImage = []
    orderItems.forEach((order)=>{
        listItem += `<div>
                        <div>
                            <div> Sản phẩm: <b> ${order?.name}</b></div>
                            <div> Só lượng: <b> ${order?.amount}</b></div>
                            <div> Giá: <b> ${order?.price}</b></div>                         
                        </div>
                      </div>`
                      attachImage.push({path: order.image});
    })
  // Hàm gửi email chính
  async function main() {
    try {
      const info = await transporter.sendMail({
        from: process.env.MAIL_ACCOUNT, // Địa chỉ người gửi
        to: process.env.MAIL_ACCOUNT, // Địa chỉ người nhận
        subject: "Bạn đã đặt hàng thành công", // Tiêu đề email
        text: "Hello world?", // Nội dung văn bản thuần
        html: `<div> <b> Bạn đã đặt hàng thành công tại shop </b></div> ${listItem}`,
        attachments: attachImage,
      });
      console.log("Message sent: %s", info.messageId); // In ra thông báo khi gửi thành công
    } catch (error) {
      console.error("Error sending email:", error); // In ra lỗi nếu xảy ra
    }
  }

  // Gọi hàm main để gửi email
  await main();
};

module.exports = {
  sendEmailCreateOrder,
};
