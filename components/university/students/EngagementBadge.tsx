'use client';

interface EngagementBadgeProps {
  score: number; // 0-100
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export default function EngagementBadge({
  score,
  showLabel = true,
  size = 'md'
}: EngagementBadgeProps) {
  // Determine engagement level and colors
  const getEngagementLevel = (score: number): {
    level: 'low' | 'medium' | 'high';
    label: string;
    bgColor: string;
    textColor: string;
    gaugeColor: string;
  } => {
    if (score <= 30) {
      return {
        level: 'low',
        label: 'Basso',
        bgColor: 'bg-red-50',
        textColor: 'text-red-700',
        gaugeColor: 'bg-red-500'
      };
    }
    if (score <= 60) {
      return {
        level: 'medium',
        label: 'Medio',
        bgColor: 'bg-yellow-50',
        textColor: 'text-yellow-700',
        gaugeColor: 'bg-yellow-500'
      };
    }
    return {
      level: 'high',
      label: 'Alto',
      bgColor: 'bg-green-50',
      textColor: 'text-green-700',
      gaugeColor: 'bg-green-500'
    };
  };

  const { label, bgColor, textColor, gaugeColor } = getEngagementLevel(score);

  const sizeClasses = {
    sm: {
      container: 'px-2 py-1',
      text: 'text-xs',
      gauge: 'h-1 w-12'
    },
    md: {
      container: 'px-2.5 py-1.5',
      text: 'text-sm',
      gauge: 'h-1.5 w-16'
    },
    lg: {
      container: 'px-3 py-2',
      text: 'text-base',
      gauge: 'h-2 w-20'
    }
  };

  const classes = sizeClasses[size];

  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full ${bgColor} ${classes.container}`}
    >
      {/* Mini gauge */}
      <div className={`${classes.gauge} bg-gray-200 rounded-full overflow-hidden`}>
        <div
          className={`h-full ${gaugeColor} rounded-full transition-all duration-300`}
          style={{ width: `${score}%` }}
        />
      </div>

      {/* Score and label */}
      <span className={`font-medium ${textColor} ${classes.text}`}>
        {score}
        {showLabel && <span className="font-normal ml-1">({label})</span>}
      </span>
    </div>
  );
}
