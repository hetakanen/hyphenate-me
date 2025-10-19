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
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap' }}>
        <span>Input</span>
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          style={{ padding: '5px', flex: '1', minHeight: '100px', resize: 'vertical', fontSize: '1rem' }}
        />
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
      <div style={{ marginTop: '10px' }}>
        <strong>Hyphenated text:</strong>
        <div style={{ padding: '10px', border: '1px solid #ccc', marginTop: '5px', wordWrap: 'break-word', overflowWrap: 'break-word' }}>
          {result || 'Type something to see hyphenation...'}
        </div>
      </div>
    </div>
  )
}

export default App
