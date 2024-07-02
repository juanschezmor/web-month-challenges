import { useGlobalContext } from '../context/Context';
import CardGallery from '../components/CardGallery';

const HomePage = () => {
  const { isAnimating } = useGlobalContext();
  return (
    <div className="h-100 w-100 container ">
      <h1 className="mb-4">Challenges</h1>
      <CardGallery />
    </div>
  );
};

export default HomePage;
