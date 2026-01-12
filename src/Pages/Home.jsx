import React from 'react';
import Herosection from '../Components/Home/Herosection';
import WhyJoin from '../Components/Home/WhyJoin';
import ClubSphereHowItWorks from '../Components/Home/ClubSphereHowItWorks';
import FeaturedClubs from '../Components/Home/FeaturedClubs';
import StatsCounter from '../Components/Home/StatsCounter';
import FAQ from '../Components/Home/FAQ';
import Newsletter from '../Components/Home/Newsletter';
import CTA_Bottom from '../Components/Home/CTA_Bottom';


const Home = () => {
    
    return (
        <div>
            <Herosection></Herosection>
            <FeaturedClubs></FeaturedClubs>
            <ClubSphereHowItWorks></ClubSphereHowItWorks>
            <WhyJoin></WhyJoin>
            <StatsCounter></StatsCounter>
            <FAQ></FAQ>
            <Newsletter></Newsletter>
            <CTA_Bottom></CTA_Bottom>

        </div>
    );
};

export default Home;