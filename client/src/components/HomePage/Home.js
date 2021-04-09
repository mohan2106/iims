import React from 'react';
import {homeObjOne} from './Data';
import TextImageComponent from '../ImageTextComponent/TextImageComponent';
import Events from '../Events/Events';
import Query from '../AskQuery/AskQuery';
import Colleges from '../Colleges/Colleges';

const Home = ()=>{
    const wwd=[
        {
            img:process.env.PUBLIC_URL + '/images/atheletcs.svg',
            title:'Atheletics',
            desc:'Inter IIT Atheletic game'
        },
        {
            img: process.env.PUBLIC_URL + '/images/football.svg',
            title:'Football',
            desc:'Inter IIT Football tournament'
        },
        {
            img: process.env.PUBLIC_URL + '/images/movies.svg',
            title:'Entertainment',
            desc:'Inter IIT Fun and Entertainment Event'
        },
        {
            img: process.env.PUBLIC_URL + '/images/techmeet.svg',
            title:'Tech Meet',
            desc:'Inter IIT Tech Meet'
        },
        
    ];
    return (
        <div>
            <section id='home'>
                <TextImageComponent {...homeObjOne}/>
            </section>
            <section id='events'>
                <Events wwd={wwd}/>
            </section>
            {/* <section id='colleges'>
                <Colleges />
            </section> */}
            <section id='query'>
                <Query />
            </section>
        </div>
    );
}

export default Home;