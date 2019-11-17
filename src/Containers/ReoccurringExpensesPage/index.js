import React, { useState, useEffect, useContext } from 'react';
import BlackstonksContext from '../../BlackstonksContext'
import { Link } from 'react-router-dom';
import _ from 'lodash';
import styled from 'styled-components';
import { getExpenses, postRating } from '../../services/requests'
import BadStonksModal from './BadStonksModal';

const Wrapper = styled.div`

  .line{
    width: 100%;
    background-color: #E9E9E9;
    height: 1px;
    margin-bottom: 2em;
  }
  display: flex;
  flex-direction: column;
  padding: 4em 2em;
`

const Notification = styled.div`
  width: 100%;
  top: 0;
  height: 60px;
  border: 1px solid black;
`

const RecurringPaymentContainer = styled.div`
  display: flex;  
  flex-wrap: wrap;
  justify-content: space-between;
  min-height: 50px;
  margin-top: 1.3em;
  background-color: #F5F5F5;
  padding: 1em;
  border-radius: 12px;
  -webkit-box-shadow: 10px 13px 16px -16px rgba(0,0,0,0.75);
  -moz-box-shadow: 10px 13px 16px -16px rgba(0,0,0,0.75);
  box-shadow: 10px 13px 16px -16px rgba(0,0,0,0.75);

  span{
    display: inline-block;
  }

  .section1{
    width: 45%;
  }

  .section2{
    width: 18%
  }

  .section3{
    width: 25%;
  }

  .title{
    width: 100%;
    display: inline-block;
    font-size: 16px;
    margin-bottom: 0.6em;
  }

  .month {
    width: 100%;
    opacity: 50%;
    font-weigth: 300;
    margin-bottom: 0.3em;

  }

  .year {
    width: 100%;
    opacity: 50%;
    font-weigth: 300;
    margin-bottom: 0.3em; 
  }


  .amount-month{
    width: 100%;
    font-weight: 300;
    font-size: 20px;

  }

  .amount-year{
    width: 100%;
    font-weight: 300;
    font-size: 20px;
  }

  .rate-container{
    width: 100%;
  }

  .status-ball {
    height: 10px;
    width: 10px;
    border-radius: 50%;
    display: inline-block;
    margin-right: 0.6em;
  }

  .red {
    background-color: #E10E0E;
  }

  .yellow {
    background-color: #FAA500;
  }

  .green {
    background-color: #2ABD0C;
  }

  .rate{
    display: inline;
    font-weigth: 300;
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
  margin-bottom: 0.5em;
  font-weight: 300;

  .explanation {
    font-size: 14px;
    color: rgba(0,0,0,0.5);
    display: inline-block;
    margin-left: 0.4em;
    font-weight: 300;
  }
`
const RateSubscriptions = styled.div`
  .title{
    display:inline-block;
    width: 100%;
    font-size: 20px;
    font-weight: 300;
  }

  .info{
    display: inline-block;
    font-weight: 300;
    margin-top: 1em;
    margin-bottom: 1.5em;
    width: 80%;
  }

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
  const [renderModal, setRenderModal] = useState(false)
  const [toBeRated, setToBeRated] = useState(['Netflix', 'Spotify'])
  const [nameInRating, setNameInRating] = useState(null);

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
    if(rating === 1 || rating === 2) {
      setNameInRating(name);
      setRenderModal(true);
    }
  }

  const closeModal= () => {
    setRenderModal(false);
    setNameInRating(null);
  }

  if(recurringPayments){
    console.log('recur test')
      console.log(recurringPayments)
  console.log(recurringPayments.filter((e) => e.name === 'Spotify'))
  }

  console.log(toBeRated)

  return (
    <Wrapper>
      {notifications && (
        <Notification><span>You have overlapping recurring payments</span></Notification>
      )}
      {renderModal && nameInRating && <BadStonksModal item={recurringPayments.filter((payment) => payment.name === nameInRating)[0]} onClick={closeModal} /> }
      <HeaderContainer>
        <MainHeader>Your current spendings</MainHeader>
        <StonksNumber><span>{total.toFixed(2)}€</span><span className="explanation">per month</span></StonksNumber>
        <div className="line"></div>
        <RateSubscriptions>
          <span className="title">Rate subscriptions</span>
          <span className="info">These are some of the upcoming subscriptions. Rate them based on usage to get better suggestions</span>
        </RateSubscriptions>
        {toBeRated.length > 0 &&
          <CarouselContainer>
            {toBeRated.map(name => (
              <CarouselCard>
                <h1>{name}</h1>
                <div>
                  <span className="text">monthly</span>
                  <span className="number">{recurringPayments 
                    && recurringPayments.find(x => x.name === name) 
                    && Math.abs(recurringPayments.find(x => x.name === name).amount.toFixed(2))}€</span>
                </div>
                <div>
                  <span className="text">yearly</span>
                  <span className="number">{recurringPayments 
                    && recurringPayments.find(x => x.name === name) 
                    && Math.abs((12*recurringPayments.find(x => x.name === name).amount).toFixed(2))}€</span>
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
        <Link to={{ pathname: `/details/${item.name}`, state:{
          ...item
        }}}>
          <RecurringPaymentContainer>
            <div className="section1">
              <span className="title">{item.name}</span>
              <div className="rate-container">
                <div className={`status-ball ${item.color === 3 ? 'green' : item.color === 2 ? 'yellow' : 'red'}`}></div>
                 <div className="rate">– {item.color === 3 ? 'solid choice' : item.color === 2 ? 'questionable' : 'redundant'}</div>
              </div>
            </div>
            <div className="section2">
              <span className="month">monthly</span>
              <span className="amount-month">{Math.abs(item.amount).toFixed(2)}€</span>
            </div>
            <div className="section3">
              <span className="year">yearly</span>
              <span className="amount-year">{Math.abs(item.amount * 12).toFixed(2)}€</span>  
            </div>
          </RecurringPaymentContainer>
        </Link>
      ))}
    </Wrapper>
  )
}

export default ReoccurringExpensesPage;