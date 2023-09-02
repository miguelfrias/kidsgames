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
    <div className='m-4 grid place-content-center justify-center align-cneter'>
        <h1>What color is it?</h1>
        <div className='inline-block center' style={colorStyle}> </div>
        <button onClick={handleChangeColor}>Change Color</button>
    </div>
  );
};

export default RandomColor;
