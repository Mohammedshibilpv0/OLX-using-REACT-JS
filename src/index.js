import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { FirebaseContext } from './store/Context';
import { firestore, auth,getStorage,ref } from './firebase/Config';
import Context from './store/Context'; 

ReactDOM.render(
  <FirebaseContext.Provider value={{ firestore, auth ,getStorage,ref}}>
    <Context>
      <App />
    </Context>
  </FirebaseContext.Provider>,
  document.getElementById('root')
);
