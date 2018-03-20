import React, { Component } from 'react';
import { Grid, Header, Input, Button } from 'semantic-ui-react';
import axios from 'axios';
import Tweets from './Tweets';

class App extends Component {
  state = { 
    tweets: [], 
    visible: [], 
    search: '',
    tweet: '', 
  }

  updateTweet = (e) => {
    this.setState({ tweet: e.target.value })
  }

  postTweet = () => {
    const { tweet, visible } = this.state;
    if (tweet) {
      axios.post('/api/tweets', { tweet })
        .then( res => {
          this.setState({ 
            visible: [res.data, ...visible],
            tweet: ''})
        })
    }
  }

  componentDidMount() {
    axios.get('/api/tweets')
      .then( res => this.setState({ 
        tweets: res.data, visible: res.data 
      }) 
    )
  }

  handleChange = (e) => {
    this.setState({ search: e.target.value}, () => {
      this.updateVisible()
    })
  }

  updateVisible = () => {
    const { search, tweets } = this.state;
    if (search.length === 0)
      this.setState({ visible: tweets })
    else if (search.length > 3) {
      axios.get(`/api/search?term=${search}`)
        .then( res => this.setState({ visible: res.data }) )
    }
  }

  render() {
    return (
      <Grid>
        <Grid.Row>
          <Grid.Column
            mobile={16}
            tablet={16}
            computer={4}
          >
            <Header as="h2" textAlign="center">Search</Header>
            <Input
              value={this.state.search}
              onChange={this.handleChange}
              icon={{ name: 'search', circular: true }}
              placeholder="Search..."
            />
            <hr />
            <Header as="h2" textAlign="center">
              Tweet Something!
            </Header>
            <Input
              value={this.state.tweet}
              onChange={this.updateTweet}
            />
            <Button onClick={this.postTweet}>Tweet!</Button>
          </Grid.Column>
          <Grid.Column
            mobile={16}
            tablet={16}
            computer={12}
          >
            <Tweets tweets={this.state.visible} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default App;