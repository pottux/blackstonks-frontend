import React, { useState, useEffect } from 'react';
import {XYPlot, XAxis, YAxis, HorizontalGridLines, VerticalGridLines, LineSeries} from 'react-vis';
import _ from 'lodash';
import styled from 'styled-components';

const TopView = styled.div`
  background-color: rgba(196, 196, 196, 0.2);
  min-height: 14em;
  height: 40%;
  width: 100%;
  padding-top: 6em;
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
  padding: 1.5em 1em 0 1em;
  .title{
    font-size: 24px;
    font-weight: 300;
    width: 100%;
    display: block;
    margin-bottom: 0.4em;
  } 
  .row {
    margin-bottom: 0.6em;
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
  
  }

  .line{
    background-color: #F3F3F3;
    height: 1px;
    width: 100%;
    margin-top: 1.2em;
    margin-bottom: 1em;
  }

  .pie-chart-explanation{
    font-size: 16px;
    font-weight: 300;
    display: inline-block;
    margin-bottom: 1em;
  }
`

const GraphContainer = styled.div`  
  
`

const DetailsPage = (props) => {
  const transaction = props.location.state;
  let total = 0;
  transaction.expenses.map((expense) => {
    total = Math.abs(expense.amount) + total;
  })
  const sorted = _.orderBy(transaction.ratings, ['date'],['asc']);
  const values = [];
  sorted.map((rating) => {
    values.push({x: rating.date, y: rating.rating})
  })
  console.log(values)
  return(
    <div>
       <TopView>
        <Card>
          <span className="title">{transaction.name}</span>
          <div className="row">
            <span className="per-something">per month</span>
            <span className="amount">{Math.abs(transaction.amount).toFixed(2)}</span>
          </div>
          <div className="row">
            <span className="per-something">per year</span>
            <span className="amount">{Math.abs(transaction.amount * 12).toFixed(2)}</span>
          </div>
          <div className="row">
            <span className="per-something">total</span>
            <span className="amount">{total.toFixed(2)}</span>
          </div>
          <div className="line"></div>
          <span className="pie-chart-explanation">Part in entertainment</span>
        </Card>
      </TopView>
      <GraphContainer>
        <XYPlot
          width={330}
          height={180}
          yDomain={[0, 5]}
          >
          <VerticalGridLines style={{strokeWidth: 1}}  />
          <HorizontalGridLines />
          <LineSeries
            curve={'curveMonotoneX'}
            color="black"
            data={values}
          />
        </XYPlot>
      </GraphContainer>
    </div>

  )
}

export default DetailsPage;