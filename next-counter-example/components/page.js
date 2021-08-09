import { Component } from "react";
import { Provider } from "react-redux";
import store from "../store/configureStore";
import Counter from "./counter";

class Page extends Component {
  render() {
    return (
      <Provider store={store}>
        <Counter />
      </Provider>
    );
  }
}

export default Page;
