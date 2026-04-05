interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  fullWidth?: boolean;
}

export function Container({ children, className = '', fullWidth = false }: ContainerProps) {
  return (
    <div
      className={`
        container-grid mx-auto w-full px-[15px]
        ${fullWidth ? 'container-grid--full' : 'container-grid--default max-w-[1100px]'}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
