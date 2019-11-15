import React from 'react';
import { PrimaryButton, SecondaryButton } from '../../Components/Button';
import styled from 'styled-components';

const Header = styled.h2`
  font-family: Roboto;
  text-align: center;
  margin: auto;
`

const ButtonContainer = styled.div `
  margin-top: 20em;
`


const FrontPage = () => {
  return(
    <div>
      <Header>Stonks</Header>
      <ButtonContainer>
        <SecondaryButton title={'Spotify family'}/>
      </ButtonContainer>
    </div>
  )
}

export default FrontPage;