import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  color: "orange" | "blue" | "green" | "purple";
  subtitle?: string;
}

const colorClasses = {
  orange: {
    bg: "bg-orange-100",
    icon: "bg-orange-500",
    text: "text-orange-600",
  },
  blue: {
    bg: "bg-blue-100",
    icon: "bg-blue-500",
    text: "text-blue-600",
  },
  green: {
    bg: "bg-green-100",
    icon: "bg-green-500",
    text: "text-green-600",
  },
  purple: {
    bg: "bg-purple-100",
    icon: "bg-purple-500",
    text: "text-purple-600",
  },
};

export default function StatsCard({
  title,
  value,
  icon: Icon,
  color,
  subtitle,
}: StatsCardProps) {
  const colors = colorClasses[color];

  return (
    <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm">
      <div className="flex items-start justify-between">
        <div className="min-w-0 flex-1">
          <p className="text-gray-500 text-xs md:text-sm font-medium truncate">{title}</p>
          <p className="text-2xl md:text-3xl font-bold text-gray-900 mt-1">{value}</p>
          {subtitle && (
            <p className={`text-xs md:text-sm mt-1 ${colors.text} truncate`}>{subtitle}</p>
          )}
        </div>
        <div className={`p-2 md:p-3 rounded-lg ${colors.bg} ml-2 flex-shrink-0`}>
          <Icon className={`w-5 h-5 md:w-6 md:h-6 text-white ${colors.icon} rounded`} />
        </div>
      </div>
    </div>
  );
}
