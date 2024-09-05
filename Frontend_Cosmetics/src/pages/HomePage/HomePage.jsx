import React from "react";
import TypeProduct from "../../components/TypeProduct/TypeProduct";
import { WrapperButtonMore, WrapperProducts, WrapperTypeProduct } from "./style";
import SilderComponent from "../../components/SliderComponent/SilderComponent";

import slider2 from '../../assets/images/slider2.webp'
import slider3 from '../../assets/images/slider3.webp'
import slider4 from '../../assets/images/slider4.webp'
import CardComponent from "../../components/CardComponent/CardComponent";


const HomePage = () =>{
    const arr= [ 'Serum' ,'Mask', 'Cleaner','Tonner','SunCream']
    return (
        <>
            <div style={{width: '1270px',margin: '0 auto'}}>
                <WrapperTypeProduct>
                    {arr.map((item) => {
                        return (
                            <TypeProduct name={item} key={item}/>
                        )
                    })}
                </WrapperTypeProduct>
            </div>
            <div className='body' style={{width: '100%', background: '#efefef'}}>
                <div id="container" style={{height: '1000px', width: '1270px', margin: '0 auto'}}>
                    <SilderComponent arrImages={[slider2,slider3,slider4]}/>
                    <WrapperProducts>
                        <CardComponent/>
                        <CardComponent/>
                        <CardComponent/>
                        <CardComponent/>        
                        <CardComponent/>
                        <CardComponent/>
                    </WrapperProducts>
                    <div style={{width: '100%' , display: 'flex', justifyContent: 'center',marginTop: '10px'}}>
                        <WrapperButtonMore textButton='More' type="outline" styleButton={{
                            border: '3px solid #326e51',
                            width: '240px',
                            height: '38px',
                            margin: 0,
                            padding: 0, 
                            borderRadius: '4px',
                            color: '#326e51'
                        }}
                            styleTextButton={{paddingTop:'5px',fontWeight:'bold',width: '100%',height:'100%'}}
                        />
                    </div>
                    
                </div>
            </div>
            
        </>
    )
}

export default HomePage