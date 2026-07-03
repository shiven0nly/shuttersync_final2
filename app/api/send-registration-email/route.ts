import { NextRequest, NextResponse } from 'next/server';
import Mailjet from 'node-mailjet';

const mailjet = new Mailjet({
    apiKey: process.env.NEXT_PUBLIC_MAILJET_API_KEY!,
    apiSecret: process.env.NEXT_PUBLIC_MAILJET_SECRET_KEY!,
});

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { toEmail, toName } = body;

        if (!toEmail || !toName) {
            return NextResponse.json({ error: 'Email and name are required.' }, { status: 400 });
        }

        const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Registration Confirmed — Photography Vision</title>
</head>
<body style="margin:0;padding:0;background-color:#f8f7f4;font-family:'Georgia',serif;">

    <!-- Wrapper -->
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f8f7f4;padding:48px 16px;">
        <tr>
            <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border:1px solid #e8e5e0;border-radius:4px;overflow:hidden;">

                    <!-- Header Bar -->
                    <tr>
                        <td style="background:#111010;padding:32px 48px;text-align:center;">
                            <p style="margin:0;color:#9e9e9e;font-size:10px;letter-spacing:0.3em;text-transform:uppercase;font-family:'Arial',sans-serif;">ShutterSync Masterclass Series</p>
                            <h1 style="margin:16px 0 0;color:#ffffff;font-size:42px;font-weight:300;font-style:italic;letter-spacing:-0.5px;line-height:1.1;">Photography<br/>Vision</h1>
                            <p style="margin:12px 0 0;color:#6e6e6e;font-size:11px;letter-spacing:0.25em;text-transform:uppercase;font-family:'Arial',sans-serif;">by Sachin Sudarsanan</p>
                        </td>
                    </tr>

                    <!-- Thin accent line -->
                    <tr><td style="height:3px;background:linear-gradient(90deg,#2d2d2d,#555,#2d2d2d);"></td></tr>

                    <!-- Main Content -->
                    <tr>
                        <td style="padding:48px 48px 32px;">

                            <!-- Greeting -->
                            <p style="margin:0 0 8px;font-size:11px;color:#9e9e9e;letter-spacing:0.2em;text-transform:uppercase;font-family:'Arial',sans-serif;">Hello,</p>
                            <h2 style="margin:0 0 24px;font-size:28px;color:#111010;font-weight:400;font-style:italic;">${toName}</h2>

                            <div style="width:32px;height:1px;background:#d0ccc6;margin-bottom:24px;"></div>

                            <p style="margin:0 0 20px;font-size:16px;color:#3a3a3a;line-height:1.8;font-weight:400;">Your registration for the <strong style="font-weight:600;color:#111010;">Photography Vision Workshop</strong> has been successfully confirmed.</p>

                            <p style="margin:0 0 32px;font-size:14px;color:#6e6e6e;line-height:1.8;font-family:'Arial',sans-serif;">We are reviewing your payment submission. Once verified, you will receive full access details in this email. Until then, please join our community groups below to stay updated.</p>

                            <!-- Registration Confirmed Badge -->
                            <table cellpadding="0" cellspacing="0" style="margin:0 0 40px;">
                                <tr>
                                    <td style="background:#f4f3f0;border:1px solid #e0ddd8;border-radius:4px;padding:20px 28px;">
                                        <p style="margin:0 0 4px;font-size:9px;letter-spacing:0.25em;text-transform:uppercase;color:#9e9e9e;font-family:'Arial',sans-serif;">Status</p>
                                        <p style="margin:0;font-size:18px;color:#111010;font-style:italic;">Registration Pending Verification ✓</p>
                                    </td>
                                </tr>
                            </table>

                            <!-- Divider with label -->
                            <table cellpadding="0" cellspacing="0" width="100%" style="margin-bottom:32px;">
                                <tr>
                                    <td style="border-top:1px solid #e8e5e0;"></td>
                                    <td style="padding:0 16px;white-space:nowrap;font-size:9px;color:#b0aba4;letter-spacing:0.2em;text-transform:uppercase;font-family:'Arial',sans-serif;">Join the Community</td>
                                    <td style="border-top:1px solid #e8e5e0;"></td>
                                </tr>
                            </table>

                            <!-- WhatsApp Group Buttons -->
                            <p style="margin:0 0 16px;font-size:13px;color:#555;line-height:1.7;font-family:'Arial',sans-serif;">Connect with Sachin and your fellow workshop attendees. All workshop dates, materials, and links will be shared via these groups:</p>

                            <table cellpadding="0" cellspacing="0" width="100%" style="margin-bottom:12px;">
                                <tr>
                                    <td align="center">
                                        <a href="https://chat.whatsapp.com/CW5iLBntSka5PqP37L3F3j"
                                           style="display:inline-block;width:100%;max-width:320px;padding:14px 24px;background:#25D366;color:#ffffff;text-decoration:none;font-family:'Arial',sans-serif;font-size:12px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;border-radius:4px;text-align:center;box-sizing:border-box;">
                                            📸 &nbsp; Join Workshop Group
                                        </a>
                                    </td>
                                </tr>
                            </table>

                            <table cellpadding="0" cellspacing="0" width="100%" style="margin-bottom:40px;">
                                <tr>
                                    <td align="center">
                                        <a href="https://chat.whatsapp.com/DdYKdvQZZhB3FV5oSi1NcR"
                                           style="display:inline-block;width:100%;max-width:320px;padding:14px 24px;background:#ffffff;color:#111010;text-decoration:none;font-family:'Arial',sans-serif;font-size:12px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;border-radius:4px;text-align:center;border:1px solid #d0ccc6;box-sizing:border-box;">
                                            🌐 &nbsp; Join General Community Group
                                        </a>
                                    </td>
                                </tr>
                            </table>

                            <!-- What to Expect -->
                            <div style="border-left:2px solid #e0ddd8;padding-left:20px;margin-bottom:40px;">
                                <p style="margin:0 0 8px;font-size:9px;color:#9e9e9e;letter-spacing:0.2em;text-transform:uppercase;font-family:'Arial',sans-serif;">What Happens Next</p>
                                <p style="margin:0 0 10px;font-size:13px;color:#555;line-height:1.7;font-family:'Arial',sans-serif;">① &nbsp;Our team will verify your UPI transaction within 24 hours.</p>
                                <p style="margin:0 0 10px;font-size:13px;color:#555;line-height:1.7;font-family:'Arial',sans-serif;">② &nbsp;You will receive workshop materials and session link via Email.</p>
                                <p style="margin:0;font-size:13px;color:#555;line-height:1.7;font-family:'Arial',sans-serif;">③ &nbsp;Join the WhatsApp groups to stay connected with the community.</p>
                            </div>

                            <!-- Divider with label -->
                            <table cellpadding="0" cellspacing="0" width="100%" style="margin-bottom:28px;">
                                <tr>
                                    <td style="border-top:1px solid #e8e5e0;"></td>
                                    <td style="padding:0 16px;white-space:nowrap;font-size:9px;color:#b0aba4;letter-spacing:0.2em;text-transform:uppercase;font-family:'Arial',sans-serif;">Need Help?</td>
                                    <td style="border-top:1px solid #e8e5e0;"></td>
                                </tr>
                            </table>

                            <p style="margin:0 0 8px;font-size:13px;color:#555;font-family:'Arial',sans-serif;">Facing any issues? Feel free to reach out directly:</p>
                            <p style="margin:0 0 6px;font-size:13px;color:#3a3a3a;font-family:'Arial',sans-serif;">
                                <a href="https://wa.me/919460272387" style="color:#25D366;text-decoration:none;font-weight:600;">💬 +91 94602 72387</a>
                            </p>
                            <p style="margin:0 0 40px;font-size:13px;color:#3a3a3a;font-family:'Arial',sans-serif;">
                                <a href="https://wa.me/919455955981" style="color:#25D366;text-decoration:none;font-weight:600;">💬 +91 94559 55981</a>
                            </p>

                            <p style="margin:0;font-size:15px;color:#3a3a3a;line-height:1.8;font-style:italic;">See you inside,<br/><strong style="font-weight:600;font-style:normal;color:#111010;">The ShutterSync Team</strong></p>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style="background:#f4f3f0;border-top:1px solid #e8e5e0;padding:28px 48px;text-align:center;">
                            <p style="margin:0 0 8px;font-size:10px;color:#9e9e9e;letter-spacing:0.15em;text-transform:uppercase;font-family:'Arial',sans-serif;">ShutterSync Photography Community</p>
                            <p style="margin:0;font-size:10px;color:#b5b1ab;font-family:'Arial',sans-serif;">You received this email because you registered for the Photography Vision Workshop.</p>
                        </td>
                    </tr>

                </table>
            </td>
        </tr>
    </table>

</body>
</html>`;

        const request = await mailjet.post('send', { version: 'v3.1' }).request({
            Messages: [
                {
                    From: {
                        Email: 'shuttersyncofficial@gmail.com',
                        Name: 'ShutterSync Workshops',
                    },
                    To: [
                        {
                            Email: toEmail,
                            Name: toName,
                        },
                    ],
                    Subject: `You're in! Photography Vision Workshop — Registration Confirmed`,
                    HTMLPart: htmlContent,
                    TextPart: `Hi ${toName},\n\nYour registration for the Photography Vision Workshop by Sachin Sudarsanan is confirmed!\n\nJoin Workshop WhatsApp Group: https://chat.whatsapp.com/CW5iLBntSka5PqP37L3F3j\nJoin General Community: https://chat.whatsapp.com/DdYKdvQZZhB3FV5oSi1NcR\n\nFor support: +91 94602 72387 or +91 94559 55981\n\nSee you inside,\nThe ShutterSync Team`,
                },
            ],
        });

        return NextResponse.json({ success: true, messageId: (request.body as any)?.Messages?.[0]?.To?.[0]?.MessageID });
    } catch (error: any) {
        console.error('Mailjet error:', error?.response?.data || error?.message || error);
        return NextResponse.json({ error: 'Failed to send email.' }, { status: 500 });
    }
}
