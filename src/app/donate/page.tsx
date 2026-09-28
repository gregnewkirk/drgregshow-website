import type { Metadata } from "next";
import SupportPage from "@/app/support/page";

export const metadata: Metadata = {
  title: "Donate",
};

export default function DonatePage() {
  return <SupportPage />;
}
