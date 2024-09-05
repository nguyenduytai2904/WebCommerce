import { Image } from 'antd';

import React from 'react'
import { WrapperSliderStyle } from './style';

const SilderComponent = ({arrImages}) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: '0',
        autoplay: true,
        autoplaySpeed: 2000
    };
  return (
    <WrapperSliderStyle {...settings}>
        {arrImages.map((image) =>{
            return(
                    <Image src={image} alt="Centered" preview={false} width="100%"  height="274px"/>
            )
        })}
    </WrapperSliderStyle>
  )
}

export default SilderComponent