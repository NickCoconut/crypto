import React from 'react';
import LikedCryptos from './LikedCryptos';
import LikedNews from './LikedNews';

import { Typography} from 'antd';

const { Title } = Typography;

const Mylikes = () => {
  return (
    <>
      <div className="home-heading-container">
        <Title level={2} className="home-title">Your cryptos</Title>
      </div>
      <LikedCryptos />
      <div className="home-heading-container">
        <Title level={2} className="home-title">Your crypto news</Title>
      </div>
      <LikedNews />
    </>
  )
}

export default Mylikes
