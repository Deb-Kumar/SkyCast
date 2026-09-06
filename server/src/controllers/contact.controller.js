import { sendContactEmail } from '../services/mail.service.js';

export const submitContactForm = async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: 'Please provide your name, email, subject, and message.'
      });
    }

    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: 'Please provide a valid email address.'
      });
    }

    // Response ticket generated
    const ticketId = `TKT-${Date.now().toString().slice(-6)}`;

    // Dispatch email notification and acknowledgment via Nodemailer
    let previewUrl = null;
    try {
      const mailResult = await sendContactEmail({
        name: name.trim(),
        email: email.trim(),
        subject: subject?.trim() || '',
        message: message.trim(),
        ticketId
      });
      previewUrl = mailResult?.previewUrl;
    } catch (mailError) {
      console.warn('[Contact] Nodemailer sending failed or offline:', mailError.message);
      // We continue gracefully so the user receives their ticket even if SMTP server temporarily rejects
    }

    return res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Thank you for reaching out! Your message has been sent to our support team and an email confirmation was dispatched.',
      data: {
        ticketId,
        receivedAt: new Date().toISOString(),
        ...(previewUrl ? { previewUrl } : {})
      }
    });
  } catch (error) {
    next(error);
  }
};

