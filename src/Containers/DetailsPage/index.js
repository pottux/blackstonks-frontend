import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom'
import BlackstonksContext from '../../BlackstonksContext'
import { XYPlot, XAxis, YAxis, HorizontalGridLines, VerticalGridLines, LineSeries, RadialChart } from 'react-vis';
import _ from 'lodash';
import styled from 'styled-components';
import arrow from '../../static/back.svg';
import wallet from '../../static/wallet.svg';

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
  
`

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

  const myData = [{angle: 1, color: 'black'}, {angle: 2, color: '#F3F3F3'}]

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
            <span className="pie-chart-explanation">Part in entertainment</span>
            <RadialChart
              data={myData}
              width={36}
              height={36}
              radius={17}
              margin={0}
              colorType="literal" />
              <span className="pie-chart-percent">15 %</span>
          </div>
        </Card>
      </TopView>
      <BottomView>
        <TipCard>
          <span className="tip-title">POTENTIAL SAVINGS</span>
          <p className="tip-content">It seems that you enjoy HBO more than Netflix. Ditching this subscription in favor of HBO will save you 180€ every year</p>
        </TipCard>
        <GraphContainer>
          <XYPlot
            width={330}
            height={180}
            yDomain={[0, 5]}
          >
            <VerticalGridLines style={{ strokeWidth: 1 }} />
            <HorizontalGridLines />
            <LineSeries
              curve={'curveMonotoneX'}
              color="black"
              data={values}
            />
          </XYPlot>
        </GraphContainer>
      </BottomView>
    </div>

  )
}

export default DetailsPage;