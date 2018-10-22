import React, { Component } from 'react'
import { graphql } from 'react-apollo';
import {Link } from 'react-router';
import fetchSong from '../queries/fetchSong';

 class SongDetail extends Component {

    // componentDidMount() {
    //     this.props.mutate({
    //         variables: {
    //             id: this.props.param.id
    //         },
    //         refetchQueries: [{ query: fetchSong }]
    //     })
    //     // .then(() => { 
    //     //     hashHistory.push('/')
    //     // })
    // }

  render() {
    const { song } = this.props.data;

    return (
      <div>
        <Link to='/'>Back</Link>
        <h3>Detail </h3>
        <p>{song && song.title || 'Loading'} </p>
      </div>
    )
  }
}

export default graphql(fetchSong, {
    options: (props) => { return { variables: { id: props.params.id } } }
})(SongDetail);