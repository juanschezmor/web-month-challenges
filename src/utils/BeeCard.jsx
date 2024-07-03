import demosBee from '../assets/bee-cards/happy/demos-bee.jpg';
import callingChallengesBee from '../assets/bee-cards/happy/calling-bee.jpg';
import countryBee from '../assets/bee-cards/happy/country-bee.jpg';
import freePointsBee from '../assets/bee-cards/happy/free-point-bee.png';
import demosBeeSad from '../assets/bee-cards/sad/demos-bee-sad.jpg';
import callingChallengesBeeSad from '../assets/bee-cards/sad/calling-bee-sad.jpg';
import countryBeeSad from '../assets/bee-cards/sad/country-bee-sad.jpg';

const beeIcon = (type, completed) => {
  if (completed === 0) {
    switch (type) {
      case 'demos':
        return demosBeeSad;
      case 'calling-activity':
        return callingChallengesBeeSad;
      case 'country-challenge':
        return countryBeeSad;
      case 'free-points':
        return freePointsBee;
      default:
        return freePointsBee;
    }
  } else {
    switch (type) {
      case 'demos':
        return demosBee;
      case 'calling-activity':
        return callingChallengesBee;
      case 'country-challenge':
        return countryBee;
      case 'free-points':
        return freePointsBee;
      default:
        return freePointsBee;
    }
  }
};

export default beeIcon;
