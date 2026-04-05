interface GridProps {
  children: React.ReactNode;
  className?: string;
}

export function Grid({ children, className = '' }: GridProps) {
  return (
    <div
      className={`
        grid-row grid grid-cols-12 gap-[30px]
        ${className}
      `}
    >
      {children}
    </div>
  );
}

interface ColProps {
  children: React.ReactNode;
  span?: number;
  spanMd?: number;
  spanLg?: number;
  className?: string;
}

export function Col({ children, span = 12, spanMd, spanLg, className = '' }: ColProps) {
  const getColSpan = () => {
    const classes = [`col-span-${span}`];
    if (spanMd) classes.push(`md:col-span-${spanMd}`);
    if (spanLg) classes.push(`lg:col-span-${spanLg}`);
    return classes.join(' ');
  };

  return (
    <div className={`grid-col ${getColSpan()} ${className}`}>
      {children}
    </div>
  );
}
