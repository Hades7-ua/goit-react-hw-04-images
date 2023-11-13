import { Component } from 'react';

export class App extends Component {
  state = {
    images: [],
  };
  render() {
    return (
      <div>
        <form></form>
        <div>Gallery</div>
        <button>Load More</button>
      </div>
    );
  }
}
export default App;
