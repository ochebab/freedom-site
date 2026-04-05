import { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-black text-white hover:bg-gray-800',
  secondary: 'bg-gray-100 text-black hover:bg-gray-200',
  outline: 'border border-black text-black hover:bg-black hover:text-white',
  ghost: 'text-black hover:bg-gray-100',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
};

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  ...props
}: ButtonProps) {
  return (
    <button
      className={`
        btn btn--${variant} btn--${size}
        inline-flex items-center justify-center
        rounded transition-colors
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${fullWidth ? 'btn--full-width w-full' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}
