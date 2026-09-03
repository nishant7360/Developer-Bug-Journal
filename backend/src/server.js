import "dotenv/config";

import app from "./app.js";
import connectDB from "./config/db.js";
import cloudinary from "./config/cloudinary.js";
import transporter from "./utils/sendEmail.js";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server running on PORT ${PORT}`);
    });
  } catch (error) {
    console.log(`Failed to start server: ${error.message}`);
    process.exit(1);
  }
};

startServer();
