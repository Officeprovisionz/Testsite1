import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const GALLERY_DIR = path.join(process.cwd(), 'public', 'gallery');
const OUTPUT_FILE = path.join(process.cwd(), 'src/data/gallery-metadata.json');
const VALID_EXTS = new Set(['.jpg', '.jpeg', '.png', '.webp']);

async function generateMetadata() {
  if (!fs.existsSync(GALLERY_DIR)) {
    console.log('Gallery directory not found');
    return;
  }

  const entries = fs.readdirSync(GALLERY_DIR, { withFileTypes: true });
  const metadata = {};

  console.log('Generating image metadata (lqip + dominant colors)...');

  for (const entry of entries) {
    if (!entry.isFile()) continue;
    const ext = path.extname(entry.name).toLowerCase();
    if (!VALID_EXTS.has(ext)) continue;
    if (entry.name.includes('-')) continue; // Skip variants

    const filePath = path.join(GALLERY_DIR, entry.name);

    try {
      const image = sharp(filePath);
      const meta = await image.metadata();
      const stats = await image.stats();
      const { dominant } = stats;
      const { width, height } = meta;

      // Generate a tiny base64 blur placeholder
      const blurBuffer = await image.resize(20, 20, { fit: 'inside' }).blur(1).toBuffer();

      const lqip = `data:image/${ext.slice(1)};base64,${blurBuffer.toString('base64')}`;

      metadata[entry.name] = {
        dominant: `rgb(${dominant.r}, ${dominant.g}, ${dominant.b})`,
        lqip,
        width,
        height,
      };

      console.log(`✓ ${entry.name} (${width}x${height})`);
    } catch (err) {
      console.error(`✗ ${entry.name}: ${err.message}`);
    }
  }

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(metadata, null, 2));
  console.log(`\nMetadata saved to ${OUTPUT_FILE}`);
}

generateMetadata().catch(console.error);
