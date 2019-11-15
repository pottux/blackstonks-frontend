import React from 'react';
import styled from 'styled-components';
import Category from './Category'


const Container = styled.div`

`

export default ({ categoryData }) => {
    return (
        <Container>
            {categoryData && categoryData.map(category => <Category data={category} />)}
        </Container>
    )
}