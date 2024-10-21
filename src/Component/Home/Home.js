import React, { useEffect, useState } from 'react';
import ImageSlider from './ImageSlider';
import ContentSection1 from './contentSection1';
import TodaysDealSection from './TodaysDealSection';
import BestSellersSection from './BestSellersSection';
import ProductSection from './ProductSection';
import Header from '../Header/Header';
import axios from 'axios';

const hurl = "https://amazon-clone-restapi.onrender.com/homepage"
const section1 = "Top picks for Mobiles";
const section2 = "Top rated";
const section3 = "MenFashionDisc5080";
const TodaysDeals = "TodaysDeals";
const bestseller = "bestseller";
const sportsandfitness = "sportsandfitness";

const Home = () => {

    const [topPicksFromMobiles, setTopPicksFromMobiles] = useState();
    const [Toprated, setToprated] = useState();
    const [MenFashionDisc5080, setMenFashionDisc5080] = useState();
    const [todaysDeals,setTodaysDeals] = useState();
    const [Bestseller,setbestseller] = useState();
    const [Sportsandfitness,setSportsandfitness] = useState();
    

    const fetchApiForContentSection1 = async () => {
        const res = await axios.get(`${hurl}/${section1}`);
        const res2 = await axios.get(`${hurl}/${section2}`);
        const res3 = await axios.get(`${hurl}/${section3}`);

        const productIds = res.data.map(item => item.productId);
        const productIds2 = res2.data.map(item => item.productId);
        const productIds3 = res3.data.map(item => item.productId);


        const resdata = await axios.get(`https://amazon-clone-restapi.onrender.com/products?product_ids=${productIds}`)
        const resdata2 = await axios.get(`https://amazon-clone-restapi.onrender.com/products?product_ids=${productIds2}`)
        const resdata3 = await axios.get(`https://amazon-clone-restapi.onrender.com/products?product_ids=${productIds3}`)

        setTopPicksFromMobiles(resdata.data);
        setToprated(resdata2.data);
        setMenFashionDisc5080(resdata3.data);
    }

    const TodaysDealSectionData = async () => {

        const res4 = await axios.get(`${hurl}/${TodaysDeals}`);

        const productIds = res4.data.map(item => item.productId);


        const resdata4 = await axios.get(`https://amazon-clone-restapi.onrender.com/products?product_ids=${productIds}`)

        setTodaysDeals(resdata4.data);
    }

    const BestSellersSectionData = async () => {

        const res5 = await axios.get(`${hurl}/${bestseller}`);

        const productIds = res5.data.map(item => item.productId);


        const resdata5 = await axios.get(`https://amazon-clone-restapi.onrender.com/products?product_ids=${productIds}`)

        setbestseller(resdata5.data);
    }

    const ProductSectionData = async () => {

        const res6 = await axios.get(`${hurl}/${sportsandfitness}`);

        const productIds = res6.data.map(item => item.productId);


        const resdata6 = await axios.get(`https://amazon-clone-restapi.onrender.com/products?product_ids=${productIds}`)

        setSportsandfitness(resdata6.data);
    }


    useEffect(() => {
        fetchApiForContentSection1();
        TodaysDealSectionData();
        BestSellersSectionData();
        ProductSectionData();
    }, [])


    return (
        <>
            <Header />
            <ImageSlider />
            <ContentSection1 topPicksFromMobiles={topPicksFromMobiles} Toprated={Toprated} MenFashionDisc5080={MenFashionDisc5080} />
            <TodaysDealSection TodaysDeals={todaysDeals}/>
            <BestSellersSection bestseller={Bestseller}/>
            <ProductSection Sportsandfitness={Sportsandfitness}/>
        </>
    )  
}
export default Home;