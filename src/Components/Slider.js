import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const SliderContainer = styled.div`
  .background{
    background-color: #DFDFDF;
    widht: 100px;
    height: 10px;
    border-radius: 30px;
    max-width: 80%;
    margin: auto;
  }

  .indicator{
    height: 25px;
    width: 25px;
    background-color: black;
    border-radius: 50%;
    display: inline-block;
  }
`


const Slider = () => {
  const [pos, setPos] = useState({x: 0})
  const [dragging, setDragging] = useState(false);


  useEffect(() => {
    console.log(`Hello`);
  });

return (
  <SliderContainer>
    <div className="background">
    </div>
    <div className="indicator"></div>
  </SliderContainer>
)}

export default Slider;