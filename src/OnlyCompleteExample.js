import React, { Component } from 'react';
import { LoadButton } from "./LoadButton";
import { connect } from 'react-redux';
import { getSomething } from "./someService";

class OnlyCompleteExampleComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false
    };

    this.doRequest = this.doRequest.bind(this);
  }

  async doRequest(input) {
    try {
      this.setState({loading: true});
      const result = await getSomething(input);
      this.props.getSomethingComplete(result);
      this.setState({loading: false});
      console.log('Now react on success, trigger route transition or whatever.');
    } catch (e) {
      this.setState({loading: false});
      this.props.getSomethingFailed(e);
      console.log('Now react on error, trigger route transition or whatever.');
    }
  }

  render() {
    return (
      <LoadButton
        onClickAction={this.doRequest}
        loading={this.state.loading}
        result={this.props.item}
        error={this.props.error}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    item: state.item,
    error: state.error
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getSomethingComplete: item => dispatch({type: 'SOMETHING_SUCCESS', payload: item}),
    getSomethingFailed: error => dispatch({type: 'SOMETHING_FAILED', error: error})
  };
}

export const OnlyCompleteExample = connect(mapStateToProps, mapDispatchToProps)(OnlyCompleteExampleComponent);