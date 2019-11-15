import React from 'react';
import { PrimaryButton, SecondaryButton } from '../../Components/Button';
import styled from 'styled-components';
import "typeface-roboto";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center; 
  padding: 0px 48px;
`

const InfoContainer = styled.div`
  font-family: 'Roboto';
  font-size: 20px;
  margin-top: 5em;
  height: 5em;
  width: 75%;

  span{
    display: inline-block;
  }
`

const SubInfoContainer = styled.div`
  font-size: 16px;
  color: rgba(0, 0, 0, 0.5)
  width: 75%;

`

const ButtonContainer = styled.div `
  margin-top: 2em;
`


const FrontPage = () => {
  return(
    <Wrapper>
      <InfoContainer>
        <span>
          Add your subscriptions to see how they affect your budget every day, month, year 
        </span>
      </InfoContainer>
      <SubInfoContainer>
        Plan your subscriptions, monthly-acquirable products and more
      </SubInfoContainer>
      <ButtonContainer>
        <PrimaryButton title={'Spotify Family'} desc={'16.99/m'}/>
      </ButtonContainer>
      <ButtonContainer>
        <PrimaryButton title={'Hbo'} desc={'14.99/m'}/>
      </ButtonContainer>
      <ButtonContainer>
        <PrimaryButton title={'PS Now'} desc={'14.99/m'}/>
      </ButtonContainer>
    </Wrapper>
  )
}

export default FrontPage;