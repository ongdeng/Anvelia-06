import type { ComponentPropsWithoutRef } from "react";

type ViewportChapterProps = ComponentPropsWithoutRef<"section">;

export function ViewportChapter({
  className,
  ...sectionProps
}: ViewportChapterProps) {
  const classes = ["viewport-chapter", className].filter(Boolean).join(" ");

  return <section {...sectionProps} className={classes} />;
}
