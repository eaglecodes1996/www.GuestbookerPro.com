import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  testId?: string;
  color?: "cyan" | "purple" | "pink" | "green" | "gold";
}

export function MetricCard({ title, value, icon: Icon, trend, testId, color = "cyan" }: MetricCardProps) {
  const colorStyles = {
    cyan: { textClass: "text-primary", bgClass: "bg-primary/10" },
    purple: { textClass: "text-secondary", bgClass: "bg-secondary/10" },
    pink: { textClass: "text-accent", bgClass: "bg-accent/10" },
    green: { textClass: "text-green-600", bgClass: "bg-green-100" },
    gold: { textClass: "text-amber-500", bgClass: "bg-amber-100" },
  };

  const currentColor = colorStyles[color];

  return (
    <Card className="p-6 hover-elevate transition-all duration-300">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <p className="text-sm text-muted-foreground uppercase tracking-wide" data-testid={testId ? `${testId}-label` : undefined}>
            {title}
          </p>
          <motion.p
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className={`text-4xl font-black mt-2 ${currentColor.textClass}`}
            data-testid={testId ? `${testId}-value` : undefined}
          >
            {value}
          </motion.p>
          {trend && (
            <p className="text-xs text-muted-foreground mt-1" data-testid={testId ? `${testId}-trend` : undefined}>
              {trend}
            </p>
          )}
        </div>
        <div className={`p-3 rounded-lg ${currentColor.bgClass}`}>
          <Icon className={`w-6 h-6 ${currentColor.textClass}`} />
        </div>
      </div>
    </Card>
  );
}
