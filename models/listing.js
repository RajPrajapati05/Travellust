const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

const bookingSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  checkIn: {
    type: Date,
    required: true,
  },
  checkOut: {
    type: Date,
    required: true,
  },
  totalPrice: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const listingSchema = new Schema({
  title: { type: String, required: true },
  description: String,
 image: { url: String, filename: String },
images: [{ url: String, filename: String }],
  price: Number,
  location: String,
  country: String,
  reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
  owner: { type: Schema.Types.ObjectId, ref: "User" },
  geometry: {
    type: {
      type: String,
      enum: ["Point"],
      required: false,
    },
    coordinates: {
      type: [Number],
      required: false,
    },
  },
  bookings: [bookingSchema],
});

listingSchema.post("findOneAndDelete", async (listing) => {
  if (listing) {
    await Review.deleteMany({ _id: { $in: listing.reviews } });
  }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;