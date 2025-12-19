import React from 'react';
import Herosection from '../Components/Home/Herosection';
import WhyJoin from '../Components/Home/WhyJoin';
import ClubSphereHowItWorks from '../Components/Home/ClubSphereHowItWorks';
import FeaturedClubs from '../Components/Home/FeaturedClubs';


const Home = () => {
    
    return (
        <div>
            <Herosection></Herosection>
            <FeaturedClubs></FeaturedClubs>
            <ClubSphereHowItWorks></ClubSphereHowItWorks>
            <WhyJoin></WhyJoin>
            

        </div>
    );
};

export default Home;