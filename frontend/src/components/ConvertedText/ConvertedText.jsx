import React, { useState, useEffect } from 'react';
import './ConvertedText.css';
import { LoadingSpinner } from '../LoadingSpinner/LoadingSpinner';

export function ConvertedText({ convertedText, isLoading, textRef }) 
{
  const [formattedText, setFormattedText] = useState("");

  useEffect(() =>
  {
    if (convertedText)
    {
      setFormattedText(convertedText.replace(/\n/g, '<br />').replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;'));
    }
  }, [convertedText]);

  return (
    <div className="contentText">
      {isLoading && <LoadingSpinner size={4} />}
      {!isLoading && (
        <div
          ref={textRef}
          className='h-100'
          role="textbox"
          contentEditable={!isLoading && convertedText != null}
          suppressContentEditableWarning={true}
          dangerouslySetInnerHTML={{ __html: formattedText }}
        />
      )}
    </div>
  );
}
