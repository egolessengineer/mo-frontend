import { ReactNode, useRef, useState } from "react";

interface CustomTooltipProps {
  content: string | ReactNode;
  className?: string;
  classNameChild?: string;
  children: ReactNode;
}

function CustomTooltip({
  content,
  children,
  className,
  classNameChild,
}: CustomTooltipProps) {
  const [showTooltip, setShowTooltip] = useState<boolean>(false);
  const hideTimeoutRef = useRef<number | null>(null);

  const handleMouseEnter = () => {
    if (hideTimeoutRef.current !== null) {
      clearTimeout(hideTimeoutRef.current);
    }
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    hideTimeoutRef.current = window.setTimeout(() => {
      setShowTooltip(false);
    }, 300);
  };

  return (
    <div
      className={className ? className : ""}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {showTooltip && (
        <div
          className={`absolute z-10 ${classNameChild} bg-gray-800 text-white p-2 rounded ml-8 -mt-8 flex items-start justify-start`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div>{content}</div>
        </div>
      )}
    </div>
  );
}

export default CustomTooltip;
