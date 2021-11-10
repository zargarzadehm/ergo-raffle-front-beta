import { CKEditor } from '@ckeditor/ckeditor5-react';
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';


const CreateRaffleDescription = ({ formFeedback, defaultValue }) => {
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
              data={defaultValue}
              editor={DecoupledEditor}
              onReady={editor => {
                editor.ui.getEditableElement().parentElement.insertBefore(
                  editor.ui.view.toolbar.element,
                  editor.ui.getEditableElement()
                );
              }}
              onError={({ willEditorRestart }) => {

                // This is why you need to remove the older toolbar.
                if (willEditorRestart) {
                  this.editor.ui.view.toolbar.element.remove();
                }
              }}
              config={{
                toolbar: {
                  items: [
                    'heading',
                    '|',
                    'bold',
                    'italic',
                    '|',
                    'alignment:left',
                    'alignment:right',
                    'alignment:center',
                    'alignment:justify',
                    'indent',
                    'outdent',
                    'numberedList',
                    'bulletedList',
                    '|',
                    'link',
                    'blockQuote',
                    'insertTable',
                    '|',
                    'undo',
                    'redo'
                  ]
                },
              }}
              onChange={(event, editor) => {
                let data = editor.getData();
                changeEditor(data);
              }}
            />
          </div>
        </div>
      </form>
    </div>
  </div>)
};

export default CreateRaffleDescription;