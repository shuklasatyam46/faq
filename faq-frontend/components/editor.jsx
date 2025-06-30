import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import { MdFormatListBulleted } from "react-icons/md";
import { HiMiniH1 } from "react-icons/hi2";
import { HiMiniH2 } from "react-icons/hi2";
import { LuBold } from "react-icons/lu";
import { GoItalic } from "react-icons/go";
import { AiOutlineUnderline } from "react-icons/ai";
import { HiMiniNumberedList } from "react-icons/hi2";
import { FaLink } from "react-icons/fa6";
import { FaUnlink } from "react-icons/fa";
import { BsTranslate } from "react-icons/bs";
import Placeholder from "@tiptap/extension-placeholder";
import { BsEraserFill } from "react-icons/bs";
import { useState, useEffect } from "react";


export default function TiptapEditor({onSendData,isAnswer,PostData,GetData,onGetFaq,Method,isChanging}) {

  const [lang, setLang] = useState("en");
  const editor = useEditor({
    extensions: [StarterKit, Underline, Link, Placeholder.configure({
      placeholder: isAnswer ? "Type the answer..." : "Type the question..."})],
    content: "",
    key: isAnswer ? 'answer' : 'question',
  });

  const sendData = () => {
    onSendData({text:editor.getText(),lang:lang});
};
  useEffect(() => {
  if (editor && PostData && Method === 'Post') {
    editor.commands.setContent(PostData);
  }
  else if (editor && GetData && Method === 'Get'&&!isChanging) {
    editor.commands.setContent(GetData);
  }
  }, [editor, PostData, GetData, Method]);

  const getFaq = () => {
    onGetFaq(lang);
    
  }

  
  if (!editor) return null;

  return (
    <div className="w-full mx-auto p-6 rounded-lg bg-gray-100/50 backdrop-blur-md">
      <div className="flex flex-wrap gap-2 justify-evenly mb-4 bg-gray-100 p-1.5 rounded-lg">
        <button onClick={() => editor.chain().focus().toggleBold().run()} className={`btn ${editor.isActive('bold') ? 'bg-gray-500 text-white' : ''}`}>
          <LuBold size={22.5}></LuBold>
        </button>
        <button onClick={() => editor.chain().focus().toggleItalic().run()} className={`btn ${editor.isActive('italic') ? 'bg-gray-500 text-white' : ''}`}> 
          <GoItalic size={22.5}></GoItalic>
        </button>
        <button onClick={() => editor.chain().focus().toggleUnderline().run()} className={`btn ${editor.isActive('underline') ? 'bg-gray-500 text-white' : ''}`}>
          <AiOutlineUnderline size={22.5}></AiOutlineUnderline>
        </button>
        <button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className={`btn ${editor.isActive('heading',{level:1}) ? 'bg-gray-500 text-white' : ''}`}>
          <HiMiniH1 size={22.5}></HiMiniH1>
        </button>
        <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={`btn ${editor.isActive('heading',{level:2}) ? 'bg-gray-500 text-white' : ''}`}>
          <HiMiniH2 size={22.5}></HiMiniH2>
        </button>
        <button onClick={() => editor.chain().focus().toggleBulletList().run()} className={`btn ${editor.isActive('bulletList') ? 'bg-gray-500 text-white' : ''}`}>
          <MdFormatListBulleted size={22.5}></MdFormatListBulleted>
        </button>
        <button onClick={() => editor.chain().focus().toggleOrderedList().run()} className={`btn ${editor.isActive('orderedList') ? 'bg-gray-500 text-white' : ''}`}>
          <HiMiniNumberedList size={22.5}></HiMiniNumberedList>
        </button>
        <button
          onClick={() => {
            const url = prompt("Enter URL:");
            if (url) editor.chain().focus().setLink({ href: url }).run();
          }}
          className="btn"
        >
          <FaLink size={22.5}></FaLink>
        </button>
        <button onClick={() => editor.chain().focus().unsetLink().run()} className="btn">
          <FaUnlink size={22.5}></FaUnlink>
        </button>
        <button onClick={() => editor.commands.clearContent()} className="btn">
          <BsEraserFill size={22.5}></BsEraserFill>
        </button>
      </div>

      <div>
        <EditorContent editor={editor} />
      </div>
      <div className="flex justify-between items-center mt-4 bg-gray-100 p-1.5 rounded-lg">

      {/*<button className='btn flex gap-2' onClick={sendData}>Translate <BsTranslate size={22.5}/>
      </button>*/}
        <select value={lang} onChange={(e) => setLang(e.target.value)} className='btn rounded-lg'>
        <option value="en">English</option>
        <option value="fr">French</option>
        <option value="hi">Hindi</option>
      </select>
      <button className="btn rounded-lg" onClick={getFaq}>
          Get Faqs in {lang.toUpperCase()}
      </button>
        <button className='btn rounded-lg' onClick={sendData}>
          {isAnswer ? "Submit Answer" : "Submit Question"}
        </button>
      </div>
    </div>
  );
}
