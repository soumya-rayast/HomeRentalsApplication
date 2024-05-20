const router = require("express").Router();
const Booking = require("../models/Booking");
const User = require("../models/User");
const Listing = require("../models/Listing")
// Get TRIP List
router.get("/:userId/trips", async (req, res) => {
    try {
        const { userId } = req.params
        const trips = await Booking.find({ customerId: userId }).populate("customerId hostId listingId");
        res.status(202).json(trips);
    }
    catch (err) {
        console.log(err);
        res.status(404).json({ message: "Can not find trips!", error: err.message });
    }
})
router.patch("/:userId/:listingId", async (req, res) => {
    try {
        const { userId, listingId } = req.params;
        const user = await User.findById(userId);
        const listing = await Listing.findById(listingId).populate("creator");
        const favoriteListing = user.wishList.find((item) => item._id.toString() === listingId);
        if(favoriteListing){
            user.wishList = user.wishList.filter((item)=>item._id.toString() !== listingId);
            await user.save();
            res.status(200).json({ message:"Listing Is removed from wishlist", wishList:user.wishList});
        }else{
            user.wishList.push(favoriteListing);
            res.status(200).json({ message:"Listing Is added to wishlist", wishList:user.wishList});
        }
    } catch (err) {
        console.log(err)
        res.status(404).json({message: err.message});
    }
})
// Get property List 
router.get("/:userId/properties",async (req,res)=>{
    try{
        const {userId} = req.params;
        const properties = await Listing.find({creator: userId}).populate("creator");
        res.status(202).json(properties);
    }catch{
        console.log(err);
        res.status(404).json({message:"Can not find properties",error:err.message})
    }
})
// Get reservation List 
router.get("/:userId/reservations",async (req,res)=>{
    try {
        const {userId} = req.params;
        const reservations = await Booking.find({hostid:userId}).populate("CustomerId hostId , listingId");
        res.status(202).json(reservations);
    } catch (err) {
        console.log(err);
        res.status(404).json({message:"Can Not reservations!",error:err.message})
    }
})
module.exports = router