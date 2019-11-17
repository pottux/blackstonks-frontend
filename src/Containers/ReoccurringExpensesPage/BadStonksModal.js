import React from 'react';
import styled from 'styled-components';

const ModalContainer = styled.div`
.modal {
  width: 80%;
  min-height: 200px;
  z-index: 1010;
  position: absolute;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  background-color: white;

  .info-text{
    width: 70%;
    margin: auto;
    margin-top: 2em;
    font-weight: 300;
  }

  button{
    width: 12em;
    background-color: black;
    color: white;
    height: 3em;
    display: block;
    margin: auto;
    margin-top: 2em;
    margin-bottom: 2em;
  }
}

.modal .modal-content {
}

.modal-overlay {
  z-index: 100;

  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); 
}

`

const BadStonksModal = (props) => (
  <ModalContainer>
    <div className='modal'>
        <div className="modal-content">
          <div className="info-text">You were not happy about this subscription 3 times in a row, maybe you want to cancel it?</div>
          <button>See the impact</button>
        </div>
      </div>
      <div className="modal-overlay" id="modal-overlay"></div>
  </ModalContainer>
)

export default BadStonksModal;