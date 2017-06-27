import React, { Component } from 'react';
import { LoadButton } from "./LoadButton";
import { connect } from 'react-redux';

class StoreStateExampleComponent extends Component {
  constructor(props) {
    super(props);

    this.doRequest = this.doRequest.bind(this);
  }

  doRequest(input) {
    this.props.getSomething(input);
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.success && nextProps.success) {
      console.log('Now react on success, trigger route transition or whatever.');
    }

    if (!this.props.error && nextProps.error) {
      console.log('Now react on error, trigger route transition or whatever.');
    }
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
    loading: state.loading,
    success: state.success
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getSomething: input => dispatch({type: 'SOMETHING_REQUESTED', id: input})
  };
}

export const StoreStateExample = connect(mapStateToProps, mapDispatchToProps)(StoreStateExampleComponent);