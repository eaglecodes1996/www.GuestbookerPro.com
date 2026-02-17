import { MetricCard } from '../metric-card';
import { Users } from 'lucide-react';

export default function MetricCardExample() {
  return (
    <MetricCard
      title="Total Shows"
      value="124"
      icon={Users}
      trend="+12% from last month"
    />
  );
}
