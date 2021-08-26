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

class ApproveContent extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = { datas: datasByRow};
  }
  
  componentDidMount(temps) {
    //Get a product from DB
    axios.get(process.env.REACT_APP_SERVER_URL+'/shop/product', { params : {product_id:this.props.productId}}).then( async res => {
      const product = await res.data   
      if (product.status !== "zero" && product._id !== undefined){
        temps = [];
        temps = temps.concat([product])
        this.setState({datas: temps});
      }    
    })
    .catch(error => {
      console.log(error)
    })
  }
   
  render(){
    const current_products = this.state.datas;
    return <div>
      {
        current_products.map((product, i) => {
        return  <div className="approve" key={i}>
                <section className="crumb py-2">
                  <a className="text-success" href="/shop" rel="noreferrer">Shop</a> 
                  <span className="bread"> &gt; </span>
                  <span className="product">{product.product_name}</span>
                </section>
                <section className="approve-main" key={i} uuid={i}>   
                  <div className="item-image">
                    <img src={product.product_image} className="dog" alt=""></img>
                  </div>
                  <div className="item-content">
                    <h4 className="name">{product.product_name}</h4>
                    <h6 className="price my-4"><img src="/img/logo.png" alt=""></img> {product.product_price}</h6>
                    <a href="/approve" className="btn btn-red">Approve</a>
                  </div>                 
                </section> 
              </div> 
        })  
      }
    </div>
  }
}	
export default ApproveContent;
