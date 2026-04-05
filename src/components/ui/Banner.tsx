import { ReactNode } from 'react';

type BannerVariant = 'info' | 'success' | 'warning' | 'error';

interface BannerProps {
  children: ReactNode;
  variant?: BannerVariant;
  className?: string;
  onClose?: () => void;
}

const variantStyles: Record<BannerVariant, string> = {
  info: 'bg-blue-50 text-blue-800 border-blue-200',
  success: 'bg-green-50 text-green-800 border-green-200',
  warning: 'bg-yellow-50 text-yellow-800 border-yellow-200',
  error: 'bg-red-50 text-red-800 border-red-200',
};

export function Banner({ children, variant = 'info', className = '', onClose }: BannerProps) {
  return (
    <div
      className={`
        banner banner--${variant}
        px-4 py-3 border rounded
        ${variantStyles[variant]}
        ${className}
      `}
    >
      <div className="banner__content flex items-center justify-between">
        <div className="banner__text">{children}</div>
        {onClose && (
          <button
            onClick={onClose}
            className="banner__close ml-4 hover:opacity-70 transition-opacity"
            aria-label="Close"
          >
            <svg className="banner__close-icon w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
