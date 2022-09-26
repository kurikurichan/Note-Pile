import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import './Editor.css';
import CustomToolbar from './CustomToolbar';

export default function Editor({content, setContent, setCWarn, handleBlur}) {

    // const handleChange = (html) => {
    //   setContent(html);
    // }

    // const modules = {
    //     toolbar: {
    //         container: "#toolbar",
    //     }
    // }
    // const formats = [
    //   'font','size',
    //   'bold','italic','underline','strike',
    //   'color', 'script',
    //   'header','blockquote','code-block',
    //   'indent','list',
    //   'direction','align',
    //   'link','image','video','formula',
    // ]

    const modules = {
        toolbar: [
          ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
          ['blockquote', 'code-block'],

          [{ 'header': 1 }, { 'header': 2 }],               // custom button values
          [{ 'list': 'ordered'}, { 'list': 'bullet' }],
          [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
          [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
          [{ 'direction': 'rtl' }],                         // text direction

          [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
          [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

          [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
          [{ 'font': [] }],
          [{ 'align': [] }],

          ['clean']                                         // remove formatting button
        ]
    }

  return (
    <>
      {/* <CustomToolbar /> */}
      <ReactQuill
          theme="snow"
          value={content}
          onChange={(e) => setContent(e)}
          placeholder="Start writing here!"
          modules={modules}
          // formats={formats}
          onBlur={handleBlur}
          translate="no"
          maxLength={10000}
          style={{padding:"12px 40px 0px"}}
          onKeyDown={() => content?.length >= 10000 && setCWarn(true)}
          onKeyUp={() => content?.length < 10000 && setCWarn(false)}
      />


    </>
  )
}
