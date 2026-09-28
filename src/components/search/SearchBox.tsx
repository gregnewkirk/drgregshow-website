"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

type Props = {
  initialQuery: string;
};

// Client component. Never imports from @/content: the initial query text comes in as a plain
// prop from the server page. Ports the mockup's searchForm(): a controlled input that navigates
// to /search?q=... on submit, which updates the URL searchParams and re-renders the server page
// with the new query (SearchResults below then re-fetches for the new q).
export default function SearchBox({ initialQuery }: Props) {
  const router = useRouter();
  const [value, setValue] = useState(initialQuery);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const q = value.trim();
    router.push(q ? `/search?q=${encodeURIComponent(q)}` : "/search");
  }

  return (
    <form className="sbox" role="search" onSubmit={onSubmit}>
      <label className="sr" htmlFor="sq">
        Search the transcripts
      </label>
      <input
        id="sq"
        name="q"
        type="search"
        placeholder="Try autism, mRNA, lab leak"
        autoComplete="off"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button className="btn primary" type="submit">
        Search transcripts
      </button>
    </form>
  );
}
