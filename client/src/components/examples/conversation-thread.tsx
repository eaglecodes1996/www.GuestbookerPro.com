import { ConversationThread } from '../conversation-thread';

export default function ConversationThreadExample() {
  const messages = [
    {
      id: '1',
      from: 'You',
      fromEmail: 'you@example.com',
      content: 'Hello Sarah,\n\nI would love to be a guest on your show to discuss spiritual healing practices.',
      timestamp: '2 days ago',
      isYou: true,
    },
    {
      id: '2',
      from: 'Sarah Johnson',
      fromEmail: 'sarah@spiritualjourney.com',
      content: "Hi! Thanks for reaching out. I'd love to have you on the show! Could you share some more details about your background?",
      timestamp: '1 day ago',
      isYou: false,
    },
  ];

  return (
    <ConversationThread
      showName="The Spiritual Journey Podcast"
      messages={messages}
      sentiment="positive"
      onReply={(content) => console.log('Reply sent:', content)}
    />
  );
}
