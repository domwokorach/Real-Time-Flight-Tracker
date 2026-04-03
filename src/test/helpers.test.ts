import { describe, it, expect } from 'vitest';
import { getRandomInt, getRandomIntInclusive } from '../helpers/mathFunctions';
import { getFormattedValue, getIconName, getRotation, getColor } from '../helpers/aircraftDataFunctions';

// ── mathFunctions ────────────────────────────────────────────────────────────

describe('getRandomInt', () => {
  it('returns a value within [min, max)', () => {
    for (let i = 0; i < 100; i++) {
      const result = getRandomInt(0, 10);
      expect(result).toBeGreaterThanOrEqual(0);
      expect(result).toBeLessThan(10);
    }
  });
});

describe('getRandomIntInclusive', () => {
  it('returns a value within [min, max]', () => {
    for (let i = 0; i < 100; i++) {
      const result = getRandomIntInclusive(0, 10);
      expect(result).toBeGreaterThanOrEqual(0);
      expect(result).toBeLessThanOrEqual(10);
    }
  });
});

// ── aircraftDataFunctions ────────────────────────────────────────────────────

describe('getFormattedValue', () => {
  it('formats a number with max fraction digits', () => {
    expect(getFormattedValue(12345.6789, 2)).toBe('12345.68');
  });

  it('rounds to zero decimals', () => {
    expect(getFormattedValue(100.9, 0)).toBe('101');
  });
});

describe('getIconName', () => {
  it('returns flight-icon when on ground', () => {
    expect(getIconName(true, 0, 500, 90)).toBe('flight-icon');
  });

  it('returns flight-icon when altitude is 0', () => {
    expect(getIconName(false, 10, 0, 90)).toBe('flight-icon');
  });

  it('returns takeoff icon when climbing below altitude limit, heading < 180', () => {
    expect(getIconName(false, 5, 500, 90)).toBe('flight-takeoff-icon');
  });

  it('returns flipped takeoff icon when climbing below altitude limit, heading >= 180', () => {
    expect(getIconName(false, 5, 500, 200)).toBe('flight-takeoff-flipped-icon');
  });

  it('returns land icon when descending below altitude limit, heading < 180', () => {
    expect(getIconName(false, -5, 500, 90)).toBe('flight-land-icon');
  });

  it('returns flipped land icon when descending below altitude limit, heading >= 180', () => {
    expect(getIconName(false, -5, 500, 200)).toBe('flight-land-flipped-icon');
  });

  it('returns flight-icon for cruising aircraft', () => {
    expect(getIconName(false, 0, 10000, 90)).toBe('flight-icon');
  });
});

describe('getRotation', () => {
  it('returns 0 when climbing below altitude limit', () => {
    expect(getRotation(90, 5, 500)).toBe(0);
  });

  it('returns 0 when descending below altitude limit', () => {
    expect(getRotation(90, -5, 500)).toBe(0);
  });

  it('returns trueTrack for cruising aircraft', () => {
    expect(getRotation(135, 0, 10000)).toBe(135);
  });
});

describe('getColor', () => {
  it('returns a hex color string', () => {
    const color = getColor(5000);
    expect(color).toMatch(/^#[0-9a-f]{6}$/);
  });

  it('returns red (#ff0000) at altitude 0', () => {
    expect(getColor(0)).toBe('#ff0000');
  });

  it('returns green (#00ff00) at altitude 13000', () => {
    expect(getColor(13000)).toBe('#00ff00');
  });

  it('clamps to green above altitude 13000', () => {
    expect(getColor(20000)).toBe('#00ff00');
  });
});
