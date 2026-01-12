export type HapticIntensity = 'light' | 'medium' | 'heavy';
export type HapticPattern = 'tap' | 'success' | 'warning' | 'error';

const BASE_PATTERNS: Record<HapticPattern, number[]> = {
  tap: [12],
  success: [10, 18, 10],
  warning: [18, 22, 18],
  error: [30, 40, 30, 40, 30],
};

function scalePattern(pattern: number[], intensity: HapticIntensity): number[] {
  const scale = intensity === 'light' ? 0.8 : intensity === 'heavy' ? 1.25 : 1;
  return pattern.map((ms) => Math.max(1, Math.round(ms * scale)));
}

export function canHaptics(): boolean {
  return typeof navigator !== 'undefined' && 'vibrate' in navigator;
}

/**
 * Lightweight, defensive haptic feedback helper.
 *
 * - No-ops on unsupported devices.
 * - Safe to call anywhere (try/catch guarded).
 */
export function hapticFeedback(
  pattern: HapticPattern = 'tap',
  intensity: HapticIntensity = 'medium'
): void {
  if (!canHaptics()) return;
  try {
    const base = BASE_PATTERNS[pattern] ?? BASE_PATTERNS.tap;
    const adjusted = scalePattern(base, intensity);
    navigator.vibrate(adjusted);
  } catch {
    // ignore
  }
}

/**
 * Convenience for small UI thresholds (e.g., crossing mid-point, hitting edges).
 *
 * Keeping this separate makes it easier to tune without sprinkling numbers around the UI.
 */
export function hapticTick(kind: 'soft' | 'firm' = 'soft'): void {
  if (!canHaptics()) return;
  try {
    navigator.vibrate(kind === 'soft' ? 8 : 12);
  } catch {
    // ignore
  }
}
