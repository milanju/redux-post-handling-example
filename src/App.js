import React, { Component } from 'react';
import { OnlyCompleteExample } from "./OnlyCompleteExample";
import { store } from "./store";
import { Provider } from "react-redux";
import { StoreStateExample } from "./StoreStateExample";
import { OneTimeSagaExample } from "./OneTimeSagaExample";

class App extends Component {
  routes = {
    'only-complete': <OnlyCompleteExample/>,
    'one-time-saga': <OneTimeSagaExample/>,
    'store-state': <StoreStateExample/>
  }

  constructor(props) {
    super(props);

    this.state = {route: 'only-complete'};
  }

  render() {
    const body = this.routes[this.state.route];

    return (
      <Provider store={store}>
        <div>
          <ul>
            <li><button onClick={() => this.setState({route: 'only-complete'})}>Only Complete Example</button></li>
            <li><button onClick={() => this.setState({route: 'one-time-saga'})}>One Time Saga Example</button></li>
            <li><button onClick={() => this.setState({route: 'store-state'})}>Store State Example</button></li>
          </ul>
          {body}
        </div>
      </Provider>
    );
  }
}

export default App;
