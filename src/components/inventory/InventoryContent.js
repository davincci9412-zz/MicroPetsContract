/**
  * Author : Vadim
  * Create Date : 8/16/2021
  * Email : snowfirst312@outlook.com
  * Skype : live:.cid.d66694e683af316e
  * Description : Spark project
  */
 
 import React from 'react';
 import axios from 'axios';
 
 const datasByRow = [];
 const colors = ["yellow", "pink", "lawngreen", "red", "blue"];
 
 class InventoryContent extends React.Component {
   
  constructor(props) {
    super(props);
    this.state = { colors: colors, datas: datasByRow}
  }
 
  componentDidMount() {
    //Get the list of the products from DB
    axios.get(process.env.REACT_APP_SERVER_URL+'/shop/products').then( async res => {
      const products = await res.data   
      if (products.length > 0){
        this.setState({datas: products});
      }    
    })
    .catch(error => {
      console.log(error)
    })
  } 
    
  render(){
    const current_products = this.state.datas;
     return <div className="shop">
         <section className="banner">
             <h2>Inventory</h2>
         </section>
         <section className="shop-main">            
            <div className="row">
            {
              current_products.map((product, i) => {
                return <div className="col-md-3" key={i} uuid={i} >
                          <a className="blue shop-item" href={"/approve/"+product._id} rel="noreferrer">
                            <img src={product.product_image} className="dog" alt=""></img>
                            <div className="item-content">
                              <h5 className="name">{product.product_name}</h5>
                              <h4 className="price"><img src="/img/logo.png" alt=""></img> {product.product_price}</h4>
                            </div>
                          </a>                
                        </div>
              })
            } 
            </div>
        </section>         
     </div> 
   }
 }	
 export default InventoryContent;
