import type { AnchorHTMLAttributes } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { siteContent } from "../../content/siteContent";
import { Button } from "./Button";
import type { ButtonSize, ButtonVariant } from "./Button";

export const whatsappLinkDefaults = {
  ariaLabel: siteContent.contact.whatsappAriaLabel,
  href: siteContent.contact.whatsappUrl,
  label: siteContent.contact.whatsappLabel
} as const;

export type WhatsAppLinkProps = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "children" | "href"
> & {
  accessibleLabel?: string;
  disabled?: boolean;
  label?: string;
  showIcon?: boolean;
  size?: ButtonSize;
  variant?: ButtonVariant;
};

export function WhatsAppLink({
  accessibleLabel = whatsappLinkDefaults.ariaLabel,
  className,
  label = whatsappLinkDefaults.label,
  showIcon = true,
  size = "regular",
  variant = "primary",
  ...anchorProps
}: WhatsAppLinkProps) {
  return (
    <Button
      {...anchorProps}
      aria-label={accessibleLabel}
      className={["ui-whatsapp-link", className].filter(Boolean).join(" ")}
      href={whatsappLinkDefaults.href}
      iconAfter={
        showIcon ? <FaWhatsapp className="ui-whatsapp-link__icon" /> : undefined
      }
      size={size}
      variant={variant}
    >
      {label}
    </Button>
  );
}
