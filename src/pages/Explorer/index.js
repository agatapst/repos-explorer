import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Container from 'components/Container';
import Input from 'components/Input';
import Button from 'components/Button';
import InfoBox from 'components/InfoBox';
import fetchUsers from 'actions/fetchUsers';

import styles from './Explorer.module.scss';

export const Explorer = () => {
  const [username, setUsername] = useState('');
  const dispatch = useDispatch();
  const { users, searchedUsername, pending, error } = useSelector((state) => state.users);

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
        <Button type="submit" title="Search">
          Search
        </Button>
      </form>
      {pending && 'Loading'}
      {users && users.length > 0 ? (
        <>
          <div>Showing repositories for "{searchedUsername}"</div>
          <ul title="Users list" className={styles.usersList}>
            {users.map(({ id, login, repos, reposPending, reposError }) => (
              <InfoBox
                key={id}
                id={id}
                login={login}
                reposPending={reposPending}
                repos={repos}
                reposError={reposError}
              />
            ))}
          </ul>
        </>
      ) : (
        <div>No repositories</div>
      )}
    </Container>
  );
};
