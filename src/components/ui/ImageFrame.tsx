import type {
  CSSProperties,
  HTMLAttributes,
  ImgHTMLAttributes,
  ReactNode
} from "react";
import type { SiteImage } from "../../content/images";

export type ImageFrameVariant =
  | "threshold"
  | "landscape"
  | "portrait"
  | "detail";

export type ImageFrameSource = Pick<SiteImage, "alt" | "conceptOnly" | "src">;

type ImageFrameStyle = CSSProperties & {
  "--image-position"?: string;
};

export type ImageFrameProps = Omit<
  HTMLAttributes<HTMLElement>,
  "children"
> & {
  caption?: ReactNode;
  image: ImageFrameSource;
  imageClassName?: string;
  loading?: ImgHTMLAttributes<HTMLImageElement>["loading"];
  objectPosition?: string;
  sizes?: string;
  variant?: ImageFrameVariant;
};

export function ImageFrame({
  caption,
  className,
  image,
  imageClassName,
  loading = "lazy",
  objectPosition,
  sizes,
  style,
  variant = "landscape",
  ...figureProps
}: ImageFrameProps) {
  const frameStyle: ImageFrameStyle = {
    ...style,
    ...(objectPosition ? { "--image-position": objectPosition } : {})
  };

  return (
    <figure
      {...figureProps}
      className={["image-frame", `image-frame--${variant}`, className]
        .filter(Boolean)
        .join(" ")}
      data-concept-only={image.conceptOnly ? "true" : undefined}
      style={frameStyle}
    >
      <img
        alt={image.alt}
        className={["image-frame__image", imageClassName]
          .filter(Boolean)
          .join(" ")}
        decoding="async"
        loading={loading}
        sizes={sizes}
        src={image.src}
      />
      {caption ? (
        <figcaption className="image-frame__caption">{caption}</figcaption>
      ) : null}
    </figure>
  );
}
