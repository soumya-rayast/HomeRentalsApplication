const router = require("express").Router();
const multer = require("multer");
const Listing = require("../models/Listing");
const User = require("../models/User");
const mongoose = require('mongoose');
const { GridFsStorage } = require('multer-gridfs-storage');
const path = require('path');
// Configure multer
// Set up storage for GridFS
const storage = new GridFsStorage({
    url: process.env.MONGO_URL,
    dbName: 'StayEase_Rentals',
    file: (req, file) => {
      return {
        bucketName: 'uploads', // The name of the GridFS collection
        filename: `${Date.now()}_${file.originalname}`
      };
    }
  });
  
  const upload = multer({ storage }); 

// Create listing
// Create listing
router.post("/create", upload.array("listingPhotos"), async (req, res) => {
    try {
        const { creator, category, type, streetAddress, aptSuite, city, province, country, GuestCount, bedroomCount, bedCount, bathroomCount, amenities, title, description, highlight, highlightDesc, price } = req.body;

        const listingPhotos = req.files;

        if (!listingPhotos || listingPhotos.length === 0) {
            return res.status(400).json({ message: "No files uploaded." });
        }

        const listingPhotoPaths = listingPhotos.map((file) => file.path);
        const newListing = new Listing({
            creator,
            category,
            type,
            streetAddress,
            aptSuite,
            city,
            province,
            country,
            GuestCount,
            bedroomCount,
            bedCount,
            bathroomCount,
            amenities,
            listingPhotoPaths,
            title,
            description,
            highlight,
            highlightDesc,
            price
        });

        await newListing.save();
        res.status(201).json(newListing);
    } catch (err) {
        res.status(400).json({ message: "Failed to create listing", error: err.message });
        console.log(err);
    }
});
;

// Get listings
router.get("/", async (req, res) => {
    const qCategory = req.query.category;
    try {
        let listings;
        if (qCategory) {
            listings = await Listing.find({ category: qCategory }).populate("creator");
        } else {
            listings = await Listing.find().populate("creator");
        }
        res.status(200).json(listings);
    } catch (err) {
        res.status(404).json({ message: "Failed to fetch listings", error: err.message });
        console.log(err);
    }
});

// Search listings
router.get("/search/:search", async (req, res) => {
    const { search } = req.params;
    try {
        let listings;
        if (search === "all") {
            // Handle 'all' search case if needed
            listings = await Listing.find().populate("creator");
        } else {
            listings = await Listing.find({
                $or: [
                    { category: { $regex: search, $options: "i" } },
                    { title: { $regex: search, $options: "i" } }
                ]
            }).populate("creator");
        }
        res.status(200).json(listings);
    } catch (err) {
        res.status(404).json({ message: "Failed to fetch listings", error: err.message });
        console.log(err);
    }
});

// Listing details
router.get("/:listingId", async (req, res) => {
    const { listingId } = req.params;
    
    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(listingId)) {
        console.log("Invalid listing ID:", listingId);
        return res.status(400).json({ message: "Invalid listing ID" });
    }

    try {
        const listing = await Listing.findById(listingId).populate("creator");
        if (!listing) {
            console.log("Listing not found for ID:", listingId);
            return res.status(404).json({ message: "Listing not found" });
        }
        console.log("Listing found:", listing);
        res.status(200).json(listing); // 200 OK
    } catch (err) {
        console.error("Error fetching listing:", err.message);
        res.status(500).json({ message: "Listing cannot be found", error: err.message });
    }
});


module.exports = router;
