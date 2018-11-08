import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const ADD_COMMENT = gql`
  mutation AddComment($listID: String!, $value: String!) {
    addComment(listID: $listID, value: $value) {
      id
      value
    }
  }
`;

const AddComment = ({ listID }) => {
  let input;

  return (
    <Mutation mutation={ADD_COMMENT} refetchQueries={['Comments']}>
      {(addComment, { data }) => (
        <div>
          <form
            onSubmit={e => {
              e.preventDefault();
              addComment({ variables: { listID, value: input.value } });
              input.value = '';
            }}
          >
            <input
              ref={node => {
                input = node;
              }}
            />
            <button type="submit">Add Comment</button>
          </form>
        </div>
      )}
    </Mutation>
  );
};

export default AddComment;
