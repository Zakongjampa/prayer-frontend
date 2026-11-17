import { Link } from "react-router-dom";

const variants = {
  primary:
    "inline-flex items-center gap-3 rounded-full bg-[#783b30] px-6 py-3 font-semibold !text-[#fff7ea] !no-underline shadow-[0_7px_18px_rgba(74,31,25,0.18)] transition duration-150 hover:-translate-y-0.5 hover:bg-[#5f2d26] hover:!text-[#fff7ea] hover:!no-underline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#bd795e] motion-reduce:transition-none motion-reduce:hover:transform-none",
  secondary:
    "inline-flex items-center gap-3 rounded-full border border-[#8249343d] px-6 py-3 font-semibold !text-[#694d3d] !no-underline transition duration-150 hover:-translate-y-0.5 hover:bg-[#82493414] hover:!text-[#8d3c2d] hover:!no-underline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#bd795e] motion-reduce:transition-none motion-reduce:hover:transform-none",
  tertiary:
    "inline-flex items-center gap-2 rounded-full px-5 py-3 font-semibold !text-[#694d3d] !no-underline transition duration-150 hover:-translate-y-0.5 hover:bg-[#82493414] hover:!text-[#8d3c2d] hover:!no-underline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#bd795e] motion-reduce:transition-none motion-reduce:hover:transform-none",
};

export default function CollectionActionLink({
  children,
  className = "",
  href,
  icon: Icon,
  iconSize = 16,
  to,
  variant = "primary",
}) {
  const content = (
    <>
      {children}
      {Icon && <Icon size={iconSize} aria-hidden="true" />}
    </>
  );
  const classes = `${variants[variant]} ${className}`.trim();

  if (href) {
    return (
      <a className={classes} href={href}>
        {content}
      </a>
    );
  }

  return (
    <Link className={classes} to={to}>
      {content}
    </Link>
  );
}
