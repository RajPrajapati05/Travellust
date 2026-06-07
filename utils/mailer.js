const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Welcome email after signup
module.exports.sendWelcomeEmail = async (userEmail, username) => {
  try {
    await transporter.sendMail({
      from: `"Travellust ✈️" <${process.env.EMAIL}>`,
      to: userEmail,
      subject: "Welcome to Travellust! 🎉",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #fe424d; padding: 2rem; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="color: white; margin: 0;">✈️ Welcome to Travellust!</h1>
          </div>
          <div style="background: #f9f9f9; padding: 2rem; border-radius: 0 0 8px 8px;">
            <h2>Hi ${username}! 👋</h2>
            <p>Welcome to Travellust — your home for amazing travel stays!</p>
            <ul>
              <li>🏠 Browse thousands of listings</li>
              <li>📍 Find places by location</li>
              <li>⭐ Leave reviews</li>
              <li>🏡 List your own property</li>
            </ul>
            <a href="https://travellust-c2wy.onrender.com/listings" 
               style="background:#fe424d; color:white; padding:0.75rem 2rem; border-radius:25px; text-decoration:none; display:inline-block; margin-top:1rem;">
              Start Exploring 🚀
            </a>
            <p style="margin-top:2rem; color:#888; font-size:0.85rem;">
              Happy travels! — The Travellust Team
            </p>
          </div>
        </div>
      `,
    });
    console.log("Welcome email sent to:", userEmail);
  } catch (err) {
    console.error("Email error:", err);
  }
};

// New listing email
module.exports.sendListingEmail = async (userEmail, username, listing) => {
  try {
    await transporter.sendMail({
      from: `"Travellust ✈️" <${process.env.EMAIL}>`,
      to: userEmail,
      subject: "Your listing is live on Travellust! 🏠",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #fe424d; padding: 2rem; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="color: white; margin: 0;">🏠 Listing Created!</h1>
          </div>
          <div style="background: #f9f9f9; padding: 2rem; border-radius: 0 0 8px 8px;">
            <h2>Hi ${username}! 👋</h2>
            <p>Your listing is now live on Travellust!</p>
            <div style="background:white; padding:1rem; border-radius:8px; border:1px solid #eee;">
              <h3 style="color:#fe424d;">${listing.title}</h3>
              <p>📍 ${listing.location}, ${listing.country}</p>
              <p>💰 ₹${listing.price}/night</p>
              <p>📝 ${listing.description}</p>
            </div>
            <a href="https://travellust-c2wy.onrender.com/listings" 
               style="background:#fe424d; color:white; padding:0.75rem 2rem; border-radius:25px; text-decoration:none; display:inline-block; margin-top:1rem;">
              View Your Listing 🚀
            </a>
            <p style="margin-top:2rem; color:#888; font-size:0.85rem;">
              Happy hosting! — The Travellust Team
            </p>
          </div>
        </div>
      `,
    });
    console.log("Listing email sent to:", userEmail);
  } catch (err) {
    console.error("Email error:", err);
  }
};