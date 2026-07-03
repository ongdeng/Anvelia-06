import { imagesByRole } from "../../content/images";
import { Button } from "./Button";
import { ImageFrame } from "./ImageFrame";
import type { ImageFrameVariant } from "./ImageFrame";
import { SectionShell } from "./SectionShell";
import { WhatsAppLink } from "./WhatsAppLink";

const imageVariants: ImageFrameVariant[] = [
  "threshold",
  "landscape",
  "portrait",
  "detail"
];

export function PrimitivePreview() {
  return (
    <main className="primitive-preview" aria-label="Task 5 primitive preview">
      <SectionShell
        actions={<WhatsAppLink size="compact" variant="secondary" />}
        eyebrow="Task 5"
        intro="Reusable controls for the Anvelia phase 1 page, tuned to the Japanese Threshold Resort direction."
        spacing="compact"
        title="Local UI Primitives"
        tone="dark"
        width="wide"
      >
        <div className="primitive-preview__button-row">
          <Button>Primary Button</Button>
          <Button variant="secondary">Secondary Button</Button>
          <Button disabled>Disabled Button</Button>
          <WhatsAppLink />
        </div>
      </SectionShell>

      <SectionShell
        eyebrow="Image Frames"
        intro="Stable crops for threshold, landscape, portrait, and detail imagery."
        spacing="regular"
        title="Aspect-Ratio System"
        tone="paper"
        width="wide"
      >
        <div className="primitive-preview__image-grid">
          {imageVariants.map((variant) => (
            <ImageFrame
              caption={variant}
              image={imagesByRole["hero-threshold-arrival"]}
              key={variant}
              loading="eager"
              variant={variant}
            />
          ))}
        </div>
      </SectionShell>

      <SectionShell
        eyebrow="Section Shell"
        intro="Compact, regular, and generous spacing variants are available without turning sections into cards."
        spacing="generous"
        title="Page Rhythm"
        tone="transparent"
        width="content"
      >
        <p className="primitive-preview__copy">
          The primitives stay restrained: fine borders, quiet brass details,
          stable image crops, and visible focus states.
        </p>
      </SectionShell>
    </main>
  );
}
