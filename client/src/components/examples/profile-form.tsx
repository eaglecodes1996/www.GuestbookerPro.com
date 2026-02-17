import { ProfileForm } from '../profile-form';

export default function ProfileFormExample() {
  return (
    <ProfileForm
      initialData={{
        name: 'Benton Ryer',
        title: 'Shaman in the Japanese Shinto tradition',
        bio: 'I specialize in spiritual healing and esoteric practices.',
        website: 'https://esotericshinto.com',
        topics: ['Shinto', 'Spiritual Healing', 'Occult', 'New Age'],
      }}
      onSave={(data) => console.log('Profile saved:', data)}
    />
  );
}
