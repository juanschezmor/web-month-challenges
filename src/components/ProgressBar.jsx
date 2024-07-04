import { useGlobalContext } from '../context/Context';
import beeBar from '../../public/bee-bar.png';
const ProgressBar = () => {
  const { points, maxPoints } = useGlobalContext();

  const containerStyles = {
    height: 20,
    width: '50%',
    backgroundColor: 'black',
    borderRadius: 50,
    margin: 20,
    display: 'flex',
  };

  const fillerStyles = {
    height: '100%',
    width: `${(points / maxPoints) * 100}%`,
    backgroundColor: 'yellow',
    borderRadius: 'inherit',
    textAlign: 'right',
  };

  const labelStyles = {
    padding: 5,
    color: 'black',
    fontWeight: 'bold',
  };

  return (
    <>
      <div style={containerStyles}>
        <div className="d-flex justify-content-end align-items-center" style={fillerStyles}>
          <span style={labelStyles}>{`${points}`}</span>
          <img className="bee-icon" src={beeBar} alt="abejita" />
        </div>
      </div>
      <span className="text-warning">
        {points}/{maxPoints}
      </span>
    </>
  );
};

export default ProgressBar;
