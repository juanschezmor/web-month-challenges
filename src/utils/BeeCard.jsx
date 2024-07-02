import demosBee from '../../public/demos-bee.png';
import callingChallengesBee from '../../public/calling-challenges-bee.png';
import countryBee from '../../public/country-bee.png';

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
