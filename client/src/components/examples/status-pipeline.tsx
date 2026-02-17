import { StatusPipeline } from '../status-pipeline';

export default function StatusPipelineExample() {
  const counts = {
    discovered: 45,
    qualified: 32,
    pitched: 18,
    followup: 12,
    responded: 8,
    booked: 3,
  };

  return (
    <StatusPipeline
      counts={counts}
      onStageClick={(stage) => console.log('Stage clicked:', stage)}
    />
  );
}
