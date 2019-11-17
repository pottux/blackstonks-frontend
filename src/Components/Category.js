import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    padding-bottom: 20px;
`

const TextContainer = styled.div`
    display: flex;
    justify-content: space-between;
`

const TypeContainer = styled.div`
    display:flex;
    justify-content: flex-end;    
`

const DarkText = styled.p`
    margin: 0;
    font-size: 16px;
`

const LightText = styled.p`
    margin: 0;
    font-size: 16px;
    opacity: 0.5;
`

const LightHr = styled.hr`
    opacity: 0.5;
`

export default ({ data }) => (
    <Container>
        {data && (
            <>
                <TextContainer>
                    <DarkText>{data.name}</DarkText>
                    <DarkText>{data.price}€</DarkText>
                </TextContainer>
                <TypeContainer>
                    <LightText>{data.type}</LightText>
                </TypeContainer>
            </>
        )}
        <LightHr />
    </Container>
);