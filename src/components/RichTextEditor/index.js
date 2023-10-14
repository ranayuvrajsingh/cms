import { Editor } from '@tinymce/tinymce-react';
import React, { useRef } from 'react';
import { CancelICon, PodcastIcon } from '../../assets/svgs';
import { uploadImage } from '../../utils/helper';

const HIGHLIGHT_CONTENT_BG_COLOR = `rgb(162, 213, 213)`;
export const RichTextEditor = ({
  onChangeEditor,
  getTextEditorCurrentValue,
  ...fieldProps
}) => {

    const editorRef = useRef();
  let activeColor = useRef(null).current;
  return (
    <>
      <Editor
        {...fieldProps}
        onInit={(evt, editor) => (editorRef.current = editor)}
        onEditorChange={(value) => {
          onChangeEditor(
            value,
            editorRef.current?.getContent({ format: 'text' })
          );
        }}
        initialValue={getTextEditorCurrentValue}
        init={{
          // selector: 'textarea#image-tools',
          file_picker_callback: function(callback, value, meta) {
            if (meta.filetype == 'media') {
              callback('movie.mp4', {source2: 'alt.ogg', poster: 'image.jpg'});
            }
          },
          file_picker_types: 'media',
          height: 500,
          plugins: [
            'print my-example-plugin preview paste importcss searchreplace autolink directionality code visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons',
          ],
          toolbar_groups: {
            podcastgroup :{
              icon: 'podcast',
              tooltip: 'Podcast',
              items: 'media',
            },
          },
          setup: function (editor, api) {
            editor.on('keydown', function (event) {
              if (event.keyCode == 13 && event.shiftKey) {
                // console.log(event);
                event.preventDefault();
                event.stopPropagation();
                editor.execCommand('mceInsertNewLine');
                //does not inserts <br/> on shift+enter, which breaks the highlight content functionality
              }
            });
            editor.ui.registry.addIcon(
              'bubbles',
              '<svg width="24" height="24"  viewBox="0 0 576 512"><path d="M240 64c-25.333 0-49.791 3.975-72.693 11.814-21.462 7.347-40.557 17.718-56.751 30.823-30.022 24.295-46.556 55.401-46.556 87.587 0 17.995 5.033 35.474 14.96 51.949 10.343 17.17 25.949 32.897 45.13 45.479 15.22 9.984 25.468 25.976 28.181 43.975 0.451 2.995 0.815 6.003 1.090 9.016 1.361-1.26 2.712-2.557 4.057-3.897 12.069-12.020 28.344-18.656 45.161-18.656 2.674 0 5.359 0.168 8.047 0.509 9.68 1.226 19.562 1.848 29.374 1.848 25.333 0 49.79-3.974 72.692-11.814 21.463-7.346 40.558-17.717 56.752-30.822 30.023-24.295 46.556-55.401 46.556-87.587s-16.533-63.291-46.556-87.587c-16.194-13.106-35.289-23.476-56.752-30.823-22.902-7.839-47.359-11.814-72.692-11.814zM240 0v0c132.548 0 240 86.957 240 194.224s-107.452 194.224-240 194.224c-12.729 0-25.223-0.81-37.417-2.355-51.553 51.347-111.086 60.554-170.583 61.907v-12.567c32.126-15.677 58-44.233 58-76.867 0-4.553-0.356-9.024-1.015-13.397-54.279-35.607-88.985-89.994-88.985-150.945 0-107.267 107.452-194.224 240-194.224zM498 435.343c0 27.971 18.157 52.449 46 65.886v10.771c-51.563-1.159-98.893-9.051-143.571-53.063-10.57 1.325-21.397 2.020-32.429 2.020-47.735 0-91.704-12.879-126.807-34.52 72.337-0.253 140.63-23.427 192.417-65.336 26.104-21.126 46.697-45.913 61.207-73.674 15.383-29.433 23.183-60.791 23.183-93.203 0-5.224-0.225-10.418-0.629-15.584 36.285 29.967 58.629 70.811 58.629 115.838 0 52.244-30.079 98.861-77.12 129.382-0.571 3.748-0.88 7.58-0.88 11.483z"></path></svg>'
            );

            editor.ui.registry.addIcon(
              'podcast',
              <PodcastIcon />
            );

            editor.ui.registry.addButton('podcastTool',{
              text:'',
              icon: 'podcast',
              tooltip:'Add Podcast',
              onAction: async function(_) {
                // const podcastUrl = prompt('Enter Podcast Url');
                // if(podcastUrl){
                //    // editor.insertContent(`<div class="podcast"><iframe src="${podcastUrl}" width="100%" height="300" frameborder="0" scrolling="no" allowtransparency="true"></iframe></div>`);
                //     editor.insertContent(`<div class="podcast"><audio controls>' + '\n<source src="' ${podcastUrl}'"'' />\n''</audio></div>`);
                //  }
                // return '<audio controls>' + '\n<source src="' + data.source + '"' + (data.sourcemime ? ' type="' + data.sourcemime + '"' : '') + ' />\n' + (data.altsource ? '<source src="' + data.altsource + '"' + (data.altsourcemime ? ' type="' + data.altsourcemime + '"' : '') + ' />\n' : '') + '</audio>';
 
                 editor.execCommand('mceMedia');
              }
            })
            editor.ui.registry.addButton('customInsertButton', {
              text: '',
              icon: 'bubbles',
              tooltip: 'Highlight Content',
              onAction: async function (_) {
                let node = editor.selection.getNode();
                let color = editor.dom.getStyle(node, 'background-color', true);
                let highlightColor = {};
                if (color === 'rgba(0, 0, 0, 0)') {
                  highlightColor = await selectHighlightContentColor(editor);
                  activeColor = highlightColor?.colorpicker;
                }
                let rgb = '';
                let hexColor = editor.dom.toHex(color);
                let reset = false;
                reset =
                  hexColor == activeColor || !(color === 'rgba(0, 0, 0, 0)');
                if (!reset) {
                  editor.execCommand('Indent', false);
                  editor.execCommand(
                    'HiliteColor',
                    false,
                    highlightColor?.colorpicker
                  );
                } else {
                  editor.execCommand('RemoveFormat', false);
                }
              },
            });
          },
          menubar: false,
          contextmenu: 'image',

          placeholder: fieldProps.placeholder,
          image_caption: true,
           statusbar: false,
          default_link_target: '_blank',
          paste_webkit_styles: 'all',
          // force_br_newlines: true,
          remove_linebreaks: false,
          apply_source_formatting: true,
          paste_retain_style_properties: 'all',
          table_column_resizing: 'resizetable',
          imagetools_cors_hosts: ['amazonaws.com'],
          media_alt_source: false,
          media_poster: false,
          toolbar:
            'bold italic underline fontselect strikethrough link aligncenter bulllist alignleft  fontsizeselect customInsertButton image media blockquote hr removeformat ',
          // 'alignright alignjustify',
          fontsize_formats: FONT_SIZES,
          // images_upload_url: 'postAcceptor.php',
          images_upload_handler: async function (blobInfo, success, failure) {
            let formData = new FormData();
            formData.append('file', blobInfo?.blob());
            let response = await uploadImage(formData);
            success(response?.data?.url);
          },
          // font_formats:
          //   'Maison Neue=MaisonNeue-book;Inter=Inter; Roboto=Roboto; Raleway=raleway; Lato=Lato',
          font_formats:
            'Inter=Inter;Lato=Lato',
          content_style: `
          @import url('https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,400;0,800;1,400;1,800&display=swap');
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap');
          @import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,500;0,700;1,400;1,500;1,700&display=swap');
          @import url('https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,400;0,500;0,700;1,400;1,500;1,700&display=swap');
          @import url('https://cityscope-dev.s3.ap-south-1.amazonaws.com/fonts/MaisonNeue.css');
          body { font-family: MaisonNeue-book; font-size: 14px } p { margin-bottom: 0; margin-top: 0; },        
          `,
        }}
      />
    </>
  );
};
const FONT_SIZES = new Array(100)
  .fill('')
  .map((_, index) => index >= 8 && `${index}px`)
  ?.filter((item) => item)
  ?.join(' ');

const selectHighlightContentColor = (editor, callback) =>
  new Promise((res, rej) =>
    editor.windowManager.open({
      title: 'Select the background color of content', // The dialog's title - displayed in the dialog header
      body: {
        type: 'panel', // The root body type - a Panel or TabPanel
        items: [
          // A list of panel components
          {
            type: 'colorpicker', // component type
            name: 'colorpicker', // identifier
          },
        ],
      },
      onSubmit: function (api) {
        let data = api.getData();
        res(data);
        api.close();
      },
      buttons: [
        {
          type: 'cancel',
          text: 'Close',
        },
        {
          type: 'submit',
          text: 'Save',
          primary: true,
        },
      ],
    })
  );
