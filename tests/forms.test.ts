import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { SubmissionError } from "@formspree/core";
import { useForm } from "@formspree/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import BookingForm from "@/components/forms/BookingForm";
import ChallengeForm from "@/components/forms/ChallengeForm";

vi.mock("@formspree/react", async (importOriginal) => ({
  ...await importOriginal<typeof import("@formspree/react")>(),
  useForm: vi.fn(),
}));

const state = { errors: null as SubmissionError | null, result: null, submitting: false, succeeded: false };
const handleSubmit = vi.fn();
const input = (html: string, name: string) => html.match(new RegExp(`<input\\b[^>]*\\bname="${name}"[^>]*>`))?.[0];

beforeEach(() => {
  state.errors = null;
  state.submitting = false;
  state.succeeded = false;
  handleSubmit.mockReset();
  vi.mocked(useForm).mockReturnValue([state, handleSubmit, vi.fn()]);
});

const forms = [
  {
    name: "booking",
    render: () => renderToStaticMarkup(createElement(BookingForm, { formatTitles: ["Podcast", "Keynote"] })),
    success: "Inquiry received.",
    field: "email",
  },
  {
    name: "challenge",
    render: () => renderToStaticMarkup(createElement(ChallengeForm, { topics: [{ slug: "vaccines", name: "Vaccines" }] })),
    success: "Challenge sent. I read every one.",
    field: "claim",
  },
];

describe.each(forms)("$name form", ({ render, success, field }) => {
  it("renders a required name and a non-focusable spam honeypot without submitting", () => {
    const html = render();
    expect(input(html, "name")).toContain('required=""');
    expect(input(html, "_gotcha")).toContain('tabindex="-1"');
    expect(input(html, "_gotcha")).toContain('autoComplete="off"');
    expect(html).not.toContain(success);
    expect(handleSubmit).not.toHaveBeenCalled();
  });

  it("disables submission while the request is pending", () => {
    state.submitting = true;
    expect(render()).toMatch(/<button[^>]*type="submit"[^>]*disabled=""[^>]*>Sending/);
  });

  it("shows server field and form errors without showing a success receipt", () => {
    state.errors = new SubmissionError(
      { field, message: "Please check this field." },
      { message: "Delivery failed. Please try again." },
    );
    const html = render();
    expect(html).toContain("Please check this field.");
    expect(html).toContain("Delivery failed. Please try again.");
    expect(html).toContain('<form class="f card"');
    expect(html).not.toContain(success);
  });

  it("replaces the form with an accessible receipt only after success", () => {
    state.succeeded = true;
    const html = render();
    expect(html).toContain('role="status"');
    expect(html).toContain(success);
    expect(html).not.toContain("<form");
  });
});

it("retains booking email validation and provided inquiry choices", () => {
  const html = forms[0].render();
  expect(input(html, "email")).toContain('type="email"');
  expect(input(html, "email")).toContain('required=""');
  expect(html).toContain("<option>Podcast</option>");
  expect(html).toContain("<option>Keynote</option>");
});

it("requires a challenge evidence URL and provides a fallback topic", () => {
  const html = forms[1].render();
  expect(input(html, "evidence")).toContain('type="url"');
  expect(input(html, "evidence")).toContain('required=""');
  expect(html).toContain('name="_subject" value="Show challenge"');
  expect(html).toContain('<option value="Vaccines">Vaccines</option>');
  expect(html).toContain('<option value="Something else">Something else</option>');
});
