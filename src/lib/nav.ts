const stripHashAndQuery = (path: string) => path.split('#')[0]?.split('?')[0] ?? path;

export const normalizeTrailingSlash = (path: string) => {
  const cleaned = stripHashAndQuery(path);
  return cleaned.endsWith('/') ? cleaned : `${cleaned}/`;
};

export const makeHref = (base: string) => {
  return (path: string) => `${base}${path.replace(/^\/+/, '')}`;
};

export const makeIsActive = (currentPathname: string, base: string) => {
  const currentPath = normalizeTrailingSlash(currentPathname);
  const home = normalizeTrailingSlash(base);

  return (targetHref: string) => {
    const target = normalizeTrailingSlash(targetHref);
    if (target === home) return currentPath === home;
    return currentPath === target || currentPath.startsWith(target);
  };
};
