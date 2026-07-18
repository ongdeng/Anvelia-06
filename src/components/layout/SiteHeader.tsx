import { useEffect, useId, useRef, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { siteContent } from "../../content/siteContent";
import { withBasePath } from "../../utils/basePath";
import { WhatsAppLink } from "../ui/WhatsAppLink";

type CloseMenuOptions = {
  restoreFocus?: boolean;
};

type SiteHeaderProps = {
  homeRooted?: boolean;
};

export function SiteHeader({ homeRooted = false }: SiteHeaderProps) {
  const { accessibility, brand, contact, nav } = siteContent;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const menuId = useId();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuPanelRef = useRef<HTMLDivElement>(null);

  const closeMenu = ({ restoreFocus = false }: CloseMenuOptions = {}) => {
    setIsMenuOpen(false);

    if (restoreFocus) {
      window.setTimeout(() => menuButtonRef.current?.focus(), 0);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 24);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isMenuOpen) {
      return undefined;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeMenu({ restoreFocus: true });
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const focusableItems = [
        menuButtonRef.current,
        ...(menuPanelRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        ) ?? [])
      ].filter(Boolean);

      if (focusableItems.length === 0) {
        return;
      }

      const firstItem = focusableItems[0];
      const lastItem = focusableItems[focusableItems.length - 1];

      if (event.shiftKey && document.activeElement === firstItem) {
        event.preventDefault();
        lastItem?.focus();
      }

      if (!event.shiftKey && document.activeElement === lastItem) {
        event.preventDefault();
        firstItem?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isMenuOpen]);

  useEffect(() => {
    if (!isMenuOpen) {
      return undefined;
    }

    const root = document.documentElement;
    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - root.clientWidth;
    const supportsStableScrollbarGutter =
      typeof CSS !== "undefined" &&
      typeof CSS.supports === "function" &&
      CSS.supports("scrollbar-gutter: stable");

    root.dataset.scrollLocked = "true";
    document.body.style.overflow = "hidden";

    if (!supportsStableScrollbarGutter && scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      delete root.dataset.scrollLocked;
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
    };
  }, [isMenuOpen]);

  useEffect(() => {
    if (!isMenuOpen) {
      return undefined;
    }

    const handleResize = () => {
      if (window.matchMedia("(min-width: 821px)").matches) {
        closeMenu();
      }
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [isMenuOpen]);

  const navLinks = nav.map((item) => (
    <a href={homeRooted ? withBasePath(item.href) : item.href} key={item.href}>
      {item.label}
    </a>
  ));

  const mobileNavLinks = nav.map((item) => (
    <a
      href={homeRooted ? withBasePath(item.href) : item.href}
      key={item.href}
      onClick={() => closeMenu()}
    >
      {item.label}
    </a>
  ));

  return (
    <header
      className="site-header"
      aria-label={accessibility.primaryHeaderLabel}
      data-menu-open={isMenuOpen ? "true" : undefined}
      data-scrolled={hasScrolled ? "true" : undefined}
    >
      <a
        className="brand-link"
        href={withBasePath(brand.homeHref)}
        aria-label={brand.homeAriaLabel}
        onClick={() => closeMenu()}
        tabIndex={isMenuOpen ? -1 : undefined}
      >
        {brand.wordmarkLines.map((line, index) => (
          <span
            className={
              index === 0 ? "brand-line brand-line--anvelia" : "brand-line"
            }
            key={line}
          >
            {line}
          </span>
        ))}
      </a>

      <nav
        className="primary-nav primary-nav--desktop"
        aria-label={accessibility.siteSectionsLabel}
      >
        {navLinks}
      </nav>

      <WhatsAppLink
        className="header-whatsapp"
        size="compact"
        tabIndex={isMenuOpen ? -1 : undefined}
        variant="secondary"
      />

      <button
        className="mobile-menu-toggle"
        type="button"
        aria-controls={menuId}
        aria-expanded={isMenuOpen}
        aria-label={
          isMenuOpen
            ? accessibility.mobileMenuCloseLabel
            : accessibility.mobileMenuOpenLabel
        }
        onClick={() => setIsMenuOpen((current) => !current)}
        ref={menuButtonRef}
      >
        {isMenuOpen ? <FiX aria-hidden="true" /> : <FiMenu aria-hidden="true" />}
      </button>

      <div
        className="mobile-nav-panel"
        hidden={!isMenuOpen}
        id={menuId}
        ref={menuPanelRef}
      >
        <div className="mobile-nav-panel__content">
          <nav
            className="mobile-nav"
            aria-label={accessibility.mobileMenuLabel}
          >
            {mobileNavLinks}
          </nav>
          <div className="mobile-nav-panel__footer">
            <span className="mobile-nav-panel__rule" aria-hidden="true" />
            <WhatsAppLink
              className="mobile-nav__whatsapp"
              onClick={() => closeMenu()}
              size="compact"
              variant="secondary"
            />
            <p className="mobile-nav-panel__address">
              {contact.addressLines.join(", ")}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
