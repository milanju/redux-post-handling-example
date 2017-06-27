import React, { Component } from 'react';
import { LoadButton } from "./LoadButton";
import { connect } from 'react-redux';
import { watchNext } from "./watchNext";

class OneTimeSagaExampleComponent extends Component {
  constructor(props) {
    super(props);

    this.doRequest = this.doRequest.bind(this);
  }

  doRequest(input) {
    watchNext({
      'SOMETHING_SUCCESS': action => console.log('Now react on success, trigger route transition or whatever.'),
      'SOMETHING_FAILED': action => console.log('Now react on error, trigger route transition or whatever.')
    });

    this.props.getSomething(input);
  }

  render() {
    return (
      <LoadButton
        onClickAction={this.doRequest}
        loading={this.props.loading}
        result={this.props.item}
        error={this.props.error}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    item: state.item,
    error: state.error,
    loading: state.loading
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getSomething: input => dispatch({type: 'SOMETHING_REQUESTED', id: input})
  };
}

export const OneTimeSagaExample = connect(mapStateToProps, mapDispatchToProps)(OneTimeSagaExampleComponent);