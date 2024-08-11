// server.js or app.js
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const fileRoutes = require("./routes/fileroute"); // Import file routes

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// Route imports
const authRoutes = require("./routes/auth");
const listingRoutes = require("./routes/listing");
const bookingRoutes = require("./routes/booking");
const userRoutes = require("./routes/user");

app.use("/auth", authRoutes);
app.use("/properties", listingRoutes);
app.use("/bookings", bookingRoutes);
app.use("/users", userRoutes);
app.use("/files", fileRoutes); 

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something went wrong!");
});

const PORT = 3001;
mongoose
  .connect(process.env.MONGO_URL, {
    dbName: "StayEase_Rentals",
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port : ${PORT}`));
  })
  .catch((err) => console.log(`${err} did not connect`));
