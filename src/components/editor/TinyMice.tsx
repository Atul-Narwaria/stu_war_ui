import React from 'react';
import { Editor } from '@tinymce/tinymce-react';


interface RichTextEditorProps {
  value: string;
  onChange: (content: string) => void;
  height?: number;
  type?:any
}

const TinyMice: React.FC<RichTextEditorProps> = ({ value, onChange, height,type}) => {
  const handleEditorChange = (content: string) => {
    onChange(content);
  };

  return (
    <Editor
      apiKey="fk7ckyz9049ltoeac8przeu7vxxpspx47eb1mpjg3fz62exf"
      value={value}
      disabled={type ? type : false}
      init={{
        height: height ? height : 500,
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