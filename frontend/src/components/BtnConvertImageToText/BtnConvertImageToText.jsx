import React from 'react';
import './BtnConvertImageToText.css'
import Button from 'react-bootstrap/Button';
import { FaArrowRight } from "react-icons/fa";
import { postApiData } from '../../apis/callApi';

export function BtnConvertImageToText({ file, setConvertedText, setIsLoading, setShowToast, setErrorMessage })
{
  const handleClick = async () => {
    try
    {
      setIsLoading(true);
      const response = await postApiData("ImageToText/Convert", file);
      setConvertedText(response);
    }
    catch(ex)
    {
      setShowToast(true);
      setErrorMessage(ex.message);
      console.error(ex.message);
    }
    
    setIsLoading(false);
  };

  return (
    <div className="areaBtnConvert">
      <Button id='btnTransfer' className='d-flex align-items-center h-100' variant="primary" onClick={handleClick}><FaArrowRight /></Button>
    </div>
  );
}
