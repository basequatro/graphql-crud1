import React, { Component } from "react";
import { Link } from "react-router";
// doesn't execute a query, only defines
import gql from "graphql-tag";
import { graphql } from "react-apollo";

// queries
import query from "../queries/fetchSongs";

class SongList extends Component {
  onSongDelete(id) {
    // alternative to refetching queries used in SongCreate
    //this.props.data is added by graphql from react-apollo
    // .refetch will execute any queries associated with the SongList component
    //  Why use this instead of the refetchQueries option in SongCreate?
    //  use refetchQueries option when calling a query that is not associated with the component.  In SongCreate, query was not included in the export default
    // .refetch is great because it clears out any existing fetch data
    this.props
      .mutate({
        variables: {
          id
        }
      })
      .then(() => this.props.data.refetch());
  }

  renderSongs() {
    return this.props.data.songs.map(({ id, title }) => (
      <li className="collection-item" key={id}>
        <Link to={`/songs/${id}`}>{title}</Link>
        <i className="material-icons" onClick={() => this.onSongDelete(id)}>
          delete
        </i>
      </li>
    ));
  }

  render() {
    if (this.props.data.loading) {
      return <div>Loading....</div>;
    }
    return (
      <div>
        <ul className="collection">{this.renderSongs()}</ul>
        <Link to="songs/new" className="btn-floating btn-large red right">
          <i className="material-icons">add</i>
        </Link>
      </div>
    );
  }
}

const mutation = gql`
  mutation DeleteSong($id: ID) {
    deleteSong(id: $id) {
      id
    }
  }
`;

// bond the query to the component
// Component rendered -> query executed -> ... -> query complete -> Rerender Component
// data is added to PROPS - shows in console.log twice - once without data and then with data from graphql server

//  USING BOTH MUTATIONS AND QUERIES
//make a helper using mutation and graphql, then immediately invoke it with the result of the other helper and SongList
export default graphql(mutation)(graphql(query)(SongList));