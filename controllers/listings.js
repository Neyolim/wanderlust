const Listing = require("../models/listing.js");

module.exports.index = async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
};

module.exports.renderNewForm = (req, res) => {
  res.render("listings/new.ejs");
};

module.exports.showListing = async (req, res) => {
  const { id } = req.params;
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

module.exports.createListing = async (req, res) => {
  let url = req.file.path;
  let filename = req.file.filename;

  const newListing = new Listing(req.body);
  newListing.owner = req.user._id;
  newListing.image = { url, filename };
  await newListing.save();
  req.flash("success", "New Listing Created !");
  console.log(newListing);
  res.redirect(`/listings`);
};

module.exports.editListing = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);

  if (!listing) {
    req.flash("error", "Listing you requested for does not exist!");
    return res.redirect("/listings");
  }

  // generate transformed Cloudinary URL
  let originalImageUrl = listing.image.url;
  let transformedImageUrl = originalImageUrl.replace(
  "/upload",
  "/upload/w_300,h_200,c_fill,q_auto,f_auto"
  );


  res.render("listings/edit.ejs", { listing, transformedImageUrl });
};

module.exports.updateListing = async (req, res) => {
  try {
    const { id } = req.params;

    const listing = await Listing.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
      context: 'query'
    });

    if (req.file) {
      const { path: url, filename } = req.file;
      listing.image = { url, filename };
      await listing.save();
    }

    req.flash("success", "Listing Updated!");
    res.redirect(`/listings/${listing._id}`);
  } catch (err) {
    console.error(err);
    req.flash("error", "Failed to update listing");
    res.redirect(`/listings/${req.params.id}`);
  }
};



module.exports.deleteListing = async (req, res) => {
  const { id } = req.params;
  await Listing.findByIdAndDelete(id);
  req.flash("success", " Listing Deleted !");
  res.redirect("/listings");
};
