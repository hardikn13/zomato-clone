"use strict";
var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (
          !desc ||
          ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)
        ) {
          desc = {
            enumerable: true,
            get: function () {
              return m[k];
            },
          };
        }
        Object.defineProperty(o, k2, desc);
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      });
var __setModuleDefault =
  (this && this.__setModuleDefault) ||
  (Object.create
    ? function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
      }
    : function (o, v) {
        o["default"] = v;
      });
var __importStar =
  (this && this.__importStar) ||
  function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null)
      for (var k in mod)
        if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
          __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
  };
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __rest =
  (this && this.__rest) ||
  function (s, e) {
    var t = {};
    for (var p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (
          e.indexOf(p[i]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(s, p[i])
        )
          t[p[i]] = s[p[i]];
      }
    return t;
  };
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const fs = __importStar(require("fs"));
// MongoDB connection URI
const uri =
  "mongodb+srv://2021kucp1080:K3p8eZXlD85CSoaz@zomato-clone.ezu45.mongodb.net/";
function run() {
  return __awaiter(this, void 0, void 0, function* () {
    const client = new mongodb_1.MongoClient(uri);
    try {
      // Connect to the MongoDB cluster
      yield client.connect();
      // Define the database and collection
      const database = client.db("zomato");
      const collection = database.collection("restaurants");
      // Create a unique index on the `id` field to avoid duplicates
      yield collection.createIndex({ id: 1 }, { unique: true });
      // Read data from the JSON file
      const rawData = fs.readFileSync("./file5.json", "utf-8");
      const jsonData = JSON.parse(rawData);
      // Extract and clean the restaurant field
      const restaurants = jsonData.flatMap((item) => {
        var _a;
        return (_a = item.restaurants) === null || _a === void 0
          ? void 0
          : _a.map((r) => {
              const restaurant = r.restaurant;
              // Remove specified fields
              const { R, zomato_events, events_url, establishment_types } =
                  restaurant,
                cleanedRestaurant = __rest(restaurant, [
                  "R",
                  "zomato_events",
                  "events_url",
                  "establishment_types",
                ]);
              return cleanedRestaurant;
            });
      });
      // Insert the restaurant data into the collection
      try {
        const result = yield collection.insertMany(restaurants, {
          ordered: false,
        });
        console.log(`${result.insertedCount} documents were inserted.`);
      } catch (error) {
        if (error.writeErrors) {
          console.log(
            `${error.writeErrors.length} duplicate documents were ignored.`
          );
        } else {
          throw error;
        }
      }
    } finally {
      // Close the connection to the MongoDB cluster
      yield client.close();
    }
  });
}
run().catch(console.error);
//# sourceMappingURL=data_load.js.map
