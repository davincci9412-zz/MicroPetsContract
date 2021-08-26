/**
 * Author : Vadim
 * Create Date : 8/16/2021
 * Email : snowfirst312@outlook.com
 * Skype : live:.cid.d66694e683af316e
 * Description : Spark project
 */

import React from 'react';

const datasByRow = [];

class HomeContent extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = { datas: datasByRow};
    this.onDelete = this.onDelete.bind(this);
  }

  onDelete(id) {
    const data_list = this.state.datas;
    data_list.splice(id, 1);
    this.setState({datas: data_list});
  }  
   
  render(){
	  return <div className="home">
        <section className="banner">
            <h2>NFT GAMES PLATFORM & DECENTRALIZED YIELD FARM APPLICATIONS</h2>
            <p className="banner-text my-4">
                MicroSHIBA game is a play to earn NFT RPG developed on the Binance Smart Chain
            </p>
            <div className="banner-btns">
                <a href="/home" className="btn btn-yellow">Buy Shiba</a>
                <a href="/home" className="btn btn-red"> Launch App </a>
            </div>
        </section>
        <section className="feature container-fluid text-center">            
            <h2 className="my-3">FEATURES</h2>
            <div className="row">
              <div className="col-md-3 mb-4">
                <div className="feature-item">
                  <img src="/img/NFTFarming.png" alt=""></img>
                  <h5 className="mb-3">NFT Farming</h5>
                  <p className="feature-text">
                    Stake your dog NFT at the farm on Mars. It will generate MicroSHIBA tokens for your every block.
                  </p>
                </div>                
              </div>
              <div className="col-md-3 mb-4">
                <div className="feature-item">
                  <img src="/img/PlayToEarn.png" alt=""></img>
                  <h5 className="mb-3">PLAY TO EARN</h5>
                  <p className="feature-text">
                    Defeat the invaders to win valuable items, you can sell these items for MicroSHIBA tokens or keep them to increase strength in the next battles.
                  </p>
                </div>                
              </div>
              <div className="col-md-3 mb-4">
                <div className="feature-item">
                  <img src="/img/Marketplace.png" alt=""></img>
                  <h5 className="mb-3">MARKETPLACE</h5>
                  <p className="feature-text">
                    You can buy or sell the dogs or rare gear to everyone on a completely decentralized NFT open market.
                  </p>
                </div>                
              </div>
              <div className="col-md-3 mb-4">
                <div className="feature-item">
                  <img src="/img/Deflation.png" alt=""></img>
                  <h5 className="mb-3">DEFLATION</h5>
                  <p className="feature-text">
                    Each sell transaction will be charged at a 5% fee. The charge would be automatically added to the locked staking contract for disbursing interest to participants in this operation.
                  </p>
                </div>                
              </div>
            </div>
        </section>
        <section className="friend">
            <h1>FRIENDS OF MICROPETS</h1>
            <div className="friend-main">
                <a href="/home" ><img src="/img/friend/coingecko.webp" alt=""></img></a>
                <a href="/home" ><img src="/img/friend/binance.webp" alt=""></img></a>
                <a href="/home" ><img src="/img/friend/pancake.png" alt=""></img></a>
                <a href="/home" ><img src="/img/friend/coinmarket.webp" alt=""></img></a>
                <a href="/home" ><img src="/img/friend/policedoge.png" alt=""></img></a>
            </div>
        </section>
    </div> 
  }
}	
export default HomeContent;
