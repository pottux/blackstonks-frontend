import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import styled from 'styled-components';

const TopView = styled.div`
  background-color: rgba(196, 196, 196, 0.2)
  height: 40%;
  width: 100%;
`

const DetailsPage = (props) => {
  console.log(props.location.state)
  return(
    <TopView>details</TopView>
  )
}

export default DetailsPage;