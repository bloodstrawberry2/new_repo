const axios = require("axios");
const cheerio = require("cheerio");
const nodemailer = require("nodemailer");

const emailID = process.env.EMAIL_ID;
const password = process.env.PASSWORD;

const sendEmail = async (text) => {
  // 네이버
  const transporter = nodemailer.createTransport({
    service: "naver",
    host: "smtp.naver.com", // 사용할 이메일 서비스의 호스트 주소
    port: 465, // 이메일 서비스의 포트 번호 (25, 587, 465, 2525 등)
    auth: { user: emailID, pass: password },
  });

  const mailOptions = {
    from: `${emailID}@naver.com`, // from 설정 (naver, daum)
    to: process.env.RECEIVER_EMAIL, // a@hanmail.net, b@hanmail.net : , 로 구분
    subject: "레고 정보 공유", // 제목
    text: text, // 내용    
  };

  transporter.sendMail(mailOptions);
};

const getLegoInfo = async () => {
  const response = await axios.get(url);

  if (response.status !== 200) return;

  const $ = cheerio.load(response.data);

  let emailText = [];
  let check = false;
  $("article.ProductLeaf_wrapper__H0TCb").each((index, element) => {
    const h3Element = $(element).find("h3.ProductLeaf_titleRow__KqWbB");
    const soldOutDiv = $(element).find("div.ProductLeaf_actionRow__het7i");

    const spanText = h3Element.find("a span").text();
    if (h3Element.length > 0) {    
      let legoName = `Article ${index}: ${spanText}`;
      console.log(legoName);      
      emailText.push(legoName);
    }
    
    const aText = soldOutDiv.find("a").text();
    if (soldOutDiv.length > 0) {
      let status = `Soldout ${index}: ${aText}`;
      console.log(`Soldout ${index}: ${aText}`);
      emailText.push(status);
    }

    if(spanText === "아바타:제이크 설리와 그의 아바타") {
      if(aText === "일시품절") {
        check = true;
      }
    }

    console.log("=======================================================");
    emailText.push("=======================================================");
  });

  if(check === true) {
    console.log("send eamil");
    sendEmail(emailText.join("\n"));
  }
};

getLegoInfo();
