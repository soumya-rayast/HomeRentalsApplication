const router = require("express").Router();
const Booking = require("../models/Booking")

// create booking
router.post("/", async (req, res) => {
    try {
        const { customerId, hostId, listingId, startDate, endDate, totalPrice } = req.query;
        const newBooking = new ({ customerId, hostId, listingId, startDate, endDate, totalPrice })
        await newBooking.save();
        res.status(200).json(newBooking);
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: "Fail to create a new Booking", error: err.message })
    }
})
module.exports = router;