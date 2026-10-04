import { describe, it, expect, vi, afterEach } from "vitest";
import { subscribeToClock, getClockSnapshot, getServerSnapshot } from "@/lib/clock";

const cleanup: (() => void)[] = [];
afterEach(() => {
  cleanup.splice(0).forEach((unsubscribe) => unsubscribe());
  vi.useRealTimers();
});

describe("clock snapshot", () => {
  it("is stable between calls until the clock ticks", () => {
    vi.useFakeTimers();
    const unsub = subscribeToClock(() => {});
    cleanup.push(unsub);
    const a = getClockSnapshot();
    vi.setSystemTime(Date.now() + 500);
    expect(getClockSnapshot()).toBe(a);
    vi.advanceTimersByTime(1000);
    expect(getClockSnapshot()).not.toBe(a);
    unsub();
  });

  it("shares one timer and keeps it running until the final listener unsubscribes", () => {
    vi.useFakeTimers();
    const first = vi.fn();
    const second = vi.fn();
    const unsubscribeFirst = subscribeToClock(first);
    const unsubscribeSecond = subscribeToClock(second);
    cleanup.push(unsubscribeFirst, unsubscribeSecond);
    expect(vi.getTimerCount()).toBe(1);
    vi.advanceTimersByTime(1000);
    expect(first).toHaveBeenCalledTimes(1);
    expect(second).toHaveBeenCalledTimes(1);

    unsubscribeFirst();
    vi.advanceTimersByTime(1000);
    expect(first).toHaveBeenCalledTimes(1);
    expect(second).toHaveBeenCalledTimes(2);
    unsubscribeSecond();
    expect(vi.getTimerCount()).toBe(0);
    vi.advanceTimersByTime(1000);
    expect(second).toHaveBeenCalledTimes(2);
  });

  it("refreshes an idle snapshot immediately when a new subscriber arrives", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-10-01T00:00:00Z"));
    const unsubscribe = subscribeToClock(() => {});
    cleanup.push(unsubscribe);
    const initial = getClockSnapshot();
    unsubscribe();
    vi.setSystemTime(new Date("2026-10-02T00:00:00Z"));
    expect(getClockSnapshot()).toBe(initial);

    cleanup.push(subscribeToClock(() => {}));
    expect(getClockSnapshot()).toBe(Date.now());
    expect(vi.getTimerCount()).toBe(1);
  });

  it("uses a stable null snapshot on the server", () => {
    expect(getServerSnapshot()).toBeNull();
    expect(getServerSnapshot()).toBeNull();
  });
});
