import demosBee from '../../public/demos-bee-icon.png';
import callingChallengesBee from '../../public/calling-challenges-bee-icon.png';
import countryBee from '../../public/country-bee-icon.png';

const beeIcon = (type) => {
  switch (type) {
    case 'demos':
      return demosBee;
    case 'calling-activity':
      return callingChallengesBee;
    case 'country-challenge':
      return countryBee;
    default:
      return countryBee;
  }
};

export default beeIcon;
