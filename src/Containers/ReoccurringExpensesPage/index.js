import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import styled from 'styled-components';
import { getExpenses, postRating } from '../../services/requests'

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
const RateSubscriptions = styled.div`
  
`

const ReoccurringExpensesPage = () => {

  const [total, setTotal] = useState(0);
  const [recurringPayments, setRecurringPayments] = useState(null);
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

  const calculateTotal = (data) => {
    let amount = 0;
    data.map((element) => {
      amount = amount + Math.abs(element.amount);
    })
    setTotal(amount)
  }

  const doFetchExpenses = async () => {
    const result = await getExpenses();
    setRecurringPayments(result.data);
  }
  
  useEffect(()=> {
    doFetchExpenses()
  }, [])

  useEffect(() => {
    console.log('run use effect for recurring payments: ', recurringPayments)
    if(recurringPayments !== null){
      calculateTotal(recurringPayments);
    }
    
  }, [recurringPayments])

  return(
    <Wrapper>
      {notifications && (
        <Notification><span>You have overlapping recurring payments</span></Notification>
      )}
      <HeaderContainer>
        <MainHeader>Your current spendings</MainHeader>
        <StonksNumber><span>{total.toFixed(2)}€</span><span className="explanation">per month</span></StonksNumber>
      {/* TÄHÄN SE HELVETIN KARUSELLI */}
        <Header>Subscriptions</Header>
        <Ingress>
          How do you feel about these reoccuring expenses. Do you find them useful?
        </Ingress>
      </HeaderContainer>
      {recurringPayments && recurringPayments.map((item) => (
        <RecurringPaymentContainer>
          <span className="title">{item.name}</span>
          <span className="amount">{item.amount}€</span>
          <Link to={{ pathname: `/details/${item.name.replace(/ /g, '_')}`, state:{
            ...item
          }}}>
            <span className="details">Details</span>  
          </Link>
        </RecurringPaymentContainer>
      ))}
    </Wrapper>
  )
}

export default ReoccurringExpensesPage;