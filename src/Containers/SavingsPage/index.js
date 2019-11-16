import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 2em;
`

const Notification = styled.div`
  width: 100%;
  top: 0;
  height: 60px;
  border: 1px solid black;
`

const RecurringPaymentContainer = styled.div`
  height: 50px;
  width: 80%;
  margin-top: 1.3em;
  background-color: #F5F5F5;
  padding: 1em;
  border-radius: 12px;
  -webkit-box-shadow: 10px 13px 16px -16px rgba(0,0,0,0.75);
  -moz-box-shadow: 10px 13px 16px -16px rgba(0,0,0,0.75);
  box-shadow: 10px 13px 16px -16px rgba(0,0,0,0.75);

  .title{
    width: 100%;
    display: inline-block;
    margin-bottom: 0.6em;
    font-size: 16px;
  }
  .amount{
    font-size: 20px;
    font-weight: 300;
  }
  .details {
    float: right;
  }
`

const HeaderContainer = styled.div`
  margin-left: 2.4em;
`
const MainHeader = styled.div`
  font-weight: 300;
  font-size: 24px;
  max-width: 50%;
`

const Header = styled.h2`
  font-weight: 300;
  font-size: 20px;
`

const Ingress = styled.div`
  width: 60%;
  font-weight: 300;
`

const StonksNumber = styled.div`
  font-size: 48px;
  margin-top: 0.8em;
  margin-bottom: 1em;

  .explanation {
    font-size: 14px;
    color: rgba(0,0,0,0.5);
    display: inline-block;
    margin-left: 0.4em;
    font-weight: 300;
  }
`

const mockData = [
  {name: 'Spotify Family', category: 'music', amount: 16.99, active: true},
  {name: 'Netflix', category: 'streaming', amount: 12.99, active: true},
  {name: 'HBO', category: 'streaming', amount: 9.99, active: true},
  {name: 'One average lunch/week',  category: 'food', amount: 44, active: true},
  {name: 'Amazon Prime', category: 'streaming', amount: 8.99, active: true},
  {name: 'ViaPlay', category: 'streaming',amount: 10.99, active: true},
  {name: 'CMore + Sport',  category: 'streaming', amount: 22.99, active: true},
]

const SavingsPage = () => {

  const [savedAmount, setSavedAmount] = useState(0);
  const [recurringPayments, setRecurringPayments] = useState(mockData);
  const [notifications, setNotifications] = useState(false)

  const calculateNotifications = () => {
    console.log('run calculating')
    const categories = _.groupBy(recurringPayments, 'category');
    console.log(categories)
    Object.keys(categories).map((category) => {
      if(category.length > 1) {
        setNotifications(true)
      }
    })
  }

  const calculateTotal = () => {
    
  }
  
  useEffect(()=> {
    calculateTotal();
    calculateNotifications();
  }, [mockData])

  return(
    <Wrapper>
      {!notifications && (
        <Notification><span>You have overlapping recurring payments</span></Notification>
      )}
      <HeaderContainer>
        <MainHeader>Your current spendings</MainHeader>
        <StonksNumber><span>430,00€</span><span className="explanation">per month</span></StonksNumber>
        <Header>Subscriptions</Header>
        <Ingress>
          How do you feel about these reoccuring expenses. Do you find them useful?
        </Ingress>
      </HeaderContainer>
      {mockData.map((item) => (
        <RecurringPaymentContainer>
          <span className="title">{item.name}</span>
          <span className="amount">{item.amount}€</span>
          <span className="details">Details</span>
        </RecurringPaymentContainer>
      ))}
    </Wrapper>
  )
}

export default SavingsPage;