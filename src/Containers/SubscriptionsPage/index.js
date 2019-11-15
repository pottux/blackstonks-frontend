import React from 'react';
import { PrimaryButton, SecondaryButton } from '../../Components/Button';
import styled from 'styled-components';
import "typeface-roboto";

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0px 48px;
`

const InfoContainer = styled.div`
  font-family: 'Roboto';
  font-size: 20px;
  margin-top: 5em;
  height: 5em;
  span{
    display: inline-block;
  }
`

const SubInfoContainer = styled.div`
  font-size: 16px;
  color: rgba(0, 0, 0, 0.5)

`

const ButtonsContainer = styled.div`
  margin-top: 2em;
  display: flex;
  flex-wrap: wrap;
`

const ButtonContainer = styled.div `
  margin-top: 1em;
  padding-left: 1.5em;
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
      <ButtonsContainer>
      <ButtonContainer>
        <PrimaryButton title={'Spotify Family'} desc={'16.99/m'}/>
      </ButtonContainer>
      <ButtonContainer>
        <PrimaryButton title={'Hbo'} desc={'14.99/m'}/>
      </ButtonContainer>
      <ButtonContainer>
        <PrimaryButton title={'PS Now'} desc={'14.99/m'}/>
      </ButtonContainer>
      </ButtonsContainer>
    </Wrapper>
  )
}

export default FrontPage;