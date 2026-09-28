// Shared 1-second clock for useSyncExternalStore.
// The snapshot must stay identical between calls until the clock ticks. Returning
// Date.now() directly gives React a new value on every check, which on slower devices
// makes it re-render until it throws "Maximum update depth exceeded" and the page crashes.
let now = Date.now();
const listeners = new Set<() => void>();
let timer: ReturnType<typeof setInterval> | null = null;

function tick() {
  now = Date.now();
  listeners.forEach(l => l());
}

export function subscribeToClock(callback: () => void) {
  listeners.add(callback);
  if (!timer) {
    now = Date.now();
    timer = setInterval(tick, 1000);
  }
  return () => {
    listeners.delete(callback);
    if (listeners.size === 0 && timer) {
      clearInterval(timer);
      timer = null;
    }
  };
}

export function getClockSnapshot(): number {
  return now;
}

// Server render has no clock, so components show a stable placeholder until hydration.
export function getServerSnapshot(): number | null {
  return null;
}
