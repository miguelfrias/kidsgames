import { useState } from 'react';
import { getRandomColor } from '../utils';

const RandomColor = () => {
  const [color, setColor] = useState(getRandomColor());

  const handleChangeColor = () => {
    setColor(getRandomColor());
  };

  const colorStyle = {
    backgroundColor: color,
    width: '200px',
    height: '200px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '24px',
    fontWeight: 'bold',
    margin: '1rem auto',
  };

  return (
    <div className='m-4 grid place-content-center justify-center align-cneter'>
        <h1>Random Color</h1>
        <div className='inline-block center' style={colorStyle}> </div>
        <button onClick={handleChangeColor}>Change Color</button>
    </div>
  );
};

export default RandomColor;
