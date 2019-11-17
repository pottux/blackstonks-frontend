import React, { useState, useEffect, useContext } from 'react';
import BlackstonksContext from '../../BlackstonksContext'
import { Link } from 'react-router-dom';
import _ from 'lodash';
import styled from 'styled-components';
import { getExpenses, postRating } from '../../services/requests'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
`

const Notification = styled.div`
  width: 100%;
  top: 0;
  height: 60px;
  border: 1px solid black;
`

const RecurringPaymentContainer = styled.div`
  height: 50px;
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

const CarouselContainer = styled.div`
  margin: 0 -20px;
  display: block;
  overflow: auto;
  white-space: nowrap;
  ::-webkit-scrollbar {
    display: none;
  }
`

const CarouselCard = styled.div`
  border-radius: 20px;
  display: inline-block;
  width: 70%;
  padding: 24px;
  margin: 0 15px;
  background-color: #F2F2F2;

  h1 {
    font-weight: 300;
    font-size: 24px;
    margin: 0;
    margin-bottom: 8px;
  }

  div {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
  }

  .text {
    font-weight: 300;
    font-size: 16px;
  }

  .number {
    font-weight: 500;
    font-size: 20px;
  }

  .buttonContainer {
    display:flex;
    justify-content: space-between;
  }

  .button {
    border-radius: 15px;
    background-color: #0A042D;
    color: #FFFFFF;
    min-width: 60px;
    min-height: 30px;
  }

  .buttonText {
    font-size: 16px;
    font-weight: 500;
  }
`

const Hr = styled.hr`
  opacity: 0.3;
`

const ReoccurringExpensesPage = () => {

  const { recurringPayments } = useContext(BlackstonksContext)
  const [total, setTotal] = useState(0)
  const [notifications, setNotifications] = useState(false)
  const [toBeRated, setToBeRated] = useState(['Netflix', 'Spotify'])

  const calculateNotifications = () => {
    console.log('run calculating')
    const categories = _.groupBy(recurringPayments, 'category');
    console.log(categories)
    Object.keys(categories).map((category) => {
      if (category.length > 1) {
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

  useEffect(() => {
    console.log('run use effect for recurring payments: ', recurringPayments)
    if (recurringPayments !== null) {
      calculateTotal(recurringPayments);
    }

  }, [recurringPayments])

  const handlePostRating = (name, rating)  => {
    postRating(name, rating)
    setToBeRated(toBeRated.filter(x => x !== name))
  }

  return (
    <Wrapper>
      {notifications && (
        <Notification><span>You have overlapping recurring payments</span></Notification>
      )}
      <HeaderContainer>
        <MainHeader>Your current spendings</MainHeader>
        <StonksNumber><span>{total.toFixed(2)}€</span><span className="explanation">per month</span></StonksNumber>
        {toBeRated.length > 0 &&
          <CarouselContainer>
            {toBeRated.map(name => (
              <CarouselCard>
                <h1>{name}</h1>
                <div>
                  <span className="text">monthly</span>
                  <span className="number">{recurringPayments 
                    && recurringPayments.find(x => x.name === name) 
                    && recurringPayments.find(x => x.name === name).amount.toFixed(2)}€</span>
                </div>
                <div>
                  <span className="text">yearly</span>
                  <span className="number">{recurringPayments 
                    && recurringPayments.find(x => x.name === name) 
                    && (12*recurringPayments.find(x => x.name === name).amount).toFixed(2)}€</span>
                </div>
                <Hr />
                <div className="buttonContainer">
                  <button className="button" onClick={() => handlePostRating(name, 1)}><span className="buttonText">Bad</span></button>
                  <button className="button" onClick={() => handlePostRating(name, 2)}><span className="buttonText">Meh</span></button>
                  <button className="button" onClick={() => handlePostRating(name, 3)}><span className="buttonText">Good</span></button>
                  <button className="button" onClick={() => handlePostRating(name, 4)}><span className="buttonText">Great</span></button>
                </div>
            </CarouselCard>))}
          </CarouselContainer>}
        <Header>Subscriptions</Header>
        <Ingress>
          How do you feel about these reoccuring expenses. Do you find them useful?
        </Ingress>
      </HeaderContainer>
      {recurringPayments && recurringPayments.map((item) => (
        <RecurringPaymentContainer>
          <span className="title">{item.name}</span>
          <span className="amount">{item.amount}€</span>
          <Link to={{
            pathname: `/details/${item.name}`, state: {
              ...item
            }
          }}>
            <span className="details">Details</span>
          </Link>
        </RecurringPaymentContainer>
      ))}
    </Wrapper>
  )
}

export default ReoccurringExpensesPage;