import React from 'react';
import { PrimaryButton, SecondaryButton } from '../../Components/Button';
import CategoryList from '../../Components/CategoryList';
import styled from 'styled-components';

const Container = styled.div`
  padding: 0px 48px;
`

const Header = styled.h2`
  text-align: center;
  margin: auto;
  margin-top: 2em;
`

const ButtonContainer = styled.div `
  margin-top: 15.938em;
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
        <SecondaryButton title={'Log in'}/>
      </ButtonContainer>
    </Container>
  )
}

export default FrontPage;