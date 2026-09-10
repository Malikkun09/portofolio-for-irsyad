export function FlipText({
  children,
  on,
}: {
  children: string;
  on?: boolean;
}) {
  return (
    <span className={`flip${on ? " is-on" : ""}`}>
      <span className="flip-track">
        <span>{children}</span>
        <span aria-hidden>{children}</span>
      </span>
    </span>
  );
}

export function ArrowIcon() {
  return (
    <svg viewBox="0 0 12 12" width="12" height="12" aria-hidden>
      <path
        d="M2 6h8M7 3l3 3-3 3"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
      />
    </svg>
  );
}
