import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Container from 'components/Container';
import Input from 'components/Input';
import Button from 'components/Button';
import InfoBox from 'components/InfoBox';
import fetchUsers from 'actions/fetchUsers';

export const Explorer = () => {
  const [username, setUsername] = useState('');
  const dispatch = useDispatch();
  const { users, pending, error } = useSelector((state) => state.users);

  const handleSearch = (e) => {
    e.preventDefault();
    if (username) {
      dispatch(fetchUsers(username));
    }
  };

  return (
    <Container>
      {error}
      <form onSubmit={handleSearch}>
        <Input
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          placeholder="Enter username"
        />
        <Button type="submit">Search</Button>
      </form>
      <InfoBox />
      {pending && 'Loading'}
      {users && users.length > 0 ? (
        <>
          <div>Showing repositories for "{username}"</div>
          <ul>
            {users.map(({ id, login, repos, reposPending, reposError }) => (
              <li key={id}>
                <div>{login}</div>
                <div>{reposPending && 'Loading'}</div>
                <div>{repos && repos.length}</div>
                <div>{reposError && reposError.message}</div>
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
