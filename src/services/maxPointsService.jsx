// services/pointsService.js
import { useEffect, useState } from 'react';
import { onSnapshot, collection } from 'firebase/firestore';
import db from '../Firebase/FirebaseConfig';

export const useMaxPoints = () => {
  const [maxPoints, setMaxPoints] = useState(); // Cambiado de setMaxPoints a setPoints

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'points'), {
      next: (snapshot) => {
        const pointsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const pointsDocument = pointsData.find((doc) => doc.id === 'points');
        if (pointsDocument) {
          const initialMaxPoints = pointsDocument.max_points;
          console.log('Número de puntos:', initialMaxPoints);
          setMaxPoints(initialMaxPoints);
        }
      },
      error: (error) => {
        console.error('Error fetching points:', error);
      },
    });

    return () => unsubscribe();
  }, []); // Vacío para que se ejecute solo una vez al montar el componente

  return maxPoints;
};
