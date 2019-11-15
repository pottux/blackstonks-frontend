import React from 'react';
import { PrimaryButton, SecondaryButton } from '../../Components/Button';
import styled from 'styled-components';
import "typeface-roboto";

const Header = styled.h1`
  font-family: 'Roboto';
  font-weight: 300;
  text-align: center;
  margin: auto;
  margin-top: 2em;
`

const ButtonContainer = styled.div `
  margin-top: 15.938em;
`


const FrontPage = () => {
  return(
    <div>
      <Header>Stonks</Header>
      <ButtonContainer>
        <SecondaryButton title={'Log in'}/>
      </ButtonContainer>
    </div>
  )
}

export default FrontPage;