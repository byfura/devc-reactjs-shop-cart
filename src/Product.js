import React from 'react';


function Product(props) {
	const data = props.product;
	return(
		<div className="column">
      <div className="card">
        <div className="card-image">
          <figure className="image is-4by3">
            <img
              alt={data.name}
              src={data.imageSrc}
            />
          </figure>
        </div>
        <div className="card-content">
          <div className="media">
            <div className="media-content">
              <p className="title is-4">{data.name}</p>
              <div className="content">
                {data.desc}<br />
              </div>
              <h5>{data.price}</h5>
              <button 
              	className="button is-primary" 
              	onClick={event => {
              		event.preventDefault();
              		props.onAddItemToCart(data);
								}}
              	>
                Add To Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
	);
}

export default Product