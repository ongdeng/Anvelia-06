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

  const focusDestination = (href: string) => {
    const hashIndex = href.indexOf("#");

    if (hashIndex === -1) {
      return;
    }

    const destinationId = decodeURIComponent(href.slice(hashIndex + 1));

    window.setTimeout(() => {
      const destination = document.getElementById(destinationId);

      if (!destination) {
        return;
      }

      destination.setAttribute("tabindex", "-1");
      destination.focus({ preventScroll: true });
    }, 0);
  };

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
    const main = document.getElementById(accessibility.mainContentId);
    const skipLink = document.querySelector<HTMLAnchorElement>(".skip-link");
    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;
    const originalMainAriaHidden = main?.getAttribute("aria-hidden");
    const originalSkipTabIndex = skipLink?.getAttribute("tabindex");
    const originalSkipAriaHidden = skipLink?.getAttribute("aria-hidden");
    const scrollbarWidth = window.innerWidth - root.clientWidth;
    const supportsStableScrollbarGutter =
      typeof CSS !== "undefined" &&
      typeof CSS.supports === "function" &&
      CSS.supports("scrollbar-gutter: stable");

    root.dataset.scrollLocked = "true";
    document.body.style.overflow = "hidden";
    main?.setAttribute("inert", "");
    main?.setAttribute("aria-hidden", "true");
    skipLink?.setAttribute("tabindex", "-1");
    skipLink?.setAttribute("aria-hidden", "true");

    if (!supportsStableScrollbarGutter && scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      delete root.dataset.scrollLocked;
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;

      main?.removeAttribute("inert");

      if (originalMainAriaHidden === null || originalMainAriaHidden === undefined) {
        main?.removeAttribute("aria-hidden");
      } else {
        main?.setAttribute("aria-hidden", originalMainAriaHidden);
      }

      if (originalSkipTabIndex === null || originalSkipTabIndex === undefined) {
        skipLink?.removeAttribute("tabindex");
      } else {
        skipLink?.setAttribute("tabindex", originalSkipTabIndex);
      }

      if (
        originalSkipAriaHidden === null ||
        originalSkipAriaHidden === undefined
      ) {
        skipLink?.removeAttribute("aria-hidden");
      } else {
        skipLink?.setAttribute("aria-hidden", originalSkipAriaHidden);
      }
    };
  }, [accessibility.mainContentId, isMenuOpen]);

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
      onClick={() => {
        closeMenu();
        focusDestination(item.href);
      }}
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
        aria-hidden={isMenuOpen ? true : undefined}
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
        aria-hidden={isMenuOpen ? true : undefined}
        className="primary-nav primary-nav--desktop"
        aria-label={accessibility.siteSectionsLabel}
      >
        {navLinks}
      </nav>

      <WhatsAppLink
        aria-hidden={isMenuOpen ? true : undefined}
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
        aria-label={accessibility.mobileMenuLabel}
        aria-modal="true"
        className="mobile-nav-panel"
        hidden={!isMenuOpen}
        id={menuId}
        ref={menuPanelRef}
        role="dialog"
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
