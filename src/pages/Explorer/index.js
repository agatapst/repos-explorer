import React from 'react';
import Container from 'components/Container';
import Input from 'components/Input';
import Button from 'components/Button';
import InfoBox from 'components/InfoBox';

export const Explorer = () => {
  return (
    <Container>
      <Input placeholder="Enter username" />
      <Button>Search</Button>
      <div>Showing users for "Exampleuser"</div>
      <InfoBox />
    </Container>
  );
};
