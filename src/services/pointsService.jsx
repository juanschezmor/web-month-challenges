// services/pointsService.js
import { useEffect, useState } from 'react';
import { onSnapshot, collection } from 'firebase/firestore';
import db from '../Firebase/FirebaseConfig';

export const usePoints = () => {
  const [points, setPoints] = useState([]); // Cambiado de setMaxPoints a setPoints

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'points'), {
      next: (snapshot) => {
        const pointsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        // Aquí puedes procesar los puntos como necesites, por ejemplo:
        // Si buscas el documento específico con id "points", puedes filtrarlo así:
        const pointsDocument = pointsData.find((doc) => doc.id === 'points');
        if (pointsDocument) {
          const numPoints = pointsDocument.num_points;
          console.log('Número de puntos:', numPoints);
          setPoints(numPoints); // Actualiza el estado con el número de puntos
        }
      },
      error: (error) => {
        console.error('Error fetching points:', error);
      },
    });

    return () => unsubscribe();
  }, []); // Vacío para que se ejecute solo una vez al montar el componente

  return points;
};
