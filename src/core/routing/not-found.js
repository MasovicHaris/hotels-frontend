import React from 'react';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';

const Wrapper = styled.div`
  text-align: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

function NotFound() {
  return (
    <Wrapper>
      <Typography variant="h3">{404}</Typography>
      <Typography variant="h6">{'Page not found.'}</Typography>
    </Wrapper>
  );
}

export default NotFound;
