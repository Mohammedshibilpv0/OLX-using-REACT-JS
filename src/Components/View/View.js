import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { FirebaseContext } from '../../store/Context';
import './View.css';

function View() {
  const { id } = useParams();
  const { firestore } = useContext(FirebaseContext);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const docRef = doc(firestore, 'products', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const productData = docSnap.data();
          if (productData.createdAt && productData.createdAt.seconds) {
            setProduct({ id: docSnap.id, ...productData });
          } else {
            console.log('Missing createdAt timestamp in Firestore document.');
            // Handle missing createdAt field
          }
        } else {
          console.log('No such document found in Firestore.');
          // Handle document not found
        }
      } catch (error) {
        console.error('Error fetching product:', error);
        // Handle other errors
      }
    };

    fetchProduct();
  }, [firestore, id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img src={product.imageURL} alt={product.name} />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {product.price}</p>
          <span>{product.name}</span>
          <p>{product.category}</p>
          {product.createdAt && product.createdAt.seconds && (
            <span>Posted on: {new Date(product.createdAt.seconds * 1000).toLocaleDateString()}</span>
          )}
        </div>
        <div className="contactDetails">
          <p>Seller details</p>
          <p>{product.sellerName}</p>
          <p>{product.contactNumber}</p>
        </div>
      </div>
    </div>
  );
}

export default View;
