// src/components/ui/VisuallyHidden.tsx — Visually hidden but accessible text.

export function VisuallyHidden({
  children,
  as: Tag = "span",
}: {
  children: React.ReactNode;
  as?: "span" | "div" | "h2";
}) {
  return <Tag className="sr-only">{children}</Tag>;
}
