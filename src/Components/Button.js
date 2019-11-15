import React from 'react';
import styled from 'styled-components';

const ButtonWrapper = styled.div`
  button{
    width: 13.125em;
    height: 2.375em;
    margin: auto;
    display : flex;
    align-items : center;
    justify-content: center;
    font-family: 'Roboto', sans-serif;
  }

  .primary {
    background-color: black;
    color: white;
  }
  .secondary {
    background-color: rgba(196, 196, 196, 0.5);
    color: black;
    height: 3.813em;
    width: 16.500em;
  }

  .rounded {
    border-radius 28px;
  }

  .desc{
    padding-left: 0.4em;
    opacity: 60%;
  }
`

export const PrimaryButton = (props) => (
  <ButtonWrapper>
    <button 
      className="primary rounded" 
      onClick={props.onClick}>
        <span>{props.title}</span><span className="desc">{props.desc}</span>
    </button>
  </ButtonWrapper>
)

export const SecondaryButton = (props) => (
  <ButtonWrapper>
    <button className='secondary' onClick={props.onClick}>{props.title}</button>
  </ButtonWrapper>
)
