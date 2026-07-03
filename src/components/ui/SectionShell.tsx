import type { HTMLAttributes, ReactNode } from "react";

export type SectionShellSpacing = "compact" | "regular" | "generous";
export type SectionShellTone = "transparent" | "dark" | "paper";
export type SectionShellWidth = "content" | "wide" | "full";

export type SectionShellProps = HTMLAttributes<HTMLElement> & {
  actions?: ReactNode;
  children?: ReactNode;
  eyebrow?: ReactNode;
  intro?: ReactNode;
  spacing?: SectionShellSpacing;
  title?: ReactNode;
  titleId?: string;
  tone?: SectionShellTone;
  width?: SectionShellWidth;
};

export function SectionShell({
  actions,
  children,
  className,
  eyebrow,
  id,
  intro,
  spacing = "regular",
  title,
  titleId,
  tone = "transparent",
  width = "content",
  ...sectionProps
}: SectionShellProps) {
  const resolvedTitleId = titleId ?? (id && title ? `${id}-title` : undefined);
  const labelledBy =
    sectionProps["aria-labelledby"] ?? (title ? resolvedTitleId : undefined);
  const hasHeader = eyebrow || title || intro || actions;

  return (
    <section
      {...sectionProps}
      aria-labelledby={labelledBy}
      className={[
        "section-shell",
        `section-shell--${spacing}`,
        `section-shell--${tone}`,
        `section-shell--${width}`,
        className
      ]
        .filter(Boolean)
        .join(" ")}
      id={id}
    >
      <div className="section-shell__inner">
        {hasHeader ? (
          <div className="section-shell__header">
            <div className="section-shell__heading-group">
              {eyebrow ? (
                <p className="section-shell__eyebrow">{eyebrow}</p>
              ) : null}
              {title ? (
                <h2 className="section-shell__title" id={resolvedTitleId}>
                  {title}
                </h2>
              ) : null}
              {intro ? <p className="section-shell__intro">{intro}</p> : null}
            </div>
            {actions ? (
              <div className="section-shell__actions">{actions}</div>
            ) : null}
          </div>
        ) : null}
        {children ? (
          <div className="section-shell__body">{children}</div>
        ) : null}
      </div>
    </section>
  );
}
