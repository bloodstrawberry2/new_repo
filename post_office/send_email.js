const nodemailer = require("nodemailer");

const emailID = process.env.EMAIL_ID;
const password = process.env.PASSWORD;

const sendEmail = async () => {
  // 네이버
  const transporter = nodemailer.createTransport({
    service: "naver",
    host: "smtp.naver.com", // 사용할 이메일 서비스의 호스트 주소
    port: 465, // 이메일 서비스의 포트 번호 (25, 587, 465, 2525 등)
    auth: { user: emailID, pass: password },
  });

  const mailOptions = {
    from: `${emailID}@naver.com`, // from 설정 (naver, daum)
    to: "bloodstrawberry.library@gmail.com", // a@hanmail.net, b@hanmail.net : , 로 구분
    subject: "누군가 건드리면 안되는 파일을 수정했습니다.", // 제목
    text: "빨랑 확인해보세요.", // 내용    
  };

  transporter.sendMail(mailOptions);
};

sendEmail();
