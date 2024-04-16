const mongoose = require("mongoose");
const ListingSchema = new mongoose.Schema({

   creator: {
        type : mongoose.Types.ObjectId,
        ref:'User',
    },
    category: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
    },
    streetAddress: {
        type: String,
        required: true,
    },
    aptSuite: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    province: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    GuestCount: {
        type: Number,
        required: true,
    },
    bedroomCunt: {
        type: Number,
        required: true,
    },
    bedCount: {
        type: Number,
        required: true,
    },
    bathroomCount: {
        type: Number,
        required: true,
    },
    amenities: {
        type: Array,
        default: [{}]
    },
    listingPhotoPaths: [{ type: String }],//for storing phot url
    title: {
        type: String,
        required: true
    },
    highlight: {
        type: String,
        required: true
    },
    highlightDesc: {
        type: String,
        required: true
    },
    price: {
        typeNumber,
        required: true,
    },
}, { timestamps: true }
)
const Listing = mongoose.model('Listing', ListingSchema)
module.exports = Listing