import React, { Component } from "react";
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

class LyricList extends Component {
  onLike(id, likes) {
    console.log(id);

    this.props.mutate({
        variables: { id },
        optimisticResponse: {
            __typename: 'Mutation',
            likeLyric: {
                __typename: '[LyricType]',
                id,
                likes: likes + 1
            }
        }
    })
  }

  renderLyrics() {
    return this.props.lyrics.map(({ id, content, likes }) => (
      <li key={id} className="collection-item">
        {content}
        <div className="vote-box">
            <i className="material-icons" onClick={() => this.onLike(id, likes)}>
                thumb_up
            </i>
            {likes}
        </div>
      </li>
    ));
  }

  render() {
    return <ul className="collection">{this.renderLyrics()}</ul>;
  }
}

const mutation = gql`
    mutation LikeLyric($id: ID!) {
        likeLyric(id: $id) {
            id
            likes
        }
    }
`;

export default graphql(mutation)(LyricList);