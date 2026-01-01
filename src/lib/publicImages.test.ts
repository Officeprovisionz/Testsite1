import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { getPublicResponsiveImage } from './publicImages';

describe('getPublicResponsiveImage', () => {
  it('returns src only for non-jpg paths', () => {
    const img = getPublicResponsiveImage('brand/logo.svg', '/');
    expect(img).toEqual({ src: '/brand/logo.svg' });
  });

  it('returns src only when no generated variants exist', () => {
    const cwd = process.cwd();
    const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'public-images-'));

    try {
      process.chdir(tmp);
      fs.mkdirSync(path.join(tmp, 'public', 'media'), { recursive: true });
      fs.writeFileSync(path.join(tmp, 'public', 'media', 'hero.jpg'), '');

      const img = getPublicResponsiveImage('media/hero.jpg', '/');
      expect(img).toEqual({ src: '/media/hero.jpg' });
    } finally {
      process.chdir(cwd);
      fs.rmSync(tmp, { recursive: true, force: true });
    }
  });

  it('builds srcSet from available width variants', () => {
    const cwd = process.cwd();
    const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'public-images-'));

    try {
      process.chdir(tmp);
      fs.mkdirSync(path.join(tmp, 'public', 'media'), { recursive: true });

      // Base image is not used for existence checks, but keep it realistic.
      fs.writeFileSync(path.join(tmp, 'public', 'media', 'hero.jpg'), '');

      // Only some variants exist.
      fs.writeFileSync(path.join(tmp, 'public', 'media', 'hero-640.jpg'), '');
      fs.writeFileSync(path.join(tmp, 'public', 'media', 'hero-1280.jpg'), '');

      const img = getPublicResponsiveImage('media/hero.jpg', '/base/', {
        widths: [640, 960, 1280],
        sizes: '100vw',
      });

      expect(img.src).toBe('/base/media/hero.jpg');
      expect(img.sizes).toBe('100vw');
      expect(img.srcSet).toBe('/base/media/hero-640.jpg 640w, /base/media/hero-1280.jpg 1280w');
    } finally {
      process.chdir(cwd);
      fs.rmSync(tmp, { recursive: true, force: true });
    }
  });

  it('preserves .jpeg extension when generating candidates', () => {
    const cwd = process.cwd();
    const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'public-images-'));

    try {
      process.chdir(tmp);
      fs.mkdirSync(path.join(tmp, 'public', 'media'), { recursive: true });

      fs.writeFileSync(path.join(tmp, 'public', 'media', 'hero.jpeg'), '');
      fs.writeFileSync(path.join(tmp, 'public', 'media', 'hero-640.jpeg'), '');

      const img = getPublicResponsiveImage('media/hero.jpeg', '/', { widths: [640] });
      expect(img.srcSet).toBe('/media/hero-640.jpeg 640w');
    } finally {
      process.chdir(cwd);
      fs.rmSync(tmp, { recursive: true, force: true });
    }
  });
});
