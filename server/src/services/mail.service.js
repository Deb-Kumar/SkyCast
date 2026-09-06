import nodemailer from 'nodemailer';

/**
 * Creates and returns a Nodemailer transporter.
 * Supports Gmail, custom SMTP, or automatic test accounts.
 */
export const createMailTransporter = async () => {
  // If SMTP credentials provided in environment
  if (process.env.SMTP_USER && process.env.SMTP_PASS) {
    if (process.env.SMTP_HOST) {
      return nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || '587', 10),
        secure: process.env.SMTP_SECURE === 'true' || process.env.SMTP_PORT === '465',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS
        },
        tls: {
          rejectUnauthorized: false
        }
      });
    }

    // Default to well-known service (e.g. Gmail)
    return nodemailer.createTransport({
      service: process.env.SMTP_SERVICE || 'gmail',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      },
      tls: {
        rejectUnauthorized: false
      }
    });
  }

  // Fallback: create an Ethereal test transporter for local development / testing
  try {
    const testAccount = await nodemailer.createTestAccount();
    return nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass
      }
    });
  } catch (error) {
    console.warn('[MailService] Failed to create Ethereal test account, using JSON transport fallback:', error.message);
    return nodemailer.createTransport({ jsonTransport: true });
  }
};

/**
 * Sends:
 * 1. Full Contact Form Inquiry (Name, Email, Subject, Message) to debkumarpayra32@gmail.com
 * 2. Support Ticket Tracking Alert to devkumar.workspace@gmail.com
 * 3. Acknowledgment Confirmation to the submitting user's email
 */
export const sendContactEmail = async ({ name, email, subject, message, ticketId }) => {
  const transporter = await createMailTransporter();
  const contactInquiryReceiver = process.env.CONTACT_INQUIRY_RECEIVER || process.env.CONTACT_EMAIL_RECEIVER || 'debkumarpayra32@gmail.com';
  const supportTicketReceiver = process.env.SUPPORT_TICKET_RECEIVER || 'devkumar.workspace@gmail.com';
  const senderFrom = `${name} via SkyCast <${process.env.SMTP_USER || 'devkumar.workspace@gmail.com'}>`;
  const systemFrom = `"SkyCast Support System" <${process.env.SMTP_USER || 'devkumar.workspace@gmail.com'}>`;

  console.log(`[MailService] Dispatching contact inquiry (${ticketId}) from ${email}...`);
  console.log(`[MailService] -> Contact Form Details going to: ${contactInquiryReceiver}`);
  console.log(`[MailService] -> Support Ticket Alert going to: ${supportTicketReceiver}`);

  // 1. Contact Form Inquiry Email -> debkumarpayra32@gmail.com
  const contactFormMailOptions = {
    from: senderFrom,
    to: contactInquiryReceiver,
    replyTo: `"${name}" <${email}>`,
    subject: `[SkyCast Contact Message] ${subject || 'New Inquiry'} (${ticketId})`,
    text: `New SkyCast Contact Form Submission:\n\nTicket ID: ${ticketId}\nSender Name: ${name}\nSender Email: ${email}\nSubject: ${subject || 'General Inquiry'}\n\nMessage:\n${message}\n\nSubmitted at: ${new Date().toLocaleString()}`,
    html: `
      <div style="font-family: Arial, sans-serif; background-color: #0b0f19; color: #e2e8f0; padding: 24px; border-radius: 16px; max-width: 600px; margin: 0 auto;">
        <div style="text-align: center; border-bottom: 1px solid #1e293b; padding-bottom: 16px; margin-bottom: 20px;">
          <h1 style="color: #38bdf8; margin: 0; font-size: 24px;">🌦️ SkyCast Contact Form</h1>
          <p style="color: #94a3b8; font-size: 13px; margin-top: 4px;">Direct User Inquiry Details</p>
        </div>

        <div style="background-color: #1e293b; padding: 18px; border-radius: 12px; margin-bottom: 16px;">
          <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
            <tr>
              <td style="color: #94a3b8; padding: 6px 0; width: 130px;"><strong>Ticket ID:</strong></td>
              <td style="color: #38bdf8; font-weight: bold;">${ticketId}</td>
            </tr>
            <tr>
              <td style="color: #94a3b8; padding: 6px 0;"><strong>Sender Name:</strong></td>
              <td style="color: #f8fafc; font-weight: 600;">${name}</td>
            </tr>
            <tr>
              <td style="color: #94a3b8; padding: 6px 0;"><strong>Sender Email:</strong></td>
              <td><a href="mailto:${email}" style="color: #38bdf8; text-decoration: none; font-weight: 600;">${email}</a></td>
            </tr>
            <tr>
              <td style="color: #94a3b8; padding: 6px 0;"><strong>Subject / Topic:</strong></td>
              <td style="color: #f8fafc;">${subject || 'General Inquiry'}</td>
            </tr>
            <tr>
              <td style="color: #94a3b8; padding: 6px 0;"><strong>Submitted At:</strong></td>
              <td style="color: #cbd5e1;">${new Date().toLocaleString()}</td>
            </tr>
          </table>
        </div>

        <div style="background-color: #0f172a; padding: 18px; border-radius: 12px; border: 1px solid #334155; margin-bottom: 20px;">
          <h3 style="color: #38bdf8; margin: 0 0 10px 0; font-size: 14px;">User Message:</h3>
          <p style="color: #e2e8f0; font-size: 14px; line-height: 1.6; white-space: pre-wrap; margin: 0;">${message}</p>
        </div>

        <div style="text-align: center; border-top: 1px solid #1e293b; padding-top: 14px; font-size: 11px; color: #64748b;">
          SkyCast Meteorological Platform • Direct Contact Router
        </div>
      </div>
    `
  };

  // 2. Support Ticket Notification Email -> devkumar.workspace@gmail.com
  const supportTicketMailOptions = {
    from: systemFrom,
    to: supportTicketReceiver,
    replyTo: `"${name}" <${email}>`,
    subject: `[Support Ticket Generated - ${ticketId}] ${subject || 'New Support Ticket'}`,
    text: `SkyCast Support Ticket Logged:\n\nTicket Reference: ${ticketId}\nStatus: OPEN\nRequester: ${name} (${email})\nSubject: ${subject || 'General Support'}\n\nSummary:\n${message}\n\nTimestamp: ${new Date().toLocaleString()}`,
    html: `
      <div style="font-family: Arial, sans-serif; background-color: #0b0f19; color: #e2e8f0; padding: 24px; border-radius: 16px; max-width: 600px; margin: 0 auto;">
        <div style="text-align: center; border-bottom: 1px solid #1e293b; padding-bottom: 16px; margin-bottom: 20px;">
          <h1 style="color: #818cf8; margin: 0; font-size: 24px;">🎫 Support Ticket Created</h1>
          <p style="color: #94a3b8; font-size: 12px; margin-top: 4px;">SkyCast Helpdesk & Ticket Management</p>
        </div>

        <div style="background-color: #1e293b; padding: 18px; border-radius: 12px; margin-bottom: 16px;">
          <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
            <tr>
              <td style="color: #94a3b8; padding: 6px 0; width: 130px;"><strong>Ticket Number:</strong></td>
              <td style="color: #818cf8; font-weight: bold; font-size: 15px;">${ticketId}</td>
            </tr>
            <tr>
              <td style="color: #94a3b8; padding: 6px 0;"><strong>Status:</strong></td>
              <td><span style="background-color: #10b98120; color: #34d399; border: 1px solid #10b98140; padding: 2px 8px; border-radius: 9999px; font-weight: bold; font-size: 11px;">OPEN</span></td>
            </tr>
            <tr>
              <td style="color: #94a3b8; padding: 6px 0;"><strong>Requester:</strong></td>
              <td style="color: #f8fafc;">${name} (<a href="mailto:${email}" style="color: #818cf8; text-decoration: none;">${email}</a>)</td>
            </tr>
            <tr>
              <td style="color: #94a3b8; padding: 6px 0;"><strong>Category/Subject:</strong></td>
              <td style="color: #f8fafc;">${subject || 'General Support'}</td>
            </tr>
            <tr>
              <td style="color: #94a3b8; padding: 6px 0;"><strong>Logged At:</strong></td>
              <td style="color: #cbd5e1;">${new Date().toLocaleString()}</td>
            </tr>
          </table>
        </div>

        <div style="background-color: #0f172a; padding: 16px; border-radius: 12px; border: 1px solid #334155; margin-bottom: 20px;">
          <h4 style="color: #818cf8; margin: 0 0 8px 0; font-size: 13px;">Ticket Description:</h4>
          <p style="color: #cbd5e1; font-size: 13px; line-height: 1.5; margin: 0;">${message}</p>
        </div>

        <div style="text-align: center; border-top: 1px solid #1e293b; padding-top: 14px; font-size: 11px; color: #64748b;">
          Automated Support Dispatch • SkyCast Meteorological System
        </div>
      </div>
    `
  };

  // 3. Acknowledgment Confirmation Email -> Submitting User
  const userAckMailOptions = {
    from: `"SkyCast Support" <${process.env.SMTP_USER || 'support@skycast.ai'}>`,
    to: email,
    subject: `We have received your message! [${ticketId}]`,
    text: `Hello ${name},\n\nThank you for reaching out to SkyCast! We have received your inquiry (Ticket: ${ticketId}) regarding "${subject || 'Support Request'}".\n\nOur team will review your message and respond as quickly as possible.\n\nBest regards,\nThe SkyCast Meteorological Team`,
    html: `
      <div style="font-family: Arial, sans-serif; background-color: #0b0f19; color: #e2e8f0; padding: 24px; border-radius: 16px; max-width: 600px; margin: 0 auto;">
        <div style="text-align: center; border-bottom: 1px solid #1e293b; padding-bottom: 16px; margin-bottom: 20px;">
          <h1 style="color: #38bdf8; margin: 0; font-size: 24px;">🌦️ SkyCast Weather</h1>
          <p style="color: #94a3b8; font-size: 13px; margin-top: 4px;">Inquiry Received Confirmation</p>
        </div>

        <p style="font-size: 14px; line-height: 1.6; color: #f8fafc;">
          Hello <strong>${name}</strong>,
        </p>

        <p style="font-size: 14px; line-height: 1.6; color: #cbd5e1;">
          Thank you for contacting the SkyCast Meteorological Intelligence team! We have received your submission and generated a tracked support ticket:
        </p>

        <div style="background-color: #1e293b; padding: 14px 20px; border-radius: 12px; margin: 16px 0; text-align: center;">
          <span style="font-size: 12px; color: #94a3b8; display: block;">Tracking Reference</span>
          <span style="font-size: 20px; font-weight: bold; color: #38bdf8; letter-spacing: 1px;">${ticketId}</span>
        </div>

        <div style="background-color: #0f172a; padding: 14px; border-radius: 10px; border: 1px solid #334155; margin-bottom: 20px;">
          <p style="font-size: 12px; color: #94a3b8; margin: 0 0 6px 0;"><strong>Summary of your inquiry:</strong></p>
          <p style="font-size: 13px; color: #e2e8f0; margin: 0; font-style: italic;">"${message.slice(0, 160)}${message.length > 160 ? '...' : ''}"</p>
        </div>

        <p style="font-size: 13px; line-height: 1.6; color: #94a3b8;">
          Our support staff will review your message and respond directly to this email address within 24 hours (under 2 hours for urgent storm inquiries).
        </p>

        <div style="text-align: center; border-top: 1px solid #1e293b; padding-top: 16px; margin-top: 24px; font-size: 11px; color: #64748b;">
          © ${new Date().getFullYear()} SkyCast AI Platform • Kolkata & Global Weather Intelligence
        </div>
      </div>
    `
  };

  // Dispatch Email 1: Contact Form details -> debkumarpayra32@gmail.com
  const contactFormInfo = await transporter.sendMail(contactFormMailOptions);
  console.log(`[MailService] Contact form inquiry delivered to ${contactInquiryReceiver} (ID: ${contactFormInfo.messageId})`);

  // Dispatch Email 2: Support Ticket -> devkumar.workspace@gmail.com
  let ticketInfo = null;
  try {
    ticketInfo = await transporter.sendMail(supportTicketMailOptions);
    console.log(`[MailService] Support ticket notification delivered to ${supportTicketReceiver} (ID: ${ticketInfo.messageId})`);
  } catch (ticketError) {
    console.warn('[MailService] Support ticket dispatch skipped or failed:', ticketError.message);
  }

  // Dispatch Email 3: Acknowledgment -> User Email
  let previewUrl = null;
  try {
    const userAckInfo = await transporter.sendMail(userAckMailOptions);
    console.log(`[MailService] User confirmation email delivered to ${email} (ID: ${userAckInfo.messageId})`);

    if (nodemailer.getTestMessageUrl) {
      previewUrl = nodemailer.getTestMessageUrl(contactFormInfo) || nodemailer.getTestMessageUrl(userAckInfo);
      if (previewUrl) {
        console.log('[MailService] Preview Ethereal URL:', previewUrl);
      }
    }
  } catch (ackError) {
    console.warn('[MailService] User acknowledgment email skipped or failed:', ackError.message);
  }

  return {
    contactFormInfo,
    ticketInfo,
    previewUrl
  };
};
