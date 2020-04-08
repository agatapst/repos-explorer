import React from 'react';
import Container from 'components/Container';
import Input from 'components/Input';
import Button from 'components/Button';
import InfoBox from 'components/InfoBox';

import fetchRepos from 'redux/fetchRepos';

export const Explorer = () => {
  return (
    <Container>
      <Input placeholder="Enter username" />
      <Button onClick={fetchRepos('agatapst')}>Search</Button>
      <div>Showing users for "Exampleuser"</div>
      <InfoBox />
    </Container>
  );
};
