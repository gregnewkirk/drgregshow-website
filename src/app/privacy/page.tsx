import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy",
  description: "What drgregshow.com collects, and how the show's YouTube publishing tool uses Google data.",
};

export default function PrivacyPage() {
  return (
    <section className="page-head">
      <div className="wrap">
        <h1>Privacy</h1>
        <p className="small">Last updated October 14, 2026</p>
        <p className="lede">This page covers drgregshow.com and the tools I use to publish The Dr Greg Show.</p>

        <h2>What this site collects</h2>
        <p>
          The site has no ads and no analytics. Two forms send me what you type into them: the booking form and the
          challenge form. Both run through Formspree, which delivers your message to my inbox. I use it to answer you
          and to plan the show, and I don&apos;t sell it or add you to any mailing list. The site is hosted on Vercel,
          which keeps standard server logs (IP address, browser, the page you asked for) for security.
        </p>

        <h2>YouTube access</h2>
        <p>
          &quot;Dr Greg Show Production&quot; is my own publishing tool. With Google&apos;s permission it signs in to my
          YouTube channel to upload my videos, set their titles, descriptions, thumbnails, playlists and publish times,
          and read my channel&apos;s analytics. It works only on my channel and never sees anyone else&apos;s Google
          account. What it reads from YouTube (my videos and my channel&apos;s numbers) stays on my own computers and is
          used only to publish the show. None of it is sold or shared.
        </p>
        <p>
          The tool&apos;s use of information received from Google APIs follows the{" "}
          <a href="https://developers.google.com/terms/api-services-user-data-policy">
            Google API Services User Data Policy
          </a>
          , including its Limited Use requirements. You can see and remove the apps connected to any Google account at{" "}
          <a href="https://myaccount.google.com/permissions">myaccount.google.com/permissions</a>.
        </p>

        <h2>Questions</h2>
        <p>
          Email <a href="mailto:greg@drgregshow.com">greg@drgregshow.com</a>. If you sent me something through a form
          and want it deleted, ask and I&apos;ll delete it.
        </p>
      </div>
    </section>
  );
}
