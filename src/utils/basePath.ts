const configuredBasePath = () => import.meta.env.BASE_URL || "/";

export function normalizeBasePath(basePath = configuredBasePath()) {
  const withLeadingSlash = basePath.startsWith("/")
    ? basePath
    : `/${basePath}`;

  return withLeadingSlash.endsWith("/")
    ? withLeadingSlash
    : `${withLeadingSlash}/`;
}

export function stripBasePath(
  pathname: string,
  basePath = configuredBasePath()
) {
  const normalizedBase = normalizeBasePath(basePath);
  const baseWithoutTrailingSlash = normalizedBase.slice(0, -1);
  let routePath = pathname.startsWith("/") ? pathname : `/${pathname}`;

  if (
    baseWithoutTrailingSlash &&
    baseWithoutTrailingSlash !== "/" &&
    (routePath === baseWithoutTrailingSlash ||
      routePath.startsWith(`${baseWithoutTrailingSlash}/`))
  ) {
    routePath = routePath.slice(baseWithoutTrailingSlash.length) || "/";
  }

  return routePath.replace(/\/+$/, "") || "/";
}

export function withBasePath(target: string, basePath = configuredBasePath()) {
  const normalizedBase = normalizeBasePath(basePath);

  if (target.startsWith("#")) {
    return `${normalizedBase}${target}`;
  }

  const relativeTarget = target.replace(/^\/+|\/+$/g, "");

  return relativeTarget
    ? `${normalizedBase}${relativeTarget}/`
    : normalizedBase;
}
