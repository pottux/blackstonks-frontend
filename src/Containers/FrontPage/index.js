import React from 'react';
import { PrimaryButton, SecondaryButton } from '../../Components/Button';
import CategoryList from '../../Components/CategoryList';
import styled from 'styled-components';

const Container = styled.div`
  padding: 0px 48px;
`

const Header = styled.h2`
  font-family: Roboto;
  text-align: center;
  margin: auto;
`

const ButtonContainer = styled.div `
  margin-top: 20em;
`

const MOCK_CATEGORY_DATA = [
  {
    name: 'Netflix',
    price: 16.99,
    type: 'monthly'
  },
  {
    name: 'Kalja',
    price: 123.99,
    type: 'monthly'
  },
  {
    name: 'Spotify',
    price: 12.99,
    type: 'monthly'
  }
]

const FrontPage = () => {
  return(
    <Container>
      <Header>Stonks</Header>
      <ButtonContainer>
        <SecondaryButton title={'Spotify family'}/>
      </ButtonContainer>
      <CategoryList categoryData={MOCK_CATEGORY_DATA}/>
    </Container>
  )
}

export default FrontPage;