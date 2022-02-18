import React, {useState, useEffect} from 'react';
import axios from 'axios';

const Mylikes = () => {
  const[likedCryptos, setLikedCryptos] = useState('')

  useEffect(() => {

    axios.get('/cryptos/mylikes')
    .then(res => {
      console.log(res)
    })

  }, [])
    

  return (
    <>
    <h2>Mylikes</h2>
    <div>
      {likedCryptos}
    </div>
    </>
  )
}

export default Mylikes