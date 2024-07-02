import React from 'react';
import Card from './Card';
import { useChallenges } from '../services/challengesService';

function CardGallery() {
  const { challenges, loading } = useChallenges();

  if (loading) {
    return <p>Cargando desafíos...</p>;
  }

  if (!challenges || challenges.length === 0) {
    return <p>No hay desafíos disponibles.</p>;
  }
  return (
    <div className="w-100 h-100 container d-flex flex-wrap ">
      {challenges.map((challenge, i) => (
        <Card key={challenge.id} challenge={challenge} i={i} />
      ))}
    </div>
  );
}

export default CardGallery;
