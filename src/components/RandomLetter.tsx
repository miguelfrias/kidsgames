import { useState } from 'react';
import { Switch } from '@headlessui/react'
import { getRandomColor } from '../utils';

const RandomLetter = () => {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const vocals = 'AEIOU';
    const [mode, setMode] = useState(false);
    const [letter, setLetter] = useState(getRandomLetter());

    function getRandomLetter() {
      const letters = mode ? alphabet : vocals;
      const randomIndex = Math.floor(Math.random() * letters.length);
      return letters[randomIndex];
    }

    const handleChangeLetter = () => {
      setLetter(getRandomLetter());
    };

    const colorStyle = {
      color: getRandomColor(),
      fontSize: '30rem',
      lineHeight: 0.9,
    };

    return (
      <div className='p-2 text-center select-none w-full overflow-hidden relative' style={{'height': '90vh'}}>
        <h1 className='font-bold' style={colorStyle}>{letter}</h1>
        <div className='absolute w-full bottom-4 left-0'>
          <button className='bg-blue-500 py-2 px-4 w-full rounded text-white inline-block' onClick={handleChangeLetter}>Change Letter</button>
          <Switch.Group>
            <div className="flex items-center justify-center mt-3">
              <Switch
                checked={mode}
                onChange={setMode}
                className={`${
                  mode ? 'bg-blue-600' : 'bg-gray-200'
                } relative inline-flex h-6 w-11 items-center rounded-full`}
              >
                <span className="sr-only">Enable notifications</span>
                <span
                  className={`${
                    mode ? 'translate-x-6' : 'translate-x-1'
                  } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                />
              </Switch>
              <Switch.Label className="ml-4">Full Alphabet</Switch.Label>
            </div>
          </Switch.Group>
        </div>

      </div>
    );
  };

  export default RandomLetter;