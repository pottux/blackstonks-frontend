import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom'
import BlackstonksContext from '../../BlackstonksContext'
import { XYPlot, XAxis, YAxis, HorizontalGridLines, VerticalGridLines, LineSeries, RadialChart } from 'react-vis';
import _ from 'lodash';
import styled from 'styled-components';
import arrow from '../../static/back.svg';
import wallet from '../../static/wallet.svg';


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

const TopView = styled.div`
  background-color: rgba(196, 196, 196, 0.2);
  min-height: 14em;
  height: 40%;
  width: 100%;
  padding-top: 3.5em;
  padding-bottom: 2em;
`
const BottomView = styled.div`
  background-color: white;
  min-height: 14em;
  height: 40%;
  width: 100%;
  padding-top: 3em;
  padding-bottom: 2em;
`
const BackLink = styled.div`
  margin-bottom: 2em;
  margin-left: 1.5em;
  .back-link{
    background-image: url(${arrow});
    background-repeat: no-repeat;
    background-position-y: center;
    padding-left: 2em;
  }
`

const TipCard = styled.div`
  width: 85%;
  min-height: 10em;
  background: #F3F3F3;
  border-radius: 8px;
  margin: auto;
  padding: 1.5em 1em 1em 1em;
  .tip-title {
    background-image: url(${wallet});
    background-repeat: no-repeat;
    background-position-y: center;
    padding-left: 3em;
    font-size: 16px;
    font-style: normal;
    font-weight: normal;
    line-height: 24px;
    display: block;
    margin-bottom: 1.5em;
  }
  .tip-content {
    font-size: 18px;
    line-height: 135%;
    margin: 0;
    padding: 0 0.3em;
  }

  .bold {
    font-weight: bold;
  }
`

const Card = styled.div`
  width: 85%;
  min-height: 10em;
  background-color: white;
  border-radius: 10px;
  margin: auto;
  -webkit-box-shadow: 10px 16px 32px -30px rgba(0,0,0,0.52);
  -moz-box-shadow: 10px 16px 32px -30px rgba(0,0,0,0.52);
  box-shadow: 10px 16px 32px -30px rgba(0,0,0,0.52);
  padding: 1.5em 1em 1em 1em;
  .title{
    font-size: 24px;
    font-weight: 300;
    width: 100%;
    display: block;
    margin-bottom: 0.6em;
  } 
  .row {
    margin-bottom: 0.7em;
    min-height: 1em;
  }
  .per-something{
    float: left;
    font-size: 16px;
    opacity: 50%;
    display: block;
    width: 50%;
  }

  .amount{
    display: block;
    float: right;
    font-size: 20px;
    font-weight: 700;
  
  }

  .line{
    background-color: #F3F3F3;
    height: 1px;
    width: 100%;
    margin-top: 1.2em;
    margin-bottom: 1em;
  }

  .pie-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .pie-chart-explanation{
    flex-grow: 2;
    font-size: 16px;
    line-height: 16px;
    font-weight: 300;
  }

  .pie-chart-percent{
    font-size: 16px;
    line-height: 16px;
    font-weight: 500;
    margin-left: 0.5em;
  }
`

const GraphContainer = styled.div`  
  margin-top: 2em;
  padding: 0 2em;

  .graph-title {
    font-style: normal;
    font-weight: normal;
    font-size: 20px;
    line-height: 130%;
  }

  .graph {
    display: flex;
    align-items: strech;
    margin-top: 1em;
  }
`
const CategoryContainer = styled.div`  
  margin-top: 2em;
  padding: 0 1em;

  .graph-title {
    font-style: normal;
    font-weight: normal;
    font-size: 20px;
    line-height: 130%;
    margin-left: 1em;
  }

`


const Scale = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 2.2em;

  .scale-item {
    opacity: 0.50;
    color: #000000;
    text-align: left;
  }
`

const texts = {
  1: {
    rating: "Based on your previous ratings of this service, it seems like you're not really enjoying it. Maybe you could pause the subscription?",
    category: "It seems like you already have a high number of services in this category. Maybe you could pause the subscription?"
  },
  2: {
    rating: "Based on your previous ratings of this service, you seem to be enjoying it somewhat.",
    category: "It seems like you are enjoying this service, but you have more preferred ones in this category already."
  },
  3: {
    rating: "It seems like you are really enjoying this service.",
    category: "It seems like you are really enjoying this service."
  }
}


const DetailsPage = (props) => {
  const { recurringPayments } = useContext(BlackstonksContext)

  if (!recurringPayments) {
    return <div />
  }

  const transaction = recurringPayments.find(p => p.name === props.id)
  const total = transaction.expenses.reduce((ac, curr) => (
    ac - curr.amount
  ), 0)
  const sorted = _.orderBy(transaction.ratings, ['date'], ['asc']);
  const values = sorted.map(r => ({
    x: r.date,
    y: r.rating
  }))

  const myData = [{ angle: transaction.part, color: 'black' }, { angle: 1 - transaction.part, color: '#F3F3F3' }]

  return (
    <div>
      <TopView>
        <BackLink><Link className="back-link" to='/'>Back</Link></BackLink>
        <Card>
          <span className="title">{transaction.name}</span>
          <div className="row">
            <span className="per-something">per month</span>
            <span className="amount">{`${Math.abs(transaction.amount).toFixed(2)}€`}</span>
          </div>
          <div className="row">
            <span className="per-something">per year</span>
            <span className="amount">{`${Math.abs(transaction.amount * 12).toFixed(2)}€`}</span>
          </div>
          <div className="row">
            <span className="per-something">total</span>
            <span className="amount">{`${total.toFixed(2)}€`}</span>
          </div>
          <div className="line"></div>
          <div className="pie-container">
            <span className="pie-chart-explanation">Part of {transaction.category} expenses</span>
            <RadialChart
              data={myData}
              width={36}
              height={36}
              radius={17}
              margin={0}
              colorType="literal" />
            <span className="pie-chart-percent">{parseInt(100 * transaction.part)} %</span>
          </div>
        </Card>
      </TopView>
      <BottomView>
        <TipCard>
          <span className="tip-title">BLACKSTONK'S COMMENTS</span>
          <p className="tip-content">{texts[transaction.color][transaction.colorByCategory ? 'category' : 'rating']}</p>
          <p className="tip-content">By pausing the subscription, you could save <span className="bold">{Math.abs(transaction.amount * 12).toFixed(2)}€</span> annually.</p>
        </TipCard>
        <GraphContainer>
          <span className="graph-title">Satisfaction</span>
          <div className="graph">
            <Scale>
              <span className="scale-item">Great</span>
              <span className="scale-item">Good</span>
              <span className="scale-item">Meh</span>
              <span className="scale-item">Bad</span>
            </Scale>
            <XYPlot
              width={320}
              height={250}
              yDomain={[1, 4]}
              margin={{ left: 12, right: 10, top: 10, bottom: 40 }}
            >
              <VerticalGridLines style={{ strokeWidth: 1 }} />
              <HorizontalGridLines />
              <LineSeries
                curve={'curveMonotoneX'}
                color="black"
                data={values}
              />
            </XYPlot>
          </div>
        </GraphContainer>
        <CategoryContainer>
          <span className="graph-title">Services in same category</span>
          {recurringPayments && recurringPayments
            .filter(item => item.category === transaction.category)
            .filter(item => item.name !== transaction.name).length > 0 ? 
            recurringPayments
            .filter(item => item.category === transaction.category)
            .filter(item => item.name !== transaction.name)
            .map((item) => (
            <Link to={{
              pathname: `/details/${item.name}`, state: {
                ...item
              }
            }}>
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
          )) : <p>No other services to display.</p>}
        </CategoryContainer>
      </BottomView>
    </div >

  )
}

export default DetailsPage;