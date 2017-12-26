import React, { Component } from 'react';
//import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Github from './Components/Github';
import Header from './Components/Header';
import Auth0Lock from 'auth0-lock';


class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      idToken: '',
      profile: {}
    };
  }
  static defaultProps = {
    clientID: '7JS3C5N9xVd6eu2ca5lPB2zFtIea11yg',
    domain: 'abhinavjain.auth0.com'
  }
  componentWillMount(){
    this.lock = new  Auth0Lock(this.props.clientID, this.props.domain);

    this.lock.on('authenticated', (authResult) =>{
      //console.log(authResult);

      this.lock.getProfile(authResult.idToken,(error,profile)=>{
        if(error){
          console.log(error);
          return;
        }
        //console.log(profile);

        this.setProfile(authResult.idToken,profile);
      });
    });
    this.getProfile();
  }

  getProfile(){
    if(localStorage.getItem('idToken') != null){
      this.setState({
        idToken: localStorage.getItem('idToken'),
        profile: JSON.parse(localStorage.getItem('profile'))
      }, () => {
        //console.log(this.state);
      });
    }
  }


  setProfile(idToken, profile){
    localStorage.setItem('idToken', idToken);
    localStorage.setItem('profile', JSON.stringify(profile));

    this.setState({
      idToken: localStorage.getItem('idToken'),
      profile: JSON.parse(localStorage.getItem('profile'))
    });
  }
  showLock(){
    this.lock.show();
  }
  logout(){
    this.setState({
      idToken: '',
      profile: {}
    }, () =>{
      localStorage.removeItem('idToken');
      localStorage.removeItem('profile');
    });

  }

  render() {
    let git;
    if(this.state.idToken){
      git = <Github />
    }else{
      git = "Click on Login to view Github Viewer"
    }
    return (
      <div className="App">
        <Header
          idToken = {this.state.idToken}
          onLogin={this.showLock.bind(this)}
          onLogout={this.logout.bind(this)}
        />
        {git}
      </div>
    );
  }
}

export default App;
