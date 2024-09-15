import { MongoClient } from "mongodb";
import * as fs from "fs";
import path from "path";

// MongoDB connection URI
const uri =
  "mongodb+srv://2021kucp1080:K3p8eZXlD85CSoaz@zomato-clone.ezu45.mongodb.net/";

// List of files to process
const files = [
  "file1.json",
  "file2.json",
  "file3.json",
  "file4.json",
  "file5.json",
];

async function processFile(filePath: string) {
  const client = new MongoClient(uri);

  try {
    // Connect to the MongoDB cluster
    await client.connect();

    // Define the database and collection
    const database = client.db("zomato");
    const collection = database.collection("restaurants");

    // Create a unique index on the `id` field to avoid duplicates
    await collection.createIndex({ id: 1 }, { unique: true });

    // Read data from the JSON file
    const rawData = fs.readFileSync(filePath, "utf-8");
    const jsonData = JSON.parse(rawData);

    // Extract and clean the restaurant field
    const restaurants = jsonData.flatMap((item: any) =>
      item.restaurants?.map((r: any) => {
        const restaurant = r.restaurant;

        // Remove specified fields
        const {
          R,
          zomato_events,
          events_url,
          establishment_types,
          ...cleanedRestaurant
        } = restaurant;

        return cleanedRestaurant;
      })
    );

    // Insert the restaurant data into the collection
    try {
      const result = await collection.insertMany(restaurants, {
        ordered: false,
      });
      console.log(
        `${result.insertedCount} documents from ${path.basename(
          filePath
        )} were inserted.`
      );
    } catch (error: any) {
      if (error.writeErrors) {
        console.log(
          `${error.writeErrors.length} duplicate documents from ${path.basename(
            filePath
          )} were ignored.`
        );
      } else {
        throw error;
      }
    }
  } finally {
    // Close the connection to the MongoDB cluster
    await client.close();
  }
}

async function run() {
  for (const file of files) {
    const filePath = path.resolve(__dirname, file);
    await processFile(filePath);
  }
}

run().catch(console.error);
