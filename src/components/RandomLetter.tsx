import { useCallback, useEffect, useState } from 'react';
import { Switch } from '@headlessui/react'
import { getRandomColor } from '../utils';
import ANIMALS_EN from '../assets/animals-EN';
import ANIMALS_ES from '../assets/animals-ES';
import StringArrays from '../types/StringArrays.type';
import DisplayAnimal from './Animal';

const RandomLetter = () => {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const vocals = 'AEIOU';
    const [mode, setMode] = useState(false);
    const [shouldSpeak, setShouldSpeak] = useState(false);
    const [showAnimal, setShowAnimal] = useState(false);
    const [isSpanish, setSpanish] = useState(false);
    const [letter, setLetter] = useState(getRandomLetter());
    const [animal, setAnimal] = useState('');

    function getRandomLetter() {
      const letters = mode ? alphabet : vocals;
      const randomIndex = Math.floor(Math.random() * letters.length);
      return letters[randomIndex];
    }

    const handleChangeLetter = () => {
      let newLetter = getRandomLetter();
      while (newLetter == letter) {
        newLetter = getRandomLetter();
      }

      setLetter(newLetter);
    };

    const getAnimal = useCallback((startLetter: string): string => {
      if (isSpanish) {
        return getRandomAnimalLocalized(ANIMALS_ES, startLetter);
      }

      return getRandomAnimalLocalized(ANIMALS_EN, startLetter);
    }, [ isSpanish ]);

    const getRandomAnimalLocalized = (data: StringArrays, startLetter: string): string => {
      const randomIndex = Math.floor(Math.random() * data[startLetter].length);
      return data[startLetter]?.[randomIndex];
    };

    const speak = useCallback((text = '') => {
      const utterThis = new SpeechSynthesisUtterance(text);
      utterThis.lang = isSpanish ? 'es-MX' : 'en-US';
      window.speechSynthesis.speak(utterThis);
    }, [ isSpanish ]);

    const colorStyle = {
      color: getRandomColor(),
      fontSize: '30rem',
      lineHeight: 0.9,
    };

    useEffect(() => {
      if (showAnimal) {
        setAnimal(getAnimal(letter));
      } else {
        setAnimal('');
      }

    }, [ getAnimal, letter, showAnimal ]);

    useEffect(() => {
      if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
      }

      if (shouldSpeak) {
        speak(letter);
      }

    }, [letter, shouldSpeak, speak]);

    return (
      <div className='p-2 text-center select-none w-full overflow-hidden relative' style={{'height': '90vh'}}>
        <h1 className='font-bold' style={colorStyle}>{letter}</h1>
        { showAnimal ? (<DisplayAnimal animalName={animal}></DisplayAnimal>) : '' }

        <div className=''>
          <button className='bg-blue-500 py-3 px-4 w-full rounded text-white inline-block' onClick={handleChangeLetter}>Change Letter</button>
          <Switch.Group>
            <div className="flex items-center justify-center mt-3">
              <Switch
                checked={mode}
                onChange={setMode}
                className={`${
                  mode ? 'bg-blue-600' : 'bg-gray-200'
                } relative inline-flex h-6 w-11 items-center rounded-full`}
              >
                <span className="sr-only">Full Alphabet</span>
                <span
                  className={`${
                    mode ? 'translate-x-6' : 'translate-x-1'
                  } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                />
              </Switch>
              <Switch.Label className="ml-4">Full Alphabet</Switch.Label>
            </div>
          </Switch.Group>
          <Switch.Group>
            <div className="flex items-center justify-center mt-3">
              <Switch
                checked={shouldSpeak}
                onChange={setShouldSpeak}
                className={`${
                  shouldSpeak ? 'bg-blue-600' : 'bg-gray-200'
                } relative inline-flex h-6 w-11 items-center rounded-full`}
              >
                <span className="sr-only">Speak</span>
                <span
                  className={`${
                    shouldSpeak ? 'translate-x-6' : 'translate-x-1'
                  } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                />
              </Switch>
              <Switch.Label className="ml-4">Speak</Switch.Label>
            </div>
          </Switch.Group>
          <Switch.Group>
            <div className="flex items-center justify-center mt-3">
              <Switch
                checked={showAnimal}
                onChange={setShowAnimal}
                className={`${
                  showAnimal ? 'bg-blue-600' : 'bg-gray-200'
                } relative inline-flex h-6 w-11 items-center rounded-full`}
              >
                <span className="sr-only">Show Animal</span>
                <span
                  className={`${
                    showAnimal ? 'translate-x-6' : 'translate-x-1'
                  } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                />
              </Switch>
              <Switch.Label className="ml-4">Show Animal</Switch.Label>
            </div>
          </Switch.Group>
          <Switch.Group>
            <div className="flex items-center justify-center mt-3">
              <Switch
                checked={isSpanish}
                onChange={setSpanish}
                className={`${
                  isSpanish ? 'bg-blue-600' : 'bg-gray-200'
                } relative inline-flex h-6 w-11 items-center rounded-full`}
              >
                <span className="sr-only">Spanish</span>
                <span
                  className={`${
                    isSpanish ? 'translate-x-6' : 'translate-x-1'
                  } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                />
              </Switch>
              <Switch.Label className="ml-4">Spanish</Switch.Label>
            </div>
          </Switch.Group>
        </div>

      </div>
    );
  };

  export default RandomLetter;