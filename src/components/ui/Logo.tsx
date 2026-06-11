import Link from "next/link";

/* Wordmark SVG „VP" în scut roșu + „SERVICE AUTO".
   Scutul preia roșul LED al fațadei; textul moștenește Jakarta. */

export function Logo({ withTagline = false }: { withTagline?: boolean }) {
  return (
    <Link href="/" className="flex shrink-0 items-center gap-2.5">
      <svg
        viewBox="0 0 64 76"
        className="h-10 w-auto drop-shadow-[0_0_10px_rgba(227,6,19,0.45)]"
        aria-hidden
      >
        <path
          d="M32 2 L62 14 V40 C62 57 49 70 32 74 C15 70 2 57 2 40 V14 Z"
          fill="#e30613"
        />
        <text
          x="32"
          y="47"
          textAnchor="middle"
          fontSize="27"
          fontWeight="800"
          fill="#ffffff"
          fontFamily="inherit"
          className="font-heading"
        >
          VP
        </text>
      </svg>
      <span className="leading-tight">
        <span className="font-heading block text-[17px] font-extrabold tracking-wide text-paper">
          SERVICE AUTO
        </span>
        {withTagline ? (
          <span className="block text-[11px] font-semibold text-red-bright">
            Ne pasă de mașina ta!
          </span>
        ) : (
          <span className="block text-[11px] font-medium tracking-[0.22em] text-steel-400 uppercase">
            Constatare daune
          </span>
        )}
      </span>
    </Link>
  );
}
