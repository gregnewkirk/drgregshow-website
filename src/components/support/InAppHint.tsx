"use client";

import { useSyncExternalStore } from "react";

// TikTok and Instagram open links in their own browser, where Apple Pay / Google Pay
// often don't show up. Detect that from the user agent and suggest opening in the real browser.
const IN_APP = /Instagram|FBAN|FBAV|musical_ly|BytedanceWebview|TikTok/i;
const subscribe = () => () => {};

export default function InAppHint() {
  const inApp = useSyncExternalStore(subscribe, () => IN_APP.test(navigator.userAgent), () => false);
  if (!inApp) return null;
  return (
    <p className="inapp">
      Tipping from TikTok or Instagram? Tap <b>•••</b> and choose <b>Open in browser</b> to pay with Apple Pay or Google Pay.
    </p>
  );
}
