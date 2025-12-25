import { execSync } from 'node:child_process';

function stripGitSuffix(s) {
  return s.replace(/\.git$/i, '');
}

function repoFromRemoteUrl(remoteUrl) {
  const url = remoteUrl.trim();
  if (!url) return null;

  // https://github.com/owner/repo.git
  const httpsMatch = url.match(/github\.com[:/]+([^/]+)\/([^/]+)$/i);
  if (httpsMatch) return stripGitSuffix(httpsMatch[2]);

  // git@github.com:owner/repo.git
  const sshMatch = url.match(/git@github\.com:([^/]+)\/([^/]+)$/i);
  if (sshMatch) return stripGitSuffix(sshMatch[2]);

  // Fall back: last path segment
  const parts = url.split('/').filter(Boolean);
  const last = parts[parts.length - 1];
  return last ? stripGitSuffix(last) : null;
}

export function inferGithubPagesBase() {
  try {
    const origin = execSync('git remote get-url origin', { encoding: 'utf8' });
    const repo = repoFromRemoteUrl(origin);
    return repo ? `/${repo}/` : '/';
  } catch {
    return '/';
  }
}

export function normalizeBase(input) {
  const raw = String(input ?? '/').trim();
  if (raw === '' || raw === '/') return '/';
  const withLeading = raw.startsWith('/') ? raw : `/${raw}`;
  return withLeading.endsWith('/') ? withLeading : `${withLeading}/`;
}

export function getPagesLikeEnv({ port = 4321 } = {}) {
  const base = normalizeBase(process.env.PUBLIC_SITE_BASE ?? inferGithubPagesBase());
  const siteUrl = `http://localhost:${port}${base}`;
  return {
    base,
    env: {
      ...process.env,
      PUBLIC_SITE_BASE: base,
      SITE_URL: process.env.SITE_URL ?? siteUrl,
      ASTRO_TELEMETRY_DISABLED: '1',
    },
  };
}
