import { createElement } from "react";
import { ArrowRight, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

export default function CollectionItemLink({
  icon: Icon = BookOpen,
  rank,
  subtitle,
  title,
  to,
  className = "",
}) {
  return (
    <Link
      className={`group flex items-center gap-3 rounded-2xl border border-[#eed8b333] bg-[linear-gradient(145deg,rgba(238,216,179,0.09),rgba(238,216,179,0.035)),rgba(36,16,18,0.4)] p-3 !text-[#f4e9d2] !no-underline shadow-[0_12px_30px_rgba(8,3,4,0.12)] transition duration-200 hover:-translate-y-1 hover:border-[#eed8b370] hover:!text-[#fff7ea] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#bd795e] motion-reduce:transition-none motion-reduce:hover:transform-none sm:gap-4 sm:p-5 ${className}`.trim()}
      to={to}
    >
      <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-[#e7c98f3d] bg-[#e7c98f1a] text-[#e7c98f] sm:size-11">
        {rank != null ? (
          <span className="text-sm font-bold">
            {String(rank).padStart(2, "0")}
          </span>
        ) : (
          createElement(Icon, { size: 20, "aria-hidden": true })
        )}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-base font-semibold sm:text-lg">{title}</span>
        {subtitle && (
          <span className="mt-1 block text-sm text-[#f4e9d2a6]">
            {subtitle}
          </span>
        )}
      </span>
      <ArrowRight
        className="shrink-0 text-[#d3a77c] transition-transform group-hover:translate-x-1 motion-reduce:transition-none"
        size={18}
        aria-hidden="true"
      />
    </Link>
  );
}
