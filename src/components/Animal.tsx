import { useEffect, useState } from 'react';
import axios from 'axios';
import Loading from './Loading';

interface AnimalProps {
  animalName: string;
}

const DisplayAnimal = ({ animalName }: AnimalProps) => {
  const [img, setImg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (!animalName) {
      return;
    }

    setIsLoading(true);

    axios.get(
        `${import.meta.env.VITE_API_URL}/kids/animal/${animalName}`,
        { headers: { "x-kids-x": 1 } }
      ).then((data) => {
        console.log(data?.data?.response?.urls?.small);
        setIsLoading(false);
        setImg(data?.data?.response?.urls?.small);
      })
  }, [ animalName ]);

  return (
    <div className='mr-auto ml-auto mt-2 my-2 w-1/2 flex justify-center flex-col'>
      { (animalName && isLoading) ? <Loading></Loading> : '' }
      { (img && !isLoading ) ? <img src={img} alt={animalName} title={animalName}/> : '' }
      <p>{ animalName }</p>
    </div>
  );
};

export default DisplayAnimal;