import React from 'react';
import WelcomeFooter from "../components/WelcomeFooter";
import WelcomeBody from "../components/WelcomeBody";
import WelcomeHeader from '../components/WelcomeHeader';

const Welcome = () => {
  return (
    <div>
      <WelcomeHeader/>
      <WelcomeBody/>
      <WelcomeFooter/>
    </div>
  )
}

export default Welcome;