// services/challengesService.js
import { useEffect, useState } from 'react';
import { onSnapshot, collection } from 'firebase/firestore';
import db from '../Firebase/FirebaseConfig';

export const useChallenges = () => {
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'challenges'), {
      next: (snapshot) => {
        setLoading(false);
        setChallenges(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      },
      error: (error) => {
        console.error('Error fetching challenges:', error);
        setLoading(false); // Asegurar que se desactive el estado de carga en caso de error
      },
    });

    return () => unsubscribe();
  }, []);

  return { challenges, loading };
};
