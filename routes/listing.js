const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });
const Groq = require("groq-sdk");

// Index + Create
router
  .route("/")
  .get(wrapAsync(listingController.index))
  .post(
    isLoggedIn,
    upload.array("listing[Image]", 5),
    validateListing,
    wrapAsync(listingController.createListing)
  );

// New Listing Form
router.get("/new", isLoggedIn, listingController.renderNewForm);

// Chatbot Route (MUST be before /:id)
router.post("/chatbot", async (req, res) => {
  try {
    const { message } = req.body;
    const listings = await Listing.find({}).lean();
    const listingSummary = listings
      .map(
        (l) =>
          `Title: ${l.title}, Location: ${l.location}, Country: ${l.country}, Price: ₹${l.price}/night, Description: ${l.description}`
      )
      .join("\n");

    const client = new Groq({ apiKey: process.env.GROQ_API_KEY });

    const response = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      max_tokens: 1024,
      messages: [
        {
          role: "system",
          content: `You are a helpful travel assistant for Travellust, an Airbnb-like platform.
          Help users find the perfect listing based on their needs.
          Here are all available listings:
          ${listingSummary}
          Give short, friendly suggestions. If recommending a listing, mention its title, location and price.
          Keep responses under 100 words.`,
        },
        { role: "user", content: message },
      ],
    });

    res.json({ reply: response.choices[0].message.content });
  } catch (err) {
    console.error("CHATBOT ERROR:", err.message);
    res.status(500).json({ reply: "Sorry, I am having trouble responding right now!" });
  }
});

// Trip Planner Route
router.post("/tripplanner", async (req, res) => {
  try {
    const { message } = req.body;

    const listings = await Listing.find({}).lean();
    const listingSummary = listings
      .map(
        (l) =>
          `ID: ${l._id}, Title: ${l.title}, Location: ${l.location}, Country: ${l.country}, Price: ₹${l.price}/night, Description: ${l.description}`
      )
      .join("\n");

    const client = new Groq({ apiKey: process.env.GROQ_API_KEY });

    const response = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      max_tokens: 2048,
      messages: [
        {
          role: "system",
          content: `You are an expert AI Trip Planner for Travellust, an Airbnb-like platform for India.
          
          When user asks to plan a trip, create a detailed day-by-day itinerary.
          
          Available listings in our platform:
          ${listingSummary}
          
          Always structure your response like this:
          🌴 [Trip Title]
          📍 Destination: [place]
          💰 Total Budget: [amount]
          
          📅 Day 1 — [Theme]
          🏠 Recommended Stay: [listing title] - ₹[price]/night
          🌅 Morning: [activity]
          ☀️ Afternoon: [activity]  
          🌙 Evening: [activity]
          
          [repeat for each day]
          
          💰 Budget Summary:
          🏠 Accommodation: ₹[total]
          🍽️ Food estimate: ₹[amount]
          🎯 Activities: ₹[amount]
          ✅ Total: ₹[amount]
          
          💡 Pro Tips: [2-3 tips]
          
          Always recommend listings from our platform that match the location and budget.
          Keep response friendly and exciting!`,
        },
        {
          role: "user",
          content: message,
        },
      ],
    });

    res.json({ reply: response.choices[0].message.content });
  } catch (err) {
    console.error("TRIP PLANNER ERROR:", err.message);
    res.status(500).json({ reply: "Sorry, trip planning failed. Please try again!" });
  }
});

// Booking Route (MUST be before /:id)
router.post("/:id/book", isLoggedIn, wrapAsync(async (req, res) => {
  const { checkIn, checkOut } = req.body;
  const listing = await Listing.findById(req.params.id);

  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);

  if (checkInDate >= checkOutDate) {
    req.flash("error", "Check-out date must be after check-in date!");
    return res.redirect(`/listings/${req.params.id}`);
  }

  const days = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
  const totalPrice = days * listing.price;

  listing.bookings.push({
    user: req.user._id,
    checkIn: checkInDate,
    checkOut: checkOutDate,
    totalPrice,
  });

  await listing.save();
  req.flash("success", `Booking confirmed! ₹${totalPrice.toLocaleString("en-IN")} for ${days} nights 🎉`);
  res.redirect(`/listings/${req.params.id}`);
}));

// Show + Update + Delete
router
  .route("/:id")
  .get(wrapAsync(listingController.showListing))
  .put(
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.updateListing)
  )
  .delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));

// Edit Route
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.renderEditForm)
);

module.exports = router;