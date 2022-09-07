import React, { FC, useState } from 'react';
import { TextField, Button } from '@mui/material';
import axios from 'axios';

const App: FC = () => {
  const [value, setValue] = useState('');
  const [items, setItems] = useState<any>([]);

  const apiSend = () => {
    console.log('apiSend start');
    console.log('apiSend value:', value);
    axios
      .post('/add', {
        name: value,
        age: 666,
      })
      .then((res) => {
        console.log('axios res:', res.data);
      })
      .catch((error) => console.log('axios error:', error));
  };

  const apiGetItems = () => {
    axios
      .get('/items')
      .then((res) => {
        setItems(res.data);
        console.log('axios res:', res.data);
      })
      .catch((error) => console.log('axios error:', error));
  };

  return (
    <div>
      <Button onClick={apiGetItems}>get items</Button>
      <div>
        {items.map((items, id) => {
          return <div key={id}>name: {items.name}</div>;
        })}
      </div>
    </div>
  );
};

export default App;
