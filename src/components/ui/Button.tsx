import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  MouseEventHandler,
  ReactNode
} from "react";

export type ButtonVariant = "primary" | "secondary";
export type ButtonSize = "regular" | "compact";

type ButtonBaseProps = {
  children: ReactNode;
  className?: string;
  iconAfter?: ReactNode;
  iconBefore?: ReactNode;
  size?: ButtonSize;
  variant?: ButtonVariant;
};

type ButtonAsButton = ButtonBaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type ButtonAsAnchor = ButtonBaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    disabled?: boolean;
    href: string;
  };

export type ButtonProps = ButtonAsAnchor | ButtonAsButton;

const getButtonClassName = (
  variant: ButtonVariant,
  size: ButtonSize,
  className?: string
) =>
  [
    "ui-button",
    `ui-button--${variant}`,
    `ui-button--${size}`,
    className
  ]
    .filter(Boolean)
    .join(" ");

const getButtonContent = (
  children: ReactNode,
  iconBefore?: ReactNode,
  iconAfter?: ReactNode
) => (
  <>
    {iconBefore ? (
      <span className="ui-button__icon" aria-hidden="true">
        {iconBefore}
      </span>
    ) : null}
    <span className="ui-button__label">{children}</span>
    {iconAfter ? (
      <span className="ui-button__icon" aria-hidden="true">
        {iconAfter}
      </span>
    ) : null}
  </>
);

export function Button(props: ButtonProps) {
  const variant = props.variant ?? "primary";
  const size = props.size ?? "regular";
  const className = getButtonClassName(variant, size, props.className);
  const content = getButtonContent(
    props.children,
    props.iconBefore,
    props.iconAfter
  );

  if ("href" in props && typeof props.href === "string") {
    const {
      children,
      className: _className,
      disabled,
      iconAfter,
      iconBefore,
      onClick,
      size: _size,
      variant: _variant,
      ...anchorProps
    } = props;

    const handleClick: MouseEventHandler<HTMLAnchorElement> = (event) => {
      if (disabled) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }

      onClick?.(event);
    };

    return (
      <a
        {...anchorProps}
        aria-disabled={disabled ? true : anchorProps["aria-disabled"]}
        className={className}
        onClick={handleClick}
        tabIndex={disabled ? -1 : anchorProps.tabIndex}
      >
        {content}
      </a>
    );
  }

  const {
    children,
    className: _className,
    iconAfter,
    iconBefore,
    size: _size,
    type = "button",
    variant: _variant,
    ...buttonProps
  } = props;

  return (
    <button {...buttonProps} className={className} type={type}>
      {content}
    </button>
  );
}
