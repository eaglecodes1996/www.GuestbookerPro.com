import { ShowCard } from '../show-card';

export default function ShowCardExample() {
  return (
    <ShowCard
      id="1"
      name="The Spiritual Journey Podcast"
      host="Sarah Johnson"
      platform="podcast"
      subscribers={45000}
      episodeCount={127}
      lastEpisode="2 days ago"
      status="discovered"
      guestScore={85}
      onView={() => console.log('View show clicked')}
      onStatusChange={(status) => console.log('Status changed to:', status)}
    />
  );
}
