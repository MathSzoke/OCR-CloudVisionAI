import React, { useState, useRef } from 'react';
import './Home.css';
import { BtnConvertImageToText } from './../BtnConvertImageToText/BtnConvertImageToText';
import { ConvertedText } from './../ConvertedText/ConvertedText';
import Button from 'react-bootstrap/Button';
import { DangerToast } from '../DangerToast/DangerToast';

export function Home()
{
  const [file, setFile] = useState(null);
  const [convertedText, setConvertedText] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const textRef = useRef(null);
  
  const [showToast, setShowToast] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleFileChange = (event) =>
  {
    setFile(event.target.files[0]);
  };

  const handleSaveText = () => {
    if (textRef.current && file)
    {
      const editedText = textRef.current.innerText;
      const blob = new Blob([editedText], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;

      const fileNameWithoutExtension = file.name.replace(/\.[^/.]+$/, "");
      link.download = `${fileNameWithoutExtension}.txt`;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  };

  return (
    <section className="home section" id="Home">
      <h1 className='mb-5'>Leitor de textos em imagem/pdf</h1>
      <div className="container d-flex flex-column align-items-center">
        <h5>Por favor, escolha uma Imagem/PDF</h5>
        <div className="areaBtn">
          <input
            type="file"
            accept="image/*,application/pdf"
            onChange={handleFileChange}
          />
        </div>
        {file && 
          <div id='contentConvert' className="d-flex flex-row" style={{ height: '600px' }}>
            <div style={{ height: '100%' }}>
              {file.type.startsWith('image') ? (
                <img style={{height: '100%'}} alt="preview" src={URL.createObjectURL(file)} width={500} />
              ) : (
                <iframe
                  id='iframeContent'
                  title="pdf-preview"
                  src={URL.createObjectURL(file)}
                  width={500}
                  height="100%"
                  style={{ border: 'none' }}
                />
              )}
            </div>
            <BtnConvertImageToText
              file={file}
              setConvertedText={setConvertedText}
              setIsLoading={setIsLoading}
              setShowToast={setShowToast}
              setErrorMessage={setErrorMessage}
            />
            <ConvertedText convertedText={convertedText} isLoading={isLoading} setConvertedText={setConvertedText} textRef={textRef} />
          </div>
        }
      </div>
      {
        file && convertedText != null && !isLoading &&
        (
          <div className="text-center m-3">
            <Button variant="primary" onClick={handleSaveText}>Salvar texto</Button>
          </div>
        )
      }
      
      {showToast && <DangerToast header={"Erro"} message={errorMessage} />}
    </section>
  )
}
