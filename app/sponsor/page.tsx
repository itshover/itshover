import { Metadata } from "next";
import SponsorContent from "./sponsor-content";
import { getSponsors } from "@/actions/get-sponsors";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Sponsor and Support | Its Hover",
  description:
    "Its Hover is free and open source. Sponsor the project or star it on GitHub to keep new animated icons coming.",
  path: "/sponsor",
});

export default async function SponsorPage() {
  const sponsors = await getSponsors();
  return <SponsorContent sponsors={sponsors} />;
}
