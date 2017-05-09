import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import ContestPreview from './ContestPreview';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageHeader: 'Naming Contests',
      contests: this.props.initialContests
    };
  }

  render() {
    return (
      <div className="App">
        <Header message={this.state.pageHeader} />
        <div>
          {this.state.contests.map(contest =>
            <ContestPreview key={contest.id} {...contest} />
          )}
        </div>
      </div>
    );
  }
}

App.propTypes = {
  initialContests: PropTypes.array
};

export default App;
