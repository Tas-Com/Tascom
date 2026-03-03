import React from 'react';

interface EmptyStateProps {
  imageSrc: string;
  message: string;
  className?: string;
  imageClassName?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ 
  imageSrc, 
  message, 
  className = "", 
  imageClassName = "w-[200px] h-auto" 
}) => {
  return (
    <div className={`flex flex-col items-center justify-center py-12 px-4 text-center ${className}`}>
      <div className="relative mb-6">
        <img 
          src={imageSrc} 
          alt="Empty state" 
          className={`${imageClassName} object-contain opacity-80`}
        />
      </div>
      <p className="text-[#251455] text-[16px] font-medium opacity-70">
        {message}
      </p>
    </div>
  );
};
