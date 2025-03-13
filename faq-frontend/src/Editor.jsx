import React, { useEffect, useState } from "react";
import {useQuill } from "react-quilljs"; 
import "quill/dist/quill.snow.css";

const Editor = () => {
  const { quill, quillRef } = useQuill(); 
  const [que, setQue] = useState("");
  const [ans,setAns]=useState("");
  const [isAnswer, setIsAnswer] = useState(false);
  const [lang, setLang] = useState("en");



  const updatePlaceholder = () => {
    if(!quill) return;
    quill.root.dataset.placeholder = isAnswer ? "Type the answer..." : "Type the question...";
  };

  updatePlaceholder();

  useEffect(() => {
    if((!quill)) return;
    const handleKeyDown = (e) => {
      if(e.key==="Enter"){
        e.preventDefault();

        if(isAnswer){
          setAns(()=>{
            console.log(quill.getText().trimEnd());
            return quill.getText().trimEnd()});

        }else{
          setQue(()=>{
            console.log(quill.getText().trimEnd());
            return quill.getText().trimEnd()});
          
        }

        setIsAnswer(!isAnswer);
        quill.setContents([]);
        quill.root.dataset.placeholder =isAnswer ? "Type the question..." : "Type the answer...";
      }
      
  }
  quill.root.addEventListener("keydown", handleKeyDown);
      return () => {
        quill.root.removeEventListener("keydown", handleKeyDown);
      };
}, [quill,isAnswer]);


  const getTranlations = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`api/faqs/?lang=${lang}`, {
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'GET'
      });
      const data = await response.json();
      //setFaqs(data);
      if(quill){
        const delta=data.flatMap(d=>(
            [
              { insert: `Question:${d.question}\nAnswer:${d.answer}\n`, attributes: { bold: true, list: "ordered" } },
              { insert: '\n'},
        ]));
        quill.setContents(delta);
      }
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }

  const postFAQ = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('api/faqs/', {
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({question: que, answer: ans, languageCode: lang})
      });
      const data = await response.json();
      //setFaqs(data);
      quill.setContents([
            { insert: `Question:${data.faq.question}\nAnswer:${data.faq.answer}\n`, attributes: { bold: true, list: "ordered" } },
            { insert: '\n'}
]);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }  

  return (
    <div>
      <h2>React-QuillJS Editor</h2>
      <div ref={quillRef} style={{ height: "200px", border: "1px solid #ccc" }}/>
      {/*<p><strong>Content:</strong></p>
      <div dangerouslySetInnerHTML={{__html:value}} />*/}
      <button onClick={getTranlations}>get req</button>
      <select value={lang} onChange={(e) => setLang(e.target.value)}>
        <option value="en">English</option>
        <option value="fr">French</option>
        <option value="hi">Hindi</option>
      </select>
      <button onClick={postFAQ}>Post</button>
    </div>
  );
};

export default Editor;
