import { EmailTemplateEditor } from '../email-template-editor';

export default function EmailTemplateEditorExample() {
  return (
    <EmailTemplateEditor
      initialSubject="Potential guest for {{show_name}}"
      initialBody="Hello {{host_name}},\n\nMy name is {{your_name}}, and I'm {{your_title}}. I've been following {{show_name}} and would love to discuss being a guest on your show.\n\nBest regards,\n{{your_name}}"
      onSave={(subject, body) => console.log('Template saved:', { subject, body })}
    />
  );
}
