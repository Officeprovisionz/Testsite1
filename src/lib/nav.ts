const stripHashAndQuery = (path: string): string => path.split('#')[0]?.split('?')[0] ?? path;

export const normalizeTrailingSlash = (path: string): string => {
  const cleaned = stripHashAndQuery(path);
  return cleaned.endsWith('/') ? cleaned : `${cleaned}/`;
};

export const makeHref = (base: string): ((path: string) => string) => {
  return (path: string): string => `${base}${path.replace(/^\/+/, '')}`;
};

export const makeIsActive = (
  currentPathname: string,
  base: string
): ((targetHref: string) => boolean) => {
  const currentPath = normalizeTrailingSlash(currentPathname);
  const home = normalizeTrailingSlash(base);

  return (targetHref: string): boolean => {
    const target = normalizeTrailingSlash(targetHref);
    if (target === home) return currentPath === home;
    return currentPath === target || currentPath.startsWith(target);
  };
};
