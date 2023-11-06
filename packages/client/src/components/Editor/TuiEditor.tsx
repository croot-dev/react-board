import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import { Editor } from '@toast-ui/react-editor';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import { useEffect, useRef } from 'react';
import type { EditorType } from '@toast-ui/editor';

import styled from '@emotion/styled';

const EditorBox = styled.div`
`;
const EditorLabel = styled.div`
`;

interface IProps {
  label?: string;
  initialValue?: string;
  onChange?: (value: string, editorType?: EditorType) => void
}

export default function WysiwygEditor({ label, initialValue, onChange = () => {} }: IProps) {
  const editorRef = useRef<Editor>(null);
  const toolbarItems = [
    ['heading', 'bold', 'italic', 'strike', 'hr'], ['ul', 'ol', 'link'], ['code'], ['scrollSync'],
  ];

  const onChangeEditor = (editorType: EditorType) => {
    if (typeof editorRef.current?.getInstance === 'function') {
      const editorIns = editorRef.current.getInstance();
      const contentHtml = editorIns.getHTML();
      onChange(contentHtml, editorType);
    }
  };

  useEffect(() => {
  }, []);

  return (
    <EditorBox>
      {label && <EditorLabel>{label}</EditorLabel>}
      <Editor
        ref={editorRef}
        initialValue={initialValue}
        initialEditType="wysiwyg" // wysiwyg | markdown
        hideModeSwitch
        height="500px"
        theme=""
        usageStatistics={false}
        toolbarItems={toolbarItems}
        plugins={[colorSyntax]}
        autofocus={false}
        onChange={onChangeEditor}
        data-testid="wysiwyg-editor"
      />
    </EditorBox>
  );
}
