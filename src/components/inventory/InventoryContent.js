/**
  * Author : Vadim
  * Create Date : 8/16/2021
  * Email : snowfirst312@outlook.com
  * Skype : live:.cid.d66694e683af316e
  * Description : MicroPets project
  */

import React from 'react';
import Web3 from 'web3';
import { Modal } from 'react-bootstrap';
import PuppyNFT from '../../proxies/PuppyNFT';
import jsonData from '../data.json';
import { toast } from 'react-toastify';
 
let web3;
const colors = ["yellow", "pink", "lawngreen", "red", "blue"];

class ModalWindow extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {datas:this.props.state, show: false, new_name:''};
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }
  handleClose = () => this.setState({show:false});
  handleShow = () => this.setState({show:true});
  handleSave = () => {    
    if (this.state.new_price !== undefined) {
      this.setState({show:false});
      this.props.sell.call(null, this.props.dog_id, web3.utils.toWei(this.state.new_price, 'ether'),  this.props.initiator);
    }  
  }
  handleChange(propertyName, e) {	  
    const change = {};
    change[propertyName] = e.target.value;
    this.setState(change);
  } 
  
  render (){
    return <span>
      <span variant="primary" id="test" onClick={this.handleShow} className="btn btn-purple">SELL</span>
      <Modal show={this.state.show} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Input the selling price</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="form-group">
          <label>Initial price: </label>
          <input type='text' name='old_price' className='form-control' value={this.props.price} readOnly/>
        </div>
        <div className="form-group">
          <label>Selling price: </label>
          <input type='text' name='new_price' onChange={this.handleChange.bind(this, 'new_price')} className='form-control' placeholder='Selling price' autoFocus/>
        </div>
        </Modal.Body>
        <Modal.Footer>
          <button type="button" className="btn btn-purple" onClick={this.handleSave.bind(this)}>SELL</button>
        </Modal.Footer>
      </Modal>
    </span>
  }
}

class InventoryContent extends React.Component {
   
  constructor(props) {
    super(props);
    this.onSell = this.onSell.bind(this);
    const loadData = JSON.parse(JSON.stringify(jsonData));
    this.state = { colors: colors, crates: [], data:loadData, dogs: [], marketplace: null,   price: null, loading:false}
    web3 = new Web3(window.ethereum);
  }
 
  async componentDidMount() {
    if (window.ethereum !== undefined) {
      if (window.ethereum.isConnected()) {  
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        if (Array.isArray(accounts)){
          const temps =this.state.data[0].address.split(",");
          temps.map((temp, i)=>{
            if (accounts[0].toLowerCase() === temp.toLowerCase()) {
              document.getElementById("admin").classList.remove("no-show");
            };
            return i;
          })   
          this.setState({"status":true});
        } 
      } else {
        // window.ethereum.on('connect', () => {
        //   window.location.reload();
        // });
        // window.ethereum.on('connect', window.ethereum.chainId);
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        if (Array.isArray(accounts)){
          const temps =this.state.data[0].address.split(",");
          temps.map((temp, i)=>{
            if (accounts[0].toLowerCase() === temp.toLowerCase()) {
              document.getElementById("admin").classList.remove("no-show");
            };
            return i;
          })             
          this.setState({"status":true});
        } 
      }
    } 
    if (typeof window.ethereum === 'undefined') {
      window.open("https://metamask.io/download.html"); 
      toast.error("No Metamask. Please install it.", {position: toast.POSITION.BOTTOM_RIGHT,  autoClose:10000});
    } else {
      await this.viewDogs();
    }
  } 
  
  viewDogs = async () => {
    try {
      const initiator = await web3.eth.getCoinbase();
      
      let dogs = [];
      let renderData;
      let dog_exist = false;
      dogs = dogs.concat(await PuppyNFT.methods.getPuppysOfCustomer(initiator).call({ from: initiator }));
      if (dogs.length > 0){
        const akitaPrice = await PuppyNFT.methods.getAkitaPrice().call({from: initiator});
        const kishuPrice = await PuppyNFT.methods.getKishuPrice().call({from: initiator});
        const hokkaidoPrice = await PuppyNFT.methods.getHokkaidoPrice().call({from: initiator});
        const shibaPrice = await PuppyNFT.methods.getShibaPrice().call({from: initiator});
        const microPrice = await PuppyNFT.methods.getMicroPrice().call({from: initiator});

        renderData = await Promise.all(dogs.map(async(dog, i) => {
          dog_exist = true;
          let name;
          let url;
          let price;
          let multi;
          let rarity;
          
          if (dog.charAt(0) === "1") {   name = "Akita";        url = "/img/dogs/akita.mp4";    multi = 1;    price = akitaPrice;    rarity="Common"}; 
          if (dog.charAt(0) === "2") {   name = "Kishu";        url = "/img/dogs/kishu.mp4";    multi = 1.25; price = kishuPrice;    rarity="Uncommon"};
          if (dog.charAt(0) === "3") {   name = "Hokkaido";     url = "/img/dogs/hokkaido.mp4"; multi = 1.5;  price = hokkaidoPrice; rarity="Rare"}; 
          if (dog.charAt(0) === "4") {   name = "Shiba";        url = "/img/dogs/shiba.mp4";    multi = 2;    price = shibaPrice;    rarity="Epic"}; 
          if (dog.charAt(0) === "5") {   name = "Micro Shiba";  url = "/img/dogs/micro.mp4";    multi = 3;    price = microPrice;    rarity="Legendary"}; 
          const { forSale } = await PuppyNFT.methods.getPuppyDetails(dog).call({ from: initiator });
          let saleHtml;
          if (forSale) {
            saleHtml = <div>
              <div className="mb-4">   
                <h4 className="on-sale">Is On Sale</h4>
              </div>
              <div className="my-3">                  
                <button type="submit" className="btn btn-purple" onClick={this.onCancel.bind(this, dog, price, initiator)}>CANCEL SELLING</button>
              </div>
            </div>
          } else {
            saleHtml = <div>
                        <div className="text-center">
                          <h4 className="price"><img src="/img/logo.png" alt=""></img> {web3.utils.fromWei(price, 'ether')}</h4>
                        </div>
                        <div className="mt-4">      
                          <ModalWindow index={i} dog_id={dog} price={web3.utils.fromWei(price, 'ether')} initiator={initiator} sell={this.onSell}/> 
                        </div>
                      </div>
          }

          return (
            <div className="col-md-3" key={i}>
              <div className="shop-item text-center" >
                <div className="item-content">
                  <h3 className="box-name">{name}</h3>
                  <h3 className="multi">{multi}<img src="/img/red-close.png" className="multi" alt=""></img></h3>
                </div>
                <video className="dog" autoPlay loop>
                  <source src={url} type="video/mp4"/>
                  Your browser does not support the video tag.
                </video>
                <div className="item-content my-2">
                  <h6 className="name">{rarity}</h6>
                  <h6 className="price">NFT ID: {dog}</h6>
                </div>
                {saleHtml}      
                <div className="my-3">                  
                  <button type="submit" className="btn btn-purple" onClick={this.onStake.bind(this, dog, price, initiator)}>STAKE</button>
                </div>
                <div>                  
                  <button type="submit" className="btn btn-purple" onClick={this.onFarming.bind(this, dog, price, initiator)}>FARMING</button>
                </div>
              </div>  
            </div>
          );
        })
        )
      } 
       
      if (!dog_exist)  renderData = <div className="col-md-3"><div className="shop-item text-center blue" ><h3 className="name">No Dog</h3></div></div>;     

      this.setState({ puppy: renderData});  

    } catch (err) {
      toast.error(err.message, {position: toast.POSITION.BOTTOM_RIGHT,  autoClose:5000});
    }
  }

  onSell = async (id, price, initiator) => {
    toast.info("Adding on marketplace...", {position: toast.POSITION.BOTTOM_RIGHT,  autoClose:false});
    try {
      this.setState({loading : true})
      const marketplace = this.state.data[2].address;
      await web3.eth.sendTransaction({
        from: initiator,
        to:this.state.data[4].address,
        gas: 6700000,
        data: PuppyNFT.methods.setSaleDetails(id, price, marketplace).encodeABI()
      }).on('receipt', async function(receipt){          
        toast.dismiss();  
        window.location.reload();
      })
      .on('error', function (error){ // If a out of gas error, the second parameter is the receipt
        toast.dismiss();  
        toast.error("Authentication Fail", {position: toast.POSITION.BOTTOM_RIGHT,  autoClose:5000});
      });  
    } catch (err) {
      toast.dismiss();  
      toast.error("Please try again.", {position: toast.POSITION.BOTTOM_RIGHT,  autoClose:5000});
    }
  }

  onCancel = async (id, price, initiator) => {
    try {
      toast.info("Cancelling from the marketplace...", {position: toast.POSITION.BOTTOM_RIGHT,  autoClose:false});
      this.setState({loading : true})
      const marketplace = this.state.data[2].address;
      await web3.eth.sendTransaction({
        from: initiator,
        to:this.state.data[4].address,
        gas: 6700000,
        //data: PuppyNFT.methods.setSaleDetails(id, price, marketplace).encodeABI()
        data: PuppyNFT.methods.setSaleCancel(id, price, marketplace).encodeABI()
      }).on('receipt', async function(receipt){          
        toast.dismiss();  
        window.location.reload();
      })
      .on('error', function (error){ // If a out of gas error, the second parameter is the receipt
        toast.dismiss();  
        toast.error("Authentication Fail", {position: toast.POSITION.BOTTOM_RIGHT,  autoClose:5000});
      });  
    } catch (err) {
      toast.dismiss();  
      toast.error("Please try again.", {position: toast.POSITION.BOTTOM_RIGHT,  autoClose:5000});
    }
  }


  onStake = async (type, id, initiator) => {

  }

  onFarming = async (type, id, initiator) => {

  }

  render(){
    return <div className="inventory shop">
         <section className="banner">             
          <div className="banner-label">
            <h2>Inventory</h2>
            <p className="banner-text my-4">
              All special items are only available here!
            </p>
          </div> 
         </section>
         <section className="shop-main text-center">            
          <div className="dog mt-5">
            <h2 className="inventory-title">MY DOGS</h2> 
            <div className="row" >
              {this.state.puppy}   
            </div>  
          </div>            
        </section>         
     </div> 
  }
}	
export default InventoryContent;
