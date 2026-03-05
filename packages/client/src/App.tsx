import { useEffect, useState } from 'react';
import './App.css';
import { Button } from './components/ui/button';

function App() {
   const [message, setMessage] = useState('');
   useEffect(() => {
      fetch('/api/hello')
         .then((res) => res.json())
         .then((data) => setMessage(data.message));
   }, []);

   return (
      <div className="p-4">
         <p className="font-bold p-4 text-3xl">{message}</p>
         <Button>点击</Button>
      </div>
   );
}

export default App;
