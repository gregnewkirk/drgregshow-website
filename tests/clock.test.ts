import { describe, it, expect, vi, afterEach } from "vitest";
import { subscribeToClock, getClockSnapshot } from "@/lib/clock";

afterEach(() => { vi.useRealTimers(); });

describe("clock snapshot", () => {
  it("is stable between calls until the clock ticks", () => {
    vi.useFakeTimers();
    const unsub = subscribeToClock(() => {});
    const a = getClockSnapshot();
    vi.setSystemTime(Date.now() + 500);
    expect(getClockSnapshot()).toBe(a);
    vi.advanceTimersByTime(1000);
    expect(getClockSnapshot()).not.toBe(a);
    unsub();
  });
});
