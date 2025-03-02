import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
export async function POST(req: NextRequest) {
  try {
    const username = process.env.EMAIL_USERNAME;
    const password = process.env.EMAIL_PASSWORD;
    const { email, name, issue,fileurl } = await req.json();
    const transporter = nodemailer.createTransport({
      port: 500,
      debug: true,
      secure: false,
      service: "gmail",

      auth: {
        user: username,
        pass: password,
      },
    });
    if(fileurl){
      const mail = await transporter.sendMail({
        from: username,
        to: process.env.COMPANY_EMAIL_ID,
        replyTo: process.env.COMPANY_EMAIL_ID,
        subject: `Mail from ShowOFF users.`,
        attachments: [
          {
            filename: 'attachment', 
            path: fileurl, 
          },
        ],
        html: `
                 <body style="font-family: Arial, sans-serif; background-color: #f5f5f5; margin: 0; padding: 0; line-height: 1.6; color: #333;">
             <div style="max-width: 600px; margin: 20px auto; padding: 20px; background-color: #fff; border-radius: 5px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
                 <p>Name: ${name}</p>
                 <p>Email: ${email}</p>
                 <p>Issue: ${issue}</p>
             </div>
         </body>
             `,
      });
    }
    else{
      const mail = await transporter.sendMail({
        from: username,
        to: process.env.COMPANY_EMAIL_ID,
        replyTo: process.env.COMPANY_EMAIL_ID,
        subject: `Mail from ShowOFF users.`,
        html: `
                 <body style="font-family: Arial, sans-serif; background-color: #f5f5f5; margin: 0; padding: 0; line-height: 1.6; color: #333;">
             <div style="max-width: 600px; margin: 20px auto; padding: 20px; background-color: #fff; border-radius: 5px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
                 <p>Name: ${name}</p>
                 <p>Email: ${email}</p>
                 <p>Issue: ${issue}</p>
             </div>
         </body>
             `,
      });
    }
    
    await transporter.sendMail({
      from: username,
      to: email,
      replyTo: email,
      subject: `ShowOFF Customer Support`,
      html: `
               <body style="font-family: Arial, sans-serif; background-color: #f5f5f5; margin: 0; padding: 0; line-height: 1.6; color: #333;">
           <div style="max-width: 600px; margin: 20px auto; padding: 20px; background-color: #fff; border-radius: 5px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
               <p>Thank You Mr./Mrs ${name} for reporting issue</p>
               <p>Your message is deliverd</p>
           </div>
       </body>
           `,
    });
    return new NextResponse(
      JSON.stringify({ message: "Your 📧 mail has been sent." }),
      { status: 201 }
    );
  } catch (error) {
    return new NextResponse(JSON.stringify({ message: "server error." }), {
      status: 501,
    });
  }
}
