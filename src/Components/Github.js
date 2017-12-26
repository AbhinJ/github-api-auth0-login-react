import React , { Component } from 'react';
import Profile from './profile';
import Search from './search';


const API ='https://api.github.com/users'
export default class Github extends Component {


  constructor(props){
    super(props);

    this.state = {
      username: 'ajain17102056',
      name: '',
      avatar: '',
      repos: '',
      followers: '',
      following: '',
      homeURL: '',
      notFound: ''
    };
  }
  getProfile(username){
    let finalURL = `${API}/${username}`;

    fetch(finalURL)
    .then((res) => res.json() )
    .then((data) => {
      this.setState({
        username: data.login,
        name: data.name,
        avatar: data.avatar_url,
        repos: data.public_repos,
        followers: data.followers,
        following: data.following,
        homeURL: data.html_url,
        notFound: data.message
      })
      //console.log(data);
    })
    .catch((error) => console.log("There was a problem in fetching data"))
  }
  componentDidMount(){
    this.getProfile(this.state.username);
  }

  render(){
    return(
      <div>
        <section id="card">
          <Search searchProfile={this.getProfile.bind(this)} />
          <Profile userData={this.state} />
        </section>
      </div>
    );
  }
}
