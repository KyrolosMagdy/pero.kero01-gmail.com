import React from 'react';
import Form from './pages/form/form.component';
import NavBar from './components/nav-bar/nav-bar.component';
import HomePage from './pages/home-page/home-page.container';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      route: 'home'
    }
  }

  onRouteChange = () => {
    this.setState({
      route: 'home'
    })
  }

  render() {
    return (
      <div >
        <NavBar currentRoute={this.state.route} />
        {
          this.state.route === 'signin' ?
            <div>
              <Form onRouteChange={this.onRouteChange} />
            </div> :
            //supposed to have home-page here
            <HomePage />
        }
      </div>
    )
  }
}

export default App;
