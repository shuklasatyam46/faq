import React, { use } from 'react'
import Editor from '/components/editor.jsx'
import { useState,useMemo } from 'react';

function Editor1() {

  const [isAnswer, setIsAnswer] = useState(false);
  const [faq, setFaq] = useState({ que: "", ans: "" });
  const [postData, setPostData] = useState(null);
  const [getData, setGetData] = useState(null);
  const [method, setMethod] = useState('Get');
  const [isChanging, setIsChanging] = useState(false);
  const [loading, setLoading] = useState(false);
  const api_url=import.meta.env.VITE_API_DEV;

  const handleSubmit =async (data) => {
    if (isAnswer) {
      const updated = { ...faq, ans: data.text };
      setFaq(updated);
      if (updated.que && updated.ans) {
        setLoading(true);
        try {
          console.log("question:", updated.que, "answer:", updated.ans, "lang:", data.lang);
          const resonse=await fetch(`${api_url}/api/faqs/?lang=${data.lang}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ question: updated.que, answer: updated.ans, languageCode: data.lang })
          
        })
        const json = await resonse.json();
        setPostData(json);
        console.log("Response from server:", json);
        console.log("FAQ updated successfully:", postData);
        setMethod('Post');
        } catch (error) {
          console.error("Error updating FAQ:", error);
        } finally{
          setLoading(false);
        }
        setIsChanging(false);
      }
    } else {
      setFaq({que: data.text });
      setIsChanging(true);
    }
    setIsAnswer(!isAnswer);
  };
  const formattedHTMLPost = useMemo(() => {
    if (!postData?.translations?.length) return '';

    return postData.translations.map(item => `
      <h3>${item.languageCode.toUpperCase()}</h3>
      <p><strong>Q:</strong> ${item.question}</p>
      <p><strong>A:</strong> ${item.answer}</p>
    `).join('<hr/>')
  }, [postData]);

  const formattedHTMLGet = useMemo(() => {
    if (!getData?.length) return '';

    return getData.map(item => `
      <h3>${item.languageCode.toUpperCase()}</h3>
      <p><strong>Q:</strong> ${item.question}</p>
      <p><strong>A:</strong> ${item.answer}</p>
    `).join('<hr/>');
  }, [getData]);


  const handleGet = async (data) => {
    try {
      setLoading(true);
      const response = await fetch(`${api_url}/api/faqs/?lang=${data}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const json = await response.json();
      setGetData(json);
      console.log("FAQs fetched successfully:", json);
      setMethod('Get');
    } 
    catch (error) {
      console.error("Error fetching FAQs:", error);
    }finally{
      setLoading(false);
    }} 


  return (
    <div className='flex flex-col flex-wrap gap-2 items-center justify-center max-w-[720px] w-full'>
        <Editor onSendData={handleSubmit} onGetFaq={handleGet} key={isAnswer ? 'answer' : 'question'} isAnswer={isAnswer} PostData={formattedHTMLPost} GetData={formattedHTMLGet} Method={method} isChanging={isChanging} loading={loading}/>
    </div>
  )
}

export default Editor1;
