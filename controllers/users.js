const User = require("../models/user");
const Listing = require("../models/listing");
const mailer = require("../utils/mailer.js");

module.exports.renderSignupForm = (req, res) => {
  res.render("users/signup.ejs");
};

module.exports.signup = async (req, res, next) => {
  try {
    let { username, email, password } = req.body;
    const newUser = new User({ email, username });
    const registeredUser = await User.register(newUser, password);

    // Fire and forget - don't await email
    mailer.sendWelcomeEmail(email, username).catch((mailErr) => {
      console.log("Email error:", mailErr.message);
    });

    req.login(registeredUser, (err) => {
      if (err) return next(err);
      req.flash("success", "Welcome to Travellust!");
      return res.redirect("/listings");
    });
  } catch (e) {
    req.flash("error", e.message);
    return res.redirect("/signup");
  }
};

module.exports.renderLoginForm = (req, res) => {
  res.render("users/login.ejs");
};

module.exports.login = async (req, res) => {
  req.flash("success", "Welcome back to Travellust!");
  let redirectUrl = res.locals.redirectUrl || "/listings";
  res.redirect(redirectUrl);
};

module.exports.logout = (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    req.flash("success", "You are logged out!");
    res.redirect("/listings");
  });
};

// Show Profile
module.exports.renderProfile = async (req, res) => {
  const user = await User.findById(req.user._id);
  const myListings = await Listing.find({ owner: req.user._id });
  
  // Count total bookings made by user
  const allListings = await Listing.find({});
  let myBookings = [];
  allListings.forEach(listing => {
    listing.bookings.forEach(booking => {
      if (booking.user && booking.user.toString() === req.user._id.toString()) {
        myBookings.push({ listing, booking });
      }
    });
  });

  res.render("users/profile.ejs", { user, myListings, myBookings });
};

// Edit Profile
module.exports.renderEditProfile = async (req, res) => {
  const user = await User.findById(req.user._id);
  res.render("users/editProfile.ejs", { user });
};

// Update Profile
module.exports.updateProfile = async (req, res) => {
  const { fullName, bio, phone } = req.body;
  await User.findByIdAndUpdate(req.user._id, { fullName, bio, phone });
  req.flash("success", "Profile updated successfully!");
  res.redirect("/profile");
};