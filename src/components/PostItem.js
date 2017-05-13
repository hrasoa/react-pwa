import React, { Component } from 'react';

class PostItem extends Component {
  render() {
    return (
      <div>
        {this.props.title}
      </div>
    );
  }
}

export default PostItem;