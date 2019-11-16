import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Notification = styled.div`
  width: 100%;
  top: 0;
  height: 60px;
  border: 1px solid black;
`

const RecurringPaymentContainer = styled.div`
  height: 40px;
  width: 80%;
  margin-top: 1.3em;
  background-color: #F5F5F5;
  padding: 1em;
  border-radius: 12px;
  -webkit-box-shadow: 10px 13px 16px -16px rgba(0,0,0,0.75);
  -moz-box-shadow: 10px 13px 16px -16px rgba(0,0,0,0.75);
  box-shadow: 10px 13px 16px -16px rgba(0,0,0,0.75);
  .amount{
    float: right;
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
      {mockData.map((item) => (
        <RecurringPaymentContainer>
          <span className="title">{item.name}</span>
          <span className="amount">{item.amount}€</span>
        </RecurringPaymentContainer>
      ))}
    </Wrapper>
  )
}

export default SavingsPage;