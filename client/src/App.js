import React,{Fragment} from 'react';
import './App.css';

import ListUser from './component/ListUser';
import InputUser from './component/InputUser';



function App() {
  return <Fragment>
    <div className='container mt-5'>

      <InputUser />
      <ListUser />
    </div>
  </Fragment>;
}

export default App;
