import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import { Viewer } from '@toast-ui/react-editor';

interface IProps {
  content: string;
}

export default function TuiEditorViewer({ content = '' }: IProps) {
  return (
    <Viewer
      initialValue={content}
    />
  );
}
