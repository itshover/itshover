import { Metadata } from "next";
import SponsorContent from "./sponsor-content";
import { getSponsors } from "@/actions/get-sponsors";

export const metadata: Metadata = {
  title: "Sponsor and Support | Its Hover",
  description: "Its Hover is completely open-sourced and free to use.",
};

export default async function SponsorPage() {
  const sponsors = await getSponsors();
  return <SponsorContent sponsors={sponsors} />;
}
