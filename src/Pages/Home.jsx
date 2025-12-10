import React from 'react';
import Herosection from '../Components/Home/Herosection';
// import Reviews from '../Components/Home/Reviews';
import Intro from '../Components/Home/Intro';
import WhyJoin from '../Components/Home/WhyJoin';
import ClubSphereHowItWorks from '../Components/Home/ClubSphereHowItWorks';
import FeaturedClubs from '../Components/Home/FeaturedClubs';
import Events from '../Components/Home/Event/Events';


const Home = () => {
    
    return (
        <div>
            <Herosection></Herosection>
            <FeaturedClubs></FeaturedClubs>
            <Events></Events>
            <Intro></Intro>
            <WhyJoin></WhyJoin>
            <ClubSphereHowItWorks></ClubSphereHowItWorks>

        </div>
    );
};

export default Home;