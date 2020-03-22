import React from 'react';
import Form from './pages/form/form.component';
import NavBar from './components/nav-bar/nav-bar.component';
import HomePage from './pages/home-page/home-page.container';
import SignIn from './pages/signin-form/signin-form.page';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      route: 'home'
    }
  }

  onRouteChange = (route) => {
    this.setState({
      route:route
    })
  }

  render() {
    return (
      <div >
        <NavBar currentRoute={this.state.route} onRouteChange={this.onRouteChange}/>
        {
          this.state.route === 'home' ?
          <HomePage /> : (
            this.state.route === 'signin' ? <SignIn onRouteChange={this.onRouteChange} />:
              <Form onRouteChange={this.onRouteChange} />
          )
            //supposed to have home-page here
            
        }
      </div>
    )
  }
}

export default App;
