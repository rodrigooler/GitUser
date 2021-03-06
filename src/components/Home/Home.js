'use strict'

import React, { PureComponent } from 'react'
import { QueryRenderer, graphql } from 'react-relay'

import styled from 'styled-components';

import environment from '../../environment'

import User from '../User/User'

import Header from '../Header/Header'
import Title from '../Title/Title';
import Search  from '../Search/Search';
import SearchButton from '../SearchButton/SearchButton'

import './Home.css';

const query = graphql`
  query HomeQuery ($login: String!) {
    user (login: $login) {
      ... User_user
    }
  }
`;

export default class Home extends PureComponent {
  state = {
    user: null
  };

  onsearch(event) {
    event.preventDefault();
    // if(event.target.querySelector('input[type="text"]').legt)
    const user = event.target.querySelector('input[type="text"]').value;
    this.setState({ user });
  }

  render () {
    const { user } = this.state;
    const variables = { login: user };
    return (
      <div>
        <Header>
          <Title>Search for your github user</Title>
          <form className="form form__search" onSubmit={this.onsearch.bind(this)}>
            <Search name="search" placeholder="Ex.: brunorafael8" type="text" />
            <SearchButton value="Buscar">
              Search
            </SearchButton>
          </form>
        </Header>
        {user &&
          <QueryRenderer
            environment={environment}
            query={query}
            variables={variables}
            render={({ error, props }) => {
              if (error) console.error(new Error(error));

              if (props) {
                return <User user={props.user} />
              } else {
                return <div>Searching for {user}, loading ...</div>
              }
            }}
          />
      }
      </div>
    )
  }
}
