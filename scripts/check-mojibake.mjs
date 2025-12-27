import fs from 'node:fs';
import path from 'node:path';

/**
 * Fails CI if common mojibake/encoding artifacts appear in source-controlled copy.
 *
 * This is intentionally conservative: it looks for a small set of sequences that have shown up
 * in this repo (e.g. â€™ â€” â€“) and a couple of common UTF-8 mis-decoding markers.
 */

const DEFAULT_ROOTS = ['src'];
const ALLOWED_EXTS = new Set(['.ts', '.tsx', '.astro', '.json', '.md', '.mdx', '.css']);

// Common mojibake sequences (UTF-8 bytes decoded as Windows-1252/ISO-8859-1)
const PATTERNS = [
  { re: /â€™/, label: 'mojibake apostrophe (expected ’)' },
  { re: /â€œ|â€�/, label: 'mojibake double quotes (expected “ and ”)' },
  { re: /â€“/, label: 'mojibake en-dash (expected –)' },
  { re: /â€”/, label: 'mojibake em-dash (expected —)' },
  { re: /Â\s/, label: 'mojibake NBSP marker (unexpected Â )' },
  // Typical UTF-8 mis-decoding marker: "Ã" followed by a non-printable ASCII character.
  { re: /Ã[^\x20-\x7E]/, label: 'mojibake UTF-8 lead byte marker (Ã...)' },
];

function* walk(dir) {
  let entries;
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return;
  }

  for (const ent of entries) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      // Skip common build/deps folders defensively.
      if (ent.name === 'node_modules' || ent.name === 'dist' || ent.name === '.astro') continue;
      yield* walk(full);
      continue;
    }
    if (ent.isFile()) yield full;
  }
}

function findMatches(text) {
  const matches = [];
  for (const { re, label } of PATTERNS) {
    if (!re.test(text)) continue;
    matches.push({ label });
  }
  return matches;
}

function formatLineFindings(text, patterns) {
  const lines = text.split(/\r?\n/);
  const findings = [];

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i] ?? '';
    const hitLabels = [];
    for (const { re, label } of patterns) {
      if (re.test(line)) hitLabels.push(label);
    }
    if (hitLabels.length) {
      findings.push({ lineNo: i + 1, line, labels: hitLabels });
    }
  }

  return findings;
}

function main() {
  const roots = process.argv.slice(2);
  const resolvedRoots = (roots.length ? roots : DEFAULT_ROOTS).map((r) => path.resolve(r));

  const bad = [];

  for (const root of resolvedRoots) {
    for (const file of walk(root)) {
      const ext = path.extname(file).toLowerCase();
      if (!ALLOWED_EXTS.has(ext)) continue;

      let text;
      try {
        text = fs.readFileSync(file, 'utf8');
      } catch {
        continue;
      }

      const matches = findMatches(text);
      if (!matches.length) continue;

      const findings = formatLineFindings(text, PATTERNS);
      bad.push({ file, findings });
    }
  }

  if (!bad.length) {
    console.log('[check:copy] OK: no mojibake patterns found.');
    return;
  }

  console.error(
    `[check:copy] Found potential mojibake/encoding artifacts in ${bad.length} file(s):`
  );
  for (const entry of bad) {
    const rel = path.relative(process.cwd(), entry.file);
    console.error(`\n- ${rel}`);
    for (const f of entry.findings.slice(0, 50)) {
      const preview = f.line.trimEnd();
      console.error(`  ${String(f.lineNo).padStart(4, ' ')} | ${preview}`);
      console.error(`       ↳ ${f.labels.join(', ')}`);
    }
    if (entry.findings.length > 50) {
      console.error(`  … ${entry.findings.length - 50} more line(s)`);
    }
  }

  process.exitCode = 1;
}

main();
