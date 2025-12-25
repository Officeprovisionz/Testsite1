import { spawn } from 'node:child_process';
import process from 'node:process';
import { getPagesLikeEnv } from './pages-env.mjs';

const action = process.argv[2];
if (!action || !['dev', 'build', 'preview'].includes(action)) {
  console.error('Usage: node scripts/run-pages.mjs <dev|build|preview> [-- ...astroArgs]');
  process.exit(2);
}

// Allow passing through additional args after a "--" separator.
const sepIndex = process.argv.indexOf('--');
const extraArgs = sepIndex >= 0 ? process.argv.slice(sepIndex + 1) : [];

// Optional PORT=xxxx override (Astro uses 4321 by default)
const port = Number(process.env.PORT ?? process.env.ASTRO_PORT ?? 4321);
const { env, base } = getPagesLikeEnv({ port });

const pnpmCmd = process.platform === 'win32' ? 'pnpm' : 'pnpm';

// `pnpm astro <action>` ensures we run the workspace-local astro.
const args = ['astro', action, ...extraArgs];

// Keep the server's listening port in sync with the URL we print/set.
// Only inject a port when the caller didn't already provide one.
const wantsPort = action === 'dev' || action === 'preview';
const hasPortFlag = extraArgs.includes('--port') || extraArgs.includes('-p');
if (wantsPort && !hasPortFlag) {
  args.push('--port', String(port));
}

console.log(`[pages-like] PUBLIC_SITE_BASE=${base}`);
console.log(`[pages-like] SITE_URL=${env.SITE_URL}`);
console.log(`[pages-like] Running: pnpm ${args.join(' ')}`);

let child;

if (process.platform === 'win32') {
  // Execute via cmd.exe to reliably locate pnpm on PATH without using `shell: true`.
  const comspec = process.env.ComSpec || 'cmd.exe';
  child = spawn(comspec, ['/d', '/s', '/c', pnpmCmd, ...args], {
    stdio: 'inherit',
    env,
    windowsVerbatimArguments: true,
  });
} else {
  child = spawn(pnpmCmd, args, {
    stdio: 'inherit',
    env,
  });
}

child.on('exit', (code, signal) => {
  if (signal) process.exit(1);
  process.exit(code ?? 1);
});
