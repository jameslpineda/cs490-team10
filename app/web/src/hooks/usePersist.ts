import { useState, useEffect } from 'react';

const usePersist = () => {
  const storedPersist = localStorage.getItem('persist');
  const initialPersist =
    typeof storedPersist === 'string' ? JSON.parse(storedPersist) : true; // should default to false in prod

  const [persist, setPersist] = useState(initialPersist);

  useEffect(() => {
    localStorage.setItem('persist', JSON.stringify(persist));
  }, [persist]);

  return [persist, setPersist];
};

export default usePersist;
