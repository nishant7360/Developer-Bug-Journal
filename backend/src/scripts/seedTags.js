import dotenv from "dotenv";

import connectDB from "../config/db.js";
import Tag from "../models/tag.model.js";
import { predefinedTags } from "../data/tags.js";

dotenv.config();

const seedTags = async () => {
  try {
    await connectDB();

    let created = 0;
    let updated = 0;

    for (const tag of predefinedTags) {
      const result = await Tag.updateOne(
        { name: tag.name },
        { $set: { description: tag.description } },
        { upsert: true },
      );

      if (result.upsertedCount > 0) created += 1;
      else if (result.modifiedCount > 0) updated += 1;
    }

    console.log(
      `Tags seeded: ${created} created, ${updated} updated, ${
        predefinedTags.length - created - updated
      } unchanged`,
    );

    process.exit(0);
  } catch (error) {
    console.error("Error seeding tags:", error);
    process.exit(1);
  }
};

seedTags();
