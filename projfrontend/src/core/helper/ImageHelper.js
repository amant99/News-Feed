import React from 'react';
import { API } from '../../backend';

const ImageHelper = ({product}) => {
    const imgurl = product? `${API}/product/photo/${product._id}`:`https://images.pexels.com/photos/905905/pexels-photo-905905.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500`
    return (
        <div className="rounded border border-success p-2">
        <img
          src={imgurl}
          alt="photo"
          style={{ maxHeight: "50%", maxWidth: "80%" }}
          className="mb-3 rounded"
        />
      </div>
    );
}

export default ImageHelper;
