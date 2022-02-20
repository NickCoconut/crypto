import React, { useEffect, useState } from 'react';
import millify from 'millify';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Input } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'

import axios from 'axios';

import { useGetCryptosQuery } from '../services/cryptoApi';
import Loader from './Loader';
import { combineReducers } from '@reduxjs/toolkit';

const Mylikes = ({simplified}) => {
  const count = simplified ? 10 : 100;
  const { data: cryptosList, isFetching } = useGetCryptosQuery(count);

  const[likedCryptos, setLikedCryptos] = useState([]);
  const[likedCryptosId, setLikedCryptosId] = useState([]);
  const[searchTerm, setSearchTerm] = useState('');
  
const getLikes = () => {
  axios.get('/cryptos/mylikes')
    .then(res => {
      // console.log(res.data.rows)
      setLikedCryptosId(res.data.rows.map((row) => row.crypto_url_id))
    })
};

  useEffect(() => {
    getLikes()
  }, [cryptosList])



  useEffect(() => {
    if(likedCryptosId.length > 0 && cryptosList) {
      
      setLikedCryptos(cryptosList?.data.coins.filter((coin) => likedCryptosId.includes(coin.uuid)) || [])
    } else {
      setLikedCryptos([])
    }
  }, [likedCryptosId])


  useEffect(() => {
    const filteredData = cryptosList?.data.coins.filter((coin) => likedCryptosId.includes(coin.uuid) && coin.name.toLowerCase().includes(searchTerm));
    setLikedCryptos(filteredData || []);
    
  }, [searchTerm]);


  if (isFetching) return <Loader />;

  const handleDelete = (currencyId) => {
    
    axios.post(`http://localhost:3001/cryptos/${currencyId}/unlike`)
    .then(res => getLikes())
  }

  return (
    <>
      {!simplified && (
        <div className="search-crypto">
          <Input
            placeholder="Search Cryptocurrency"
            onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
          />
        </div>
      )}
      <Row gutter={[32, 32]} className="crypto-card-container">
        {likedCryptos?.map((currency) => (
          <Col
            xs={24}
            sm={12}
            lg={6}
            className="crypto-card"
            key={currency.uuid}
          >

            <Link key={currency.uuid} to={`/crypto/${currency.uuid}`}>
              <Card
                title={`${currency.rank}. ${currency.name}`}
                extra={<img className="crypto-image" src={currency.iconUrl} />}
                hoverable
              >
                <p>Price: {millify(currency.price)}</p>
                <p>Market Cap: {millify(currency.marketCap)}</p>
                <p>Daily Change: {currency.change}%</p>
                            
              </Card>
            </Link>

            
            <FontAwesomeIcon icon={faTrashCan} onClick={() => handleDelete(currency.uuid)}/>
            
          </Col>
        ))}
      </Row>
    </>
  )
}

export default Mylikes