// The models folder in a project typically contains data models or schemas that define the structure of your data and how it’s stored in the database.

const mongoose = require("mongoose");
const Review = require("../models/review");

const listingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    type: String,
    default: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?q=80&w=1032&auto=format&fit=crop",
    set: v => v || "https://images.unsplash.com/photo-1564501049412-61c2a3083791?q=80&w=1032&auto=format&fit=crop"
  },
  price: Number,
  location: String,
  country: String,
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review"
    }
  ],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
});

// Delete all reviews associated with a listing when it’s deleted
listingSchema.post("findOneAndDelete", async function(listing) {
  if(listing){
    await Review.deleteMany({ _id: { $in: listing.reviews } });
  }
});

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;

