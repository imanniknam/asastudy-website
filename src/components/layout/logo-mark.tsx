import { cn } from "@/lib/utils";

/**
 * ASA-STUDY emblem: a shield enclosing a globe, an open book, and a rising
 * graduate figure with a star — redrawn in the site palette so it reads on both
 * the light surfaces and the dark primary sections.
 */
export function LogoMark({
  className,
  tone = "brand",
}: {
  className?: string;
  tone?: "brand" | "light";
}) {
  const shield = tone === "light" ? "#ffffff" : "var(--color-primary)";
  const ink = tone === "light" ? "#ffffff" : "var(--color-primary)";
  const spark = tone === "light" ? "#ffffff" : "var(--color-accent)";

  return (
    <svg
      viewBox="0 0 64 64"
      className={cn("h-9 w-9", className)}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Shield outline */}
      <path
        d="M32 3.5 56.5 11v21.5c0 14.2-9.9 22.8-24.5 26.9C17.4 55.3 7.5 46.7 7.5 32.5V11L32 3.5Z"
        stroke={shield}
        strokeWidth="3"
        strokeLinejoin="round"
      />

      {/* Globe meridians inside the shield */}
      <circle cx="32" cy="25" r="11.5" stroke={ink} strokeWidth="1.6" opacity="0.55" />
      <path
        d="M32 13.5c-4 3.4-6 7.2-6 11.5s2 8.1 6 11.5c4-3.4 6-7.2 6-11.5s-2-8.1-6-11.5Z"
        stroke={ink}
        strokeWidth="1.6"
        opacity="0.55"
      />
      <path d="M20.5 25h23" stroke={ink} strokeWidth="1.6" opacity="0.55" />

      {/* Open book */}
      <path
        d="M15 34.5h13.5c2 0 3.5 1.4 3.5 3.2v11.6c0-1.8-1.5-3.2-3.5-3.2H15V34.5Z"
        fill={ink}
      />
      <path
        d="M49 34.5H35.5c-2 0-3.5 1.4-3.5 3.2v11.6c0-1.8 1.5-3.2 3.5-3.2H49V34.5Z"
        fill={ink}
      />

      {/* Rising graduate figure + star */}
      <path
        d="M32 47c-1.6-6.4-.6-12.6 3.2-18.6 2-3.2 4.6-6 7.8-8.4-1.2 4-2 7.2-2.4 9.6-1 6.4-3.8 12.2-8.6 17.4Z"
        fill={spark}
      />
      <circle cx="30" cy="22.5" r="3" fill={spark} />
      <path
        d="M43.4 14.2l1.1 2.6 2.8.3-2.1 1.9.6 2.7-2.4-1.4-2.4 1.4.6-2.7-2.1-1.9 2.8-.3 1.1-2.6Z"
        fill={spark}
      />
    </svg>
  );
}
