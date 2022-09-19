// react-quill components
import ReactQuill from "react-quill";

// react-quill styles
import "react-quill/dist/quill.snow.css";

// Custom styles for the MDEditor
import MDEditorRoot from "components/MDEditor/MDEditorRoot";

// Material Dashboard 2 PRO React context
import { useMaterialUIController } from "context";

function MDEditor(props) {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  return (
    <MDEditorRoot ownerState={{ darkMode }}>
      <ReactQuill theme="snow" {...props} />
    </MDEditorRoot>
  );
}

export default MDEditor;
