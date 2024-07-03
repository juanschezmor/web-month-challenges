import { useGlobalContext } from '../context/Context';

const ProgressBar = () => {
  const { points, maxPoints } = useGlobalContext();
  const completed = Math.round((points / maxPoints) * 100);

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
    width: `${completed}%`,
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
        <div style={fillerStyles}>
          <span style={labelStyles}>{`${completed}%`}</span>
        </div>
      </div>
      <span className="text-warning">
        {points}/{maxPoints}
      </span>
    </>
  );
};

export default ProgressBar;
