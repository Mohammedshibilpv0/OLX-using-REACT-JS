import React, { Fragment, useState, useContext } from 'react';
import './Create.css';
import {useNavigate} from 'react-router-dom'
import Header from '../Header/Header';
import { AuthContext, FirebaseContext } from '../../store/Context';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

const Create = () => {
  const { firestore } = useContext(FirebaseContext);
  const { user } = useContext(AuthContext);
  const [proname, setProname] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate=useNavigate()
  const handleSubmit = () => {
    if (!image) {
      setError('Please upload an image.');
      return;
    }

    if (!user) {
      setError('You must be logged in to upload an image.');
      return;
    }

    console.log('User authenticated:', user);
    setLoading(true);
    setError(null);

    const storage = getStorage();
    const storageRef = ref(storage, `images/${image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // Progress function
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress}% done`);
      },
      (error) => {
        // Error handling
        console.error('Upload failed:', error);
        setError('Upload failed. Please try again.');
        setLoading(false);
      },
      () => {
        // Success handling
        getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL) => {
            console.log('File available at', downloadURL);
            saveProductData(downloadURL);
          })
          .catch((error) => {
            console.error('Failed to get download URL:', error);
            setError('Failed to get download URL. Please try again.');
            setLoading(false);
          });
      }
    );
  };

  const saveProductData = async (imageURL) => {
    try {
      await addDoc(collection(firestore, 'products'), {
        name: proname,
        category,
        price,
        imageURL,
        userId: user.uid,
        createdAt: new Date(),
      });
      setLoading(false);
      navigate('/')
    } catch (error) {
      console.error('Error adding document: ', error);
      setError('Error saving product. Please try again.');
      setLoading(false);
    }
  };

  return (
    <Fragment>
      <Header />
      <div className="centerDiv">
        <label htmlFor="fname">Name</label>
        <br />
        <input
          className="input"
          type="text"
          id="fname"
          name="Name"
          value={proname}
          onChange={(e) => setProname(e.target.value)}
        />
        <br />
        <label htmlFor="category">Category</label>
        <br />
        <input
          className="input"
          type="text"
          id="category"
          name="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <br />
        <label htmlFor="price">Price</label>
        <br />
        <input
          className="input"
          type="number"
          value={price}
          id="price"
          name="Price"
          onChange={(e) => setPrice(e.target.value)}
        />
        <br />
        <br />
        <img alt="Posts" width="300px" height="200px" style={{objectFit:'cover'}} src={image ? URL.createObjectURL(image) : ''} />
        <br />
        <input
          type="file"
          onChange={(e) => {
            setImage(e.target.files[0]);
          }}
        />
        <br />
        <button onClick={handleSubmit} className="uploadBtn" disabled={loading}>
          {loading ? 'Uploading...' : 'Upload and Submit'}
        </button>
        {error && <p className="error">{error}</p>}
      </div>
    </Fragment>
  );
};

export default Create;
