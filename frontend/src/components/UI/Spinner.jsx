import React from "react";
import { Loader2 } from "lucide-react";

const sizeClasses = {
  xs: "w-3 h-3",
  sm: "w-4 h-4",
  md: "w-6 h-6",
  lg: "w-8 h-8",
  xl: "w-12 h-12",
  "2xl": "w-16 h-16",
};

const colorClasses = {
  primary: "text-primary-600",
  secondary: "text-secondary-600",
  success: "text-success-600",
  warning: "text-warning-600",
  danger: "text-danger-600",
  white: "text-white",
  gray: "text-gray-600",
};

const Spinner = ({
  size = "md",
  color = "primary",
  text = "",
  fullScreen = false,
  className = "",
}) => {
  const content = (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <Loader2
        className={`animate-spin ${sizeClasses[size]} ${colorClasses[color]}`}
      />
      {text && (
        <p className={`mt-2 text-sm ${colorClasses[color]} animate-pulse`}>
          {text}
        </p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50">
        {content}
      </div>
    );
  }

  return content;
};

// export const ButtonSpinner = (props) => <Spinner size="sm" {...props} />;
// export const PageSpinner = ({ text = "Loading..." }) => (
//   <Spinner size="xl" text={text} fullScreen />
// );
// export const InlineSpinner = (props) => (
//   <Spinner size="sm" className="inline" {...props} />
// );
// export const CardSpinner = ({ text = "Loading..." }) => (
//   <Spinner size="lg" text={text} />
// );

export default Spinner;
