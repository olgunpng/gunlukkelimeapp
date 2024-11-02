import React, { useState, useEffect } from 'react';
import './App.css';
import wordsData from './data/kelimeler.json';

function App() {
  const [currentWord, setCurrentWord] = useState(null);
  const [meaningVisible, setMeaningVisible] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [remainingWords, setRemainingWords] = useState([...wordsData]);

  useEffect(() => {
    const today = new Date();
    const dayIndex = today.getDate() % wordsData.length;
    setCurrentWord(wordsData[dayIndex]);
  }, []);

  const getRandomWord = () => {
    if (remainingWords.length === 0) {
      setRemainingWords([...wordsData]);
      alert("bütn kelimelerimizi tükettiniz, tebrikler. Yenilerinin gelmesini bekleyebilir veya bu süre dahilinde yeni kelimeler için aile büyüklerinize danışabilirsiniz");
    }
    const randomIndex = Math.floor(Math.random() * remainingWords.length);
    const selectedWord = remainingWords.splice(randomIndex, 1)[0];
    setRemainingWords(remainingWords);
    setCurrentWord(selectedWord);
    setMeaningVisible(false);
    setAntonymsVisible(false);
    setSynonymsVisible(false);
  };

  const toggleMeaning = () => {
    setMeaningVisible(prev => !prev); // koyu mod kapa
  };

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev); // koyu mod kapat
  };

  /* zıt anlam kodları */

  const [antonymsVisible, setAntonymsVisible] = useState(false);

  const handleAntonymsToggle = () => {
    setAntonymsVisible(prev => !prev);
  };

  /* eş anlamlı kodları */

  const [synonymsVisible, setSynonymsVisible] = useState(false);

  const handleSynonymsToggle = () => {
    setSynonymsVisible(prev => !prev);
  };

  return (
    <div className={`App ${darkMode ? 'dark-mode' : ''}`}>
      <div className="container">
        {currentWord && (
          <>
            <br></br>
            <div className='kelime'>{currentWord.kelime}</div>
            <div className='koken'>{currentWord.koken}</div>
            <button className="button" onClick={getRandomWord}>Başka Kelime Görelim</button>
            <hr></hr>
            <h2 className='ornekBaslik'>Örnek cümleler</h2>
            <div className="ornek">
              <p>1. {currentWord.ornek[0] ? currentWord.ornek[0].charAt(0).toUpperCase() + currentWord.ornek[0].slice(1) : ''}</p>
              <p>2. {currentWord.ornek[1] ? currentWord.ornek[1].charAt(0).toUpperCase() + currentWord.ornek[1].slice(1) : ''}</p>
            </div>
              <div>
                <button className="show-esanlam-button" onClick={handleSynonymsToggle}>
                  {synonymsVisible ? 'Eş Anlamlıları Gizle' : 'Eş Anlamlısına Bak'}
                </button>
                {synonymsVisible && currentWord.esanlam && (
                  <p className="esanlam">{currentWord.esanlam.join(", ")}</p>
                )}
              </div>
              <div>
                <button className="show-zitanlam-button" onClick={handleAntonymsToggle}>
                  {antonymsVisible ? 'Zıt Anlamlısını Gizle' : 'Zıt Anlamlısına Bak'}
                </button>
                {antonymsVisible && currentWord.zitanlam && (
                  <p className="zitanlam">{currentWord.zitanlam.join(", ")}</p>
                )}
              </div>
            <hr></hr>
            <button className="anlam-butonu" onClick={toggleMeaning}>
              {meaningVisible ? "Kelime Anlamı Gizle" : "Kelime Anlamı Göster"}
            </button>
            <br></br>
            {meaningVisible && <div className="anlam">{currentWord.anlam}</div>}
          </>
        )}
      
        <div className="dark-mode-toggle" onClick={toggleDarkMode}>
          <div className={`toggle-circle ${darkMode ? 'active' : ''}`}></div>
        </div>
      </div>
    </div>
  );
}

export default App;

