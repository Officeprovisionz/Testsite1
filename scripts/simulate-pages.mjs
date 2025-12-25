import { spawn } from 'node:child_process';
import process from 'node:process';
import { getPagesLikeEnv } from './pages-env.mjs';

function run(cmd, args, opts) {
  return new Promise((resolve) => {
    const child = spawn(cmd, args, opts);
    child.on('exit', (code) => resolve(code ?? 1));
  });
}

// Default preview port chosen to avoid colliding with `astro dev` (4321).
const port = Number(process.env.PORT ?? process.env.ASTRO_PORT ?? 4322);
const { env, base } = getPagesLikeEnv({ port });

const isWin = process.platform === 'win32';
const pnpmCmd = isWin ? process.env.ComSpec || 'cmd.exe' : 'pnpm';

async function main() {
  console.log(`[pages-like] PUBLIC_SITE_BASE=${base}`);
  console.log(`[pages-like] SITE_URL=${env.SITE_URL}`);

  // Build
  const buildArgs = isWin ? ['/d', '/s', '/c', 'pnpm', 'astro', 'build'] : ['astro', 'build'];

  console.log('[pages-like] Building...');
  const buildCode = await run(pnpmCmd, buildArgs, {
    stdio: 'inherit',
    env,
    windowsVerbatimArguments: isWin,
  });

  if (buildCode !== 0) process.exit(buildCode);

  // Preview
  const previewArgs = isWin
    ? ['/d', '/s', '/c', 'pnpm', 'astro', 'preview', '--port', String(port)]
    : ['astro', 'preview', '--port', String(port)];

  console.log(`[pages-like] Previewing on http://localhost:${port}${base}`);
  const previewCode = await run(pnpmCmd, previewArgs, {
    stdio: 'inherit',
    env,
    windowsVerbatimArguments: isWin,
  });

  process.exit(previewCode);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
