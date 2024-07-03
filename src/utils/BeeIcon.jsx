import demosBee from '../assets/bee-icons/demos-bee-icon.png';
import callingChallengesBee from '../assets/bee-icons/calling-bee-icon.png';
import countryBee from '../assets/bee-icons/country-bee-icon.png';
import freePointsBee from '../assets/bee-icons/free-point-bee-icon.png';

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
