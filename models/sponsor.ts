import { Schema, model, models } from "mongoose";

export interface ISponsor {
  _id?: string;
  name: string;
  amount: number;
  currencySymbol: string;
  via: "UPI" | "SOL" | "BTC" | "ETH" | "COFFEE";
  xUrl?: string;
  website?: string;
  insta?: string;
  medium?: string;
  github?: string;
  logo?: string;
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const SponsorSchema = new Schema<ISponsor>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    amount: {
      type: Number,
      required: true,
      min: 0,
    },

    currencySymbol: {
      type: String,
      required: true,
      default: "₹", // INR by default
      trim: true,
    },

    via: {
      type: String,
      required: true,
      enum: ["UPI", "SOL", "BTC", "ETH", "COFFEE"],
    },

    xUrl: { type: String, trim: true },
    website: { type: String, trim: true },
    insta: { type: String, trim: true },
    medium: { type: String, trim: true },
    github: { type: String, trim: true },

    logo: {
      type: String,
      default: "",
    },

    isPublic: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

const Sponsor = models.Sponsor || model<ISponsor>("Sponsor", SponsorSchema);

export default Sponsor;
