import dotenv from "dotenv";

import connectDB from "../config/db.js";
import Tag from "../models/tag.model.js";
import { predefinedTags } from "../data/tags.js";

dotenv.config();

const seedTags = async () => {
  try {
    await connectDB();

    for (const tag of predefinedTags) {
      await Tag.updateOne(
        { name: tag.name },
        {
          $setOnInsert: tag,
        },
        {
          upsert: true,
        },
      );
    }

    console.log("Tags seeded successfully");

    process.exit(0);
  } catch (error) {
    console.error("Error seeding tags:", error);
    process.exit(1);
  }
};

seedTags();
