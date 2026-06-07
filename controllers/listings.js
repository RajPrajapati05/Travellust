const Listing = require("../models/listing");
const axios = require("axios");
const mailer = require("../utils/mailer.js");

const User = require("../models/user");

module.exports.index = async (req, res) => {
  let { search, filter } = req.query;
  let allListings;

  if (search) {
    allListings = await Listing.find({
      $or: [
        { title: { $regex: search, $options: "i" } },
        { location: { $regex: search, $options: "i" } },
        { country: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ],
    });
  } else if (filter === "trending") {
    allListings = await Listing.find({}).populate("reviews");
    allListings = allListings
      .sort((a, b) => b.reviews.length - a.reviews.length)
      .slice(0, 6);
  } else if (filter) {
    allListings = await Listing.find({
      $or: [
        { title: { $regex: filter, $options: "i" } },
        { location: { $regex: filter, $options: "i" } },
        { description: { $regex: filter, $options: "i" } },
        { category: { $regex: filter, $options: "i" } },
      ],
    });
  } else {
    allListings = await Listing.find({});
  }

  // Stats for dashboard
  const totalListings = await Listing.countDocuments();
  const totalUsers = await User.countDocuments();
  const countries = await Listing.distinct("country");
  const totalCountries = countries.length;

  res.render("listings/index.ejs", {
    allListings,
    search,
    filter,
    totalListings,
    totalUsers,
    totalCountries,
  });
};

module.exports.renderNewForm = (req, res) => {
  res.render("listings/new.ejs");
};

module.exports.showListing = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    })
    .populate("owner");

  if (!listing) {
    req.flash("error", "Listing you requested for does not exist!");
    return res.redirect("/listings");
  }

  res.render("listings/show.ejs", { listing });
};

module.exports.createListing = async (req, res, next) => {
  let url = req.files && req.files.length > 0
    ? req.files[0].path
    : "https://images.unsplash.com/photo-1625505826533-5c80aca7d157?w=1200";
  let filename = req.files && req.files.length > 0
    ? req.files[0].filename
    : "default";

  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;
  newListing.image = { url, filename };

  // Save additional images
  if(req.files && req.files.length > 1) {
    newListing.images = req.files.slice(1).map(f => ({
      url: f.path,
      filename: f.filename
    }));
  }

  // MapTiler Geocoding
  try {
    let geoUrl = `https://api.maptiler.com/geocoding/${req.body.listing.location}.json?key=${process.env.MAP_TOKEN}`;
    let response = await axios.get(geoUrl);
    if (response.data.features.length > 0) {
      let coords = response.data.features[0].center;
      newListing.geometry = {
        type: "Point",
        coordinates: coords,
      };
    }
  } catch (geoErr) {
    console.log("Geocoding failed:", geoErr.message);
  }

  await newListing.save();

  // Send listing confirmation email
 mailer.sendListingEmail(req.user.email, req.user.username, newListing).catch(console.error);

  req.flash("success", "New Listing Created!");
  res.redirect("/listings");
};

module.exports.renderEditForm = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);

  if (!listing) {
    req.flash("error", "Listing you requested for does not exist!");
    return res.redirect("/listings");
  }

  let originalImageUrl = listing.image.url;
  originalImageUrl = originalImageUrl.replace("/upload", "/upload/h_200,w_250");
  res.render("listings/edit.ejs", { listing, originalImageUrl });
};

module.exports.updateListing = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });

  if (req.files && req.files.length > 0) {
    // First file becomes the main image
    listing.image = {
      url: req.files[0].path,
      filename: req.files[0].filename,
    };
    // Rest go into images array
    if (req.files.length > 1) {
      listing.images = req.files.slice(1).map(f => ({
        url: f.path,
        filename: f.filename,
      }));
    }
    await listing.save();
  }

  req.flash("success", "Listing Updated!");
  res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async (req, res) => {
  let { id } = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  console.log(deletedListing);
  req.flash("success", "Listing Deleted!");
  res.redirect("/listings");
};