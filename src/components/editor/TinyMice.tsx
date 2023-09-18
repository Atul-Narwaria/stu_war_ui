import React from 'react';
import { Editor } from '@tinymce/tinymce-react';


interface RichTextEditorProps {
  value: string;
  onChange: (content: string) => void;
}

const TinyMice: React.FC<RichTextEditorProps> = ({ value, onChange }) => {
  const handleEditorChange = (content: string) => {
    onChange(content);
  };

  return (
    <Editor
      apiKey="fk7ckyz9049ltoeac8przeu7vxxpspx47eb1mpjg3fz62exf"
      initialValue={value}
      
      init={{
        height: 500,
        menubar: true,
       
        toolbar:
          'undo redo | formatselect | bold italic | \
          alignleft aligncenter alignright alignjustify | \
          bullist numlist outdent indent | removeformat | help'
      }}
      onEditorChange={handleEditorChange}
    />
  );
};

export default TinyMice;