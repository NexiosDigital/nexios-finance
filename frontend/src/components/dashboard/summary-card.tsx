import React from "react";

interface SummaryCardProps {
  title: string;
  value: string;
  change?: string;
  isPositive?: boolean;
  icon?: React.ReactNode;
}

export const SummaryCard: React.FC<SummaryCardProps> = ({
  title,
  value,
  change,
  isPositive,
  icon,
}) => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-sm">
      <div className="flex justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <h3 className="text-2xl font-semibold mt-1">{value}</h3>
          {change && (
            <p className={`text-sm mt-1 ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
              {isPositive ? '+' : ''}{change}
            </p>
          )}
        </div>
        {icon && <div className="text-blue-500">{icon}</div>}
      </div>
    </div>
  );
};