import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

export type PipelineStatus = "discovered" | "qualified" | "pitched" | "followup" | "responded" | "booked";

interface StatusPipelineProps {
  counts: Record<PipelineStatus, number>;
  onStageClick?: (stage: PipelineStatus) => void;
}

const stages: { key: PipelineStatus; label: string; colorClass: string; bgClass: string }[] = [
  { key: "discovered", label: "Discovered", colorClass: "text-primary", bgClass: "bg-primary" },
  { key: "qualified", label: "Qualified", colorClass: "text-blue-600", bgClass: "bg-blue-600" },
  { key: "pitched", label: "Pitched", colorClass: "text-secondary", bgClass: "bg-secondary" },
  { key: "followup", label: "Follow-up", colorClass: "text-accent", bgClass: "bg-accent" },
  { key: "responded", label: "Responded", colorClass: "text-green-600", bgClass: "bg-green-600" },
  { key: "booked", label: "Booked", colorClass: "text-amber-500", bgClass: "bg-amber-500" },
];

export function StatusPipeline({ counts, onStageClick }: StatusPipelineProps) {
  const total = Object.values(counts).reduce((sum, count) => sum + count, 0);

  return (
    <div className="p-6 rounded-xl">
      <div className="flex gap-3 overflow-x-auto pb-2">
        {stages.map((stage, index) => {
          const count = counts[stage.key] || 0;
          const hasItems = count > 0;

          return (
            <div key={stage.key} className="flex items-center gap-3">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card
                  className="p-5 min-w-[130px] cursor-pointer hover-elevate"
                  onClick={() => onStageClick?.(stage.key)}
                  data-testid={`card-stage-${stage.key}`}
                >
                  <div className="text-center">
                    <p 
                      className={`text-xs font-semibold uppercase tracking-wider mb-2 ${hasItems ? stage.colorClass : ''}`}
                    >
                      {stage.label}
                    </p>
                    <motion.p 
                      className={`text-3xl font-black ${hasItems ? stage.colorClass : 'text-muted-foreground'}`}
                      data-testid={`text-count-${stage.key}`}
                      initial={{ scale: 0.5 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, delay: index * 0.1 + 0.2 }}
                    >
                      {count}
                    </motion.p>
                    {total > 0 && (
                      <div className="mt-3 h-1.5 rounded-full bg-muted/30 overflow-hidden">
                        <motion.div
                          className={`h-full rounded-full ${stage.bgClass}`}
                          initial={{ width: 0 }}
                          animate={{ width: `${(count / total) * 100}%` }}
                          transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
                        />
                      </div>
                    )}
                  </div>
                </Card>
              </motion.div>
              {index < stages.length - 1 && (
                <motion.div 
                  className="text-2xl font-light text-muted-foreground/30"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.15 }}
                >
                  →
                </motion.div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
