import { motion } from "framer-motion";
import { Zap } from "lucide-react";
import { Card } from "@/components/ui/card";

interface MomentumScoreProps {
  totalShows: number;
  outreachSent: number;
  positiveReplies: number;
  bookings: number;
}

export function MomentumScore({ totalShows, outreachSent, positiveReplies, bookings }: MomentumScoreProps) {
  // Calculate momentum score (0-100)
  const momentum = Math.min(
    100,
    Math.round(
      (totalShows * 0.1) +
      (outreachSent * 2) +
      (positiveReplies * 5) +
      (bookings * 10)
    )
  );

  const getMomentumLevel = () => {
    if (momentum >= 80) return { 
      label: "ON FIRE", 
      gradientStart: "hsl(38 92% 50%)", 
      gradientEnd: "hsl(25 95% 53%)",
      textClass: "text-amber-500"
    };
    if (momentum >= 60) return { 
      label: "CRUSHING IT", 
      gradientStart: "hsl(var(--secondary))", 
      gradientEnd: "hsl(var(--accent))",
      textClass: "text-secondary"
    };
    if (momentum >= 40) return { 
      label: "BUILDING", 
      gradientStart: "hsl(var(--primary))", 
      gradientEnd: "hsl(var(--secondary))",
      textClass: "text-primary"
    };
    if (momentum >= 20) return { 
      label: "WARMING UP", 
      gradientStart: "hsl(142 76% 36%)", 
      gradientEnd: "hsl(var(--primary))",
      textClass: "text-green-600"
    };
    return { 
      label: "GETTING STARTED", 
      gradientStart: "hsl(var(--muted-foreground))", 
      gradientEnd: "hsl(var(--muted))",
      textClass: "text-muted-foreground"
    };
  };

  const level = getMomentumLevel();
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (momentum / 100) * circumference;

  return (
    <Card className="p-6 hover-elevate transition-all duration-300" data-testid="card-momentum-score">
      <div className="flex items-center gap-6">
        <div className="relative" data-testid="momentum-score-ring">
          <svg className="w-32 h-32 transform -rotate-90">
            <circle
              cx="64"
              cy="64"
              r="45"
              stroke="hsl(var(--muted) / 0.3)"
              strokeWidth="8"
              fill="none"
            />
            <motion.circle
              cx="64"
              cy="64"
              r="45"
              stroke="url(#momentum-gradient)"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
            <defs>
              <linearGradient id="momentum-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={level.gradientStart} />
                <stop offset="100%" stopColor={level.gradientEnd} />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring" }}
              className={`text-4xl font-black ${level.textClass}`}
              data-testid="text-momentum-value"
            >
              {momentum}
            </motion.div>
            <div className="text-xs text-muted-foreground">MOMENTUM</div>
          </div>
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-6 h-6 text-amber-500" />
            <h3 className={`text-xl font-bold ${level.textClass}`} data-testid="text-momentum-level">{level.label}</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Keep the momentum going by discovering shows and sending outreach!
          </p>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-2 rounded-lg bg-muted/50" data-testid="momentum-stat-shows">
              <div className="text-muted-foreground">Shows</div>
              <div className="text-lg font-bold text-primary">{totalShows}</div>
            </div>
            <div className="p-2 rounded-lg bg-muted/50" data-testid="momentum-stat-outreach">
              <div className="text-muted-foreground">Outreach</div>
              <div className="text-lg font-bold text-secondary">{outreachSent}</div>
            </div>
            <div className="p-2 rounded-lg bg-muted/50" data-testid="momentum-stat-replies">
              <div className="text-muted-foreground">Replies</div>
              <div className="text-lg font-bold text-accent">{positiveReplies}</div>
            </div>
            <div className="p-2 rounded-lg bg-muted/50" data-testid="momentum-stat-booked">
              <div className="text-muted-foreground">Booked</div>
              <div className="text-lg font-bold text-green-600">{bookings}</div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
