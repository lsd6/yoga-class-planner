
import React from 'react';
import './Home.css';
import Lottie from 'lottie-react';
import yogaAnimation from '../Images/yoga.json';

const Home = () => {
  return (
    <div className="home-container">
      <div className="content-left">
        <h5>Yoga for Everyone</h5>
        <h3>Explore the Healing Path of Yoga, Suitable for All Ages and Levels</h3>
      </div>
      <div className="content-right">
        <Lottie animationData={yogaAnimation} />
      </div>
    </div>
  );
};

export default Home;
