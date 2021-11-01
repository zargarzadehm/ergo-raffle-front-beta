import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const StepOneC = ({ formFeedback, defaultValue }) => {
  const changeEditor = (data) => {
    formFeedback('description', data);
  }
  return (<div className="first-step step-1-c">
    <div className="step-content text-center text-lg-start">
      <h3 className="step-title mb-4">
        You can write a description for your raffle.
      </h3>
      <form>
        <div className="editor-bordered-box">
          <div>
            <CKEditor
              editor={ClassicEditor}
              data={defaultValue}
              onChange={(event, editor) => {
                const data = editor.getData();
                changeEditor(data);
              }}
            />
          </div>
        </div>
      </form>
    </div>
  </div>)
};

export default StepOneC;