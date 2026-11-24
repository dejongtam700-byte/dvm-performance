/** Klein technisch sectielabel: "[02] DIENSTEN ———" */
export function SectionTag({ index, children, className = "" }: { index: string; children: string; className?: string }) {
  return (
    <p className={`tech flex items-center gap-3 ${className}`}>
      <span className="text-signal-hi">[{index}]</span>
      <span>{children}</span>
      <span aria-hidden className="h-px w-10 bg-line" />
    </p>
  );
}
