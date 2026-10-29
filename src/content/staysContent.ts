import { siteContent } from "./siteContent";

export type StayFact = {
  id: string;
  label: string;
  value: string | null;
  templateHint?: string;
};

export type StayPhoto = { src: string; alt: string; width: number; height: number };

export type StaysContent = {
  title: string;
  placeLabel: string;
  cabins: { description: string };
  photos?: { exterior: StayPhoto | null; interior: StayPhoto | null };
  essentials: { title: string; facts: readonly StayFact[]; amenities: readonly string[] };
  arrival: {
    title: string;
    address?: { label: string; lines: readonly string[] } | null;
    facts: readonly StayFact[];
    notes: string | null;
  };
  experiences: { title: string; description: string; linkLabel: string; linkHref: string };
  closing: { linkLabel: string; linkHref: string };
};

// Null means unconfirmed, not an invitation to generate guest-facing details.
export const staysContent: StaysContent = {
  title: "Cabin stays",
  placeLabel: "Bukit Tinggi, Pahang",
  cabins: {
    description: "Warm timber, soft light and greenery beyond the door."
  },
  photos: { exterior: null, interior: null },
  essentials: {
    title: "The essentials",
    facts: [
      { id: "capacity", label: "Guests", value: null, templateHint: "Guest limit, including any child restrictions." },
      { id: "sleeping", label: "Sleeping arrangements", value: null, templateHint: "Bed types, quantities and sleeping areas." },
      { id: "bathroom", label: "Bathroom", value: null, templateHint: "Bathroom facilities and whether private or shared." },
      { id: "access", label: "Access", value: null, templateHint: "Route from parking, including any steps or stairs." }
    ],
    amenities: []
  },
  arrival: {
    title: "Before you arrive",
    address: { label: siteContent.contact.addressLabel, lines: siteContent.contact.addressLines },
    facts: [
      { id: "check-in", label: "Check-in", value: null, templateHint: "Arrival time or check-in window." },
      { id: "check-out", label: "Check-out", value: null, templateHint: "Check-out time." },
      { id: "arrival", label: "Getting here", value: null, templateHint: "Final approach, parking and arrival instructions." }
    ],
    notes: null
  },
  experiences: {
    title: "Around Anvelia",
    description: siteContent.openAirLiving.body,
    linkLabel: siteContent.openAirLiving.markerLabel,
    linkHref: siteContent.openAirLiving.markerHref
  },
  closing: { linkLabel: "Return to Cabins", linkHref: "#cabins" }
};
