import { staysContent, type StaysContent } from "../../src/content/staysContent";
import { sampleStaysContent } from "../stays-full-preview/sampleContent";

const labels: Record<string, string> = {
  sleeping: "Beds",
  access: "Cabin access"
};

const refinedValues: Record<string, string> = {
  sleeping: "One queen bed.",
  access: "Access from guest parking includes steps to the deck."
};

// Research-led copy for this alternative only; all stay facts remain samples.
export const botanicalStaysContent: StaysContent = {
  ...sampleStaysContent,
  placeLabel: staysContent.placeLabel,
  essentials: {
    ...sampleStaysContent.essentials,
    facts: sampleStaysContent.essentials.facts.map(fact => ({
      ...fact,
      label: labels[fact.id] ?? fact.label,
      value: refinedValues[fact.id] ?? fact.value
    }))
  },
  arrival: {
    ...sampleStaysContent.arrival,
    facts: sampleStaysContent.arrival.facts.map(fact => ({
      ...fact,
      label: fact.id === "arrival" ? "On arrival" : fact.label
    })),
    notes: "Please share your expected arrival time on WhatsApp before you travel."
  },
  experiences: {
    ...sampleStaysContent.experiences,
    title: "Beyond the cabin",
    description: "Pickleball, jungle trekking, hot spring bathing and Chinese tea."
  }
};
