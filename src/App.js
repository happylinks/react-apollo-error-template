import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import AddComment from './AddComment';

const GET_COMMENTS = gql`
  query Comments($id: String!) {
    comments(id: $id) {
      id
      value
    }
  }
`;

class App extends Component {
  constructor() {
    super();
    this.state = {
      activeListID: 'list1',
    };
  }
  render() {
    return (
      <main>
        <header>
          <h1>RefetchQueries Error?</h1>
          <p>
            When there's two active queries in Apollo with the same name,
            refetchQueries will only refetch the first query that is called.
          </p>
          <p>
            <strong>Steps to reproduce</strong>
          </p>
          <ul>
            <li>Add a comment with list 1 being active in the select.</li>
            <li>See list 1 being refetched.</li>
            <li>Select list 2 in the select.</li>
            <li>Add a comment in list 2.</li>
            <li>See list 1 being refetched and rendered, not list 2.</li>
          </ul>
          <em>
            fetchPolicy is set to "network-only", not sure if that can have an
            impact.
          </em>
        </header>
        <h2>Active list</h2>
        <select
          onChange={event =>
            this.setState({ activeListID: event.target.value })
          }
        >
          <option value="list1">List 1</option>
          <option value="list2">List 2</option>
        </select>
        <h2> Comment List </h2>
        <p> ActiveListID: {this.state.activeListID} </p>
        <Query
          query={GET_COMMENTS}
          variables={{ id: this.state.activeListID }}
          fetchPolicy="network-only"
        >
          {({ loading, error, data }) => {
            if (loading) return 'Loading...';
            if (error) return `Error! ${error.message}`;

            return (
              <ul>
                {data.comments.map(comment => (
                  <li key={comment.id}>{comment.value}</li>
                ))}
              </ul>
            );
          }}
        </Query>
        <AddComment listID={this.state.activeListID} />
      </main>
    );
  }
}

export default App;
