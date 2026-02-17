import { motion } from "framer-motion";
import { Flame, Target, Trophy } from "lucide-react";
import { Card } from "@/components/ui/card";

interface StreakTrackerProps {
  currentStreak?: number;
  longestStreak?: number;
}

export function StreakTracker({ currentStreak = 0, longestStreak = 0 }: StreakTrackerProps) {
  const days = ["M", "T", "W", "T", "F", "S", "S"];
  // Mock active days - in production this would come from actual data
  const activeDays = [true, true, true, false, true, true, false];

  return (
    <Card className="p-6" data-testid="card-streak-tracker">
      <div className="flex items-center justify-between gap-2 mb-4">
        <div className="flex items-center gap-2">
          <Flame 
            className={`w-6 h-6 ${currentStreak > 0 ? 'text-amber-500' : 'text-muted-foreground'}`}
          />
          <h3 className="text-lg font-semibold">Activity Streak</h3>
        </div>
        <div className="text-right">
          <div className="text-3xl font-black text-amber-500">{currentStreak}</div>
          <div className="text-xs text-muted-foreground">Day{currentStreak !== 1 ? 's' : ''}</div>
        </div>
      </div>

      {/* Week Grid */}
      <div className="grid grid-cols-7 gap-2 mb-4">
        {days.map((day, index) => (
          <motion.div
            key={index}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: index * 0.05 }}
            className={`aspect-square rounded-lg flex flex-col items-center justify-center text-xs font-semibold transition-all duration-300 ${
              activeDays[index]
                ? 'text-primary bg-primary/10'
                : 'text-muted-foreground bg-muted/50'
            }`}
            data-testid={`streak-day-${index}`}
          >
            <div className="mb-1">{day}</div>
            {activeDays[index] && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.05 + 0.2 }}
                className="w-1.5 h-1.5 rounded-full bg-primary"
              />
            )}
          </motion.div>
        ))}
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div className="p-3 rounded-lg bg-muted/50 flex items-center gap-2" data-testid="streak-stat-best">
          <Trophy className="w-5 h-5 text-amber-500" />
          <div>
            <div className="text-xs text-muted-foreground">Best</div>
            <div className="font-bold text-amber-500">{longestStreak} days</div>
          </div>
        </div>
        <div className="p-3 rounded-lg bg-muted/50 flex items-center gap-2" data-testid="streak-stat-goal">
          <Target className="w-5 h-5 text-secondary" />
          <div>
            <div className="text-xs text-muted-foreground">Goal</div>
            <div className="font-bold text-secondary">30 days</div>
          </div>
        </div>
      </div>
    </Card>
  );
}
