import { useState, useEffect } from 'react'
import './App.css'
import { hyphenate } from 'hyphen/en'

function App() {
  const [inputText, setInputText] = useState('')
  const [result, setResult] = useState('')

  useEffect(() => {
    const processText = async () => {
      if (inputText) {
        try {
          const result = await hyphenate(inputText, { hyphenChar: '- ­' }); 
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
  }, [inputText])

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '20px' }}>
        <span>input</span>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          style={{ padding: '5px' }}
        />
      </div>
      <div style={{ marginTop: '10px' }}>
        <strong>Hyphenated text:</strong>
        <div style={{ padding: '10px', border: '1px solid #ccc', marginTop: '5px' }}>
          {result || 'Type something to see hyphenation...'}
        </div>
      </div>
    </div>
  )
}

export default App
