import { useState } from 'react';
import { getRandomColor } from '../utils';

const RandomColor = () => {
  const [color, setColor] = useState(getRandomColor());

  const handleChangeColor = () => {
    setColor(getRandomColor());
  };

  const colorStyle = {
    backgroundColor: color,
    width: '100%',
    height: '50vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '24px',
    fontWeight: 'bold',
    margin: '1rem auto',
  };

  return (
    <div className='p-4 place-content-center justify-center align-center select-none'>
        <h1 className='text-5xl'>What color is it?</h1>
        <div className='inline-block center' style={colorStyle}> </div>
        <button className='bg-blue-500 py-2 px-4 w-full rounded text-white inline-block' onClick={handleChangeColor}>Change Color</button>
    </div>
  );
};

export default RandomColor;
