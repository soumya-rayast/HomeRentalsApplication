const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');

// Create booking
router.post('/', async (req, res) => {
    try {
        const { customerId, hostId, listingId, startDate, endDate, totalPrice } = req.body;

        // Validate required fields
        if (!customerId || !hostId || !listingId || !startDate || !endDate || !totalPrice) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        // Create a new booking
        const newBooking = new Booking({
            customerId,
            hostId,
            listingId,
            startDate,
            endDate,
            totalPrice
        });

        // Save the booking
        await newBooking.save();

        // Respond with the new booking
        res.status(201).json(newBooking);
    } catch (err) {
        console.error("Error creating booking:", err.message);
        res.status(400).json({ message: "Failed to create a new booking", error: err.message });
    }
});

module.exports = router;
