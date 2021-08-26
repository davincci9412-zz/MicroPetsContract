import Provider from './Provider';
import FestToken from '../abi/contracts/FestToken.json';

const provider = new Provider();

class Token {
  constructor() {
    const web3 = provider.web3;
    //const deploymentKey = Object.keys(FestToken.networks)[0];

    this.instance = new web3.eth.Contract(
      FestToken.abi,
      //FestToken.networks[deploymentKey].address,
      "0x7e50ff12a151253ff6af34579ceaa6b853d7f2b5",
    );
  }

  getInstance = () => this.instance;
}

const token = new Token();
Object.freeze(token);

export default token.getInstance();