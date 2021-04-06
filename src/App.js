import './App.css';
import React, {useState, useCallback} from 'react';
import {convertToInterface} from "./utils/convertToInterface";

function App() {
  const [classContent, setClassContent] = useState();
  const [convertedInterface, setConvertedInterface] = useState();
  const generateInterface = useCallback(() => {
      const convertedInterfaceContent = convertToInterface(classContent);
      setConvertedInterface(convertedInterfaceContent)
  }, [classContent])
  return (
    <div>
      <div><textarea value={classContent} onChange={(e) => { setClassContent(e.target.value) }} /></div>
      <button
          onClick={generateInterface}>
          Convert to Interface
      </button>
        <pre>
            {convertedInterface}
        </pre>
    </div>
  );
}

export default App;
