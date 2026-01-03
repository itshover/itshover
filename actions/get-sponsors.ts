"use server";

import { unstable_cache } from "next/cache";
import connectToDatabase from "@/lib/db";
import Sponsor, { ISponsor } from "@/models/sponsor";

export const getSponsors = unstable_cache(
  async () => {
    try {
      await connectToDatabase();
      const sponsors = await Sponsor.find({ isPublic: true })
        .sort({ amount: -1 })
        .lean();

      // Serialize the data to pass to client component
      return JSON.parse(JSON.stringify(sponsors)) as ISponsor[];
    } catch (error) {
      console.error("Error fetching sponsors:", error);
      return [];
    }
  },
  ["sponsors"],
  { revalidate: 3600 }, // 1 hour
);
