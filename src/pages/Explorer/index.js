import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Container from 'components/Container';
import Input from 'components/Input';
import Button from 'components/Button';
import InfoBox from 'components/InfoBox';
import fetchRepos from 'actions/fetchRepos';

export const Explorer = () => {
  const [username, setUsername] = useState('');
  const dispatch = useDispatch();
  const { repos, pending, error } = useSelector((state) => state.reposReducer);

  const handleClick = () => {
    if (username) {
      dispatch(fetchRepos(username));
    }
  };

  return (
    <Container>
      {error}
      <Input
        value={username}
        onChange={(event) => setUsername(event.target.value)}
        placeholder="Enter username"
      />
      <Button onClick={handleClick}>Search</Button>
      <InfoBox />
      {pending && 'Loading'}
      {repos && repos.length > 0 ? (
        <>
          <div>Showing repositories for "{username}"</div>
          <ul>
            {repos.map(({ id, name, url }) => (
              <li key={id}>
                <a href={url}>{name}</a>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <div>No repositories</div>
      )}
    </Container>
  );
};
