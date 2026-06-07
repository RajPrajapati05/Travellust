const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl, isLoggedIn } = require("../middleware.js");
const userController = require("../controllers/users.js");
const Listing = require("../models/listing.js");

router.route("/signup")
  .get(userController.renderSignupForm)
  .post(wrapAsync(userController.signup));

router.route("/login")
  .get(userController.renderLoginForm)
  .post(
    saveRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: '/login',
      failureFlash: true
    }),
    userController.login
  );

router.get("/logout", userController.logout);

// Profile Routes
router.get("/profile", isLoggedIn, wrapAsync(userController.renderProfile));
router.get("/profile/edit", isLoggedIn, wrapAsync(userController.renderEditProfile));
router.post("/profile/update", isLoggedIn, wrapAsync(userController.updateProfile));

// Host Dashboard
router.get("/dashboard", isLoggedIn, wrapAsync(async (req, res) => {
  const myListings = await Listing.find({ owner: req.user._id });

  let totalBookings = 0;
  let totalEarnings = 0;

  const listingsWithBookings = myListings.map(listing => {
    const bookings = listing.bookings || [];
    totalBookings += bookings.length;
    const earnings = bookings.reduce((sum, b) => sum + (b.totalPrice || 0), 0);
    totalEarnings += earnings;
    return { listing, bookings, earnings };
  });

  res.render("users/dashboard.ejs", {
    listingsWithBookings,
    totalListings: myListings.length,
    totalBookings,
    totalEarnings,
  });
}));

module.exports = router;