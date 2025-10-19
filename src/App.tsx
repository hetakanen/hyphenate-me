import { useState, useEffect } from 'react'
import './App.css'
import { hyphenate as hyphenateEn } from 'hyphen/en'
import { hyphenate as hyphenateFi } from 'hyphen/fi'
import { hyphenate as hyphenateSv } from 'hyphen/sv'
import { hyphenate as hyphenateDe } from 'hyphen/de'

const LANGUAGES = {
  'en-us': hyphenateEn,
  'fi': hyphenateFi,
  'sv': hyphenateSv,
  'de': hyphenateDe
} as const

type Language = keyof typeof LANGUAGES

function App() {
  const [inputText, setInputText] = useState('')
  const [result, setResult] = useState('')
  const [selectedLanguage, setSelectedLanguage] = useState<Language>('en-us')

  useEffect(() => {
    const processText = async () => {
      if (inputText) {
        try {
          const hyphenateFn = LANGUAGES[selectedLanguage];
          const result = await hyphenateFn(inputText, { hyphenChar: '- ­' });
          setResult(result);
        } catch (error) {
          console.error('Hyphenation error:', error);
          setResult(inputText);
        }
      } else {
        setResult('');
      }
    }

    processText();
  }, [inputText, selectedLanguage])

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ marginBottom: '30px' }}>
        <div style={{ marginBottom: '5px' }}>
          <strong>Input: </strong>
          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value as Language)}
            style={{ padding: '5px' }}
          >
            {Object.keys(LANGUAGES).map((lang) => (
              <option key={lang} value={lang}>
                {lang}
              </option>
            ))}
          </select>
        </div>
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          style={{
            width: '100%',
            minHeight: '100px',
            resize: 'vertical',
            fontSize: '1rem',
            boxSizing: 'border-box',
            textAlign: 'center',
            display: 'block',
          }} />
      </div>
      <div>
        <strong style={{ marginBottom: '5px' }}>Hyphenated text:</strong>
        <div style={{ padding: '10px', border: '1px solid #ccc', wordWrap: 'break-word', overflowWrap: 'break-word' }}>
          {result || 'Type something to see hyphenation...'}
        </div>
      </div>
    </div>
  )
}

export default App
