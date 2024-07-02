import demosBee from '../../public/demos-bee.png';
import callingChallengesBee from '../../public/calling-challenges-bee.png';
import countryBee from '../../public/country-bee.png';
import freePointsBee from '../../public/free-point-bee.png';

const beeIcon = (type) => {
  switch (type) {
    case 'demos':
      return demosBee;
    case 'calling-activity':
      return callingChallengesBee;
    case 'country-challenge':
      return countryBee;
    case 'free_points':
      return freePointsBee;
    default:
      return freePointsBee;
  }
};

export default beeIcon;
