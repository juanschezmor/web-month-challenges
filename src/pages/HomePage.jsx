import { useGlobalContext } from '../context/Context';
import CardGallery from '../components/CardGallery';

const HomePage = () => {
  const { isAnimating } = useGlobalContext();
  return (
    <div className="h-100 w-100 container ">
      <CardGallery />
    </div>
  );
};

export default HomePage;
