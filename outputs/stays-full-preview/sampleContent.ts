import { staysContent, type StaysContent } from "../../src/content/staysContent";
import exterior from "./images/cabin-exterior-sample.webp";
import interior from "./images/cabin-interior-sample.webp";

// Fictional details for this private visual preview only, not confirmed stay facts.
const sampleFacts: Record<string, string> = {
  capacity: "2 guests",
  sleeping: "One queen bed with soft cotton linen.",
  bathroom: "Private bathroom with a walk-in shower.",
  access: "A short walk from guest parking, with steps to the deck.",
  "check-in": "From 3:00 pm",
  "check-out": "By 11:00 am",
  arrival: "Park by the main entrance. We will meet you there and guide you to your cabin."
};

// Sample photos/details stay separate from the canonical unconfirmed registry.
export const sampleStaysContent: StaysContent = {
  ...staysContent,
  placeLabel: "Sample stay · Bukit Tinggi",
  essentials: {
    ...staysContent.essentials,
    facts: staysContent.essentials.facts.map(fact => ({
      ...fact,
      value: sampleFacts[fact.id] ?? fact.value
    })),
    amenities: ["Air conditioning", "Wi-Fi", "Tea and coffee"]
  },
  arrival: {
    ...staysContent.arrival,
    facts: staysContent.arrival.facts.map(fact => ({
      ...fact,
      value: sampleFacts[fact.id] ?? fact.value
    })),
    notes: "Share your estimated arrival time with us before you travel."
  },
  photos: {
    exterior: {
      src: exterior,
      alt: "Sample concept of a timber cabin and porch amid hillside greenery",
      width: 1448,
      height: 1086
    },
    interior: {
      src: interior,
      alt: "Sample concept of an ivory-linen bed in a timber cabin with leafy daylight",
      width: 1122,
      height: 1402
    }
  }
};
