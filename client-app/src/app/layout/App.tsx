import React, { Component } from "react";
import { Header, Icon, List } from "semantic-ui-react";
import axios from "axios";
import { IActivity } from "../models/activity";

interface IState {
  activities: IActivity[];
}

class App extends Component<{}, IState> {
  readonly state: IState = {
    activities: [],
  };

  componentDidMount() {
    //TODO:instead Localhost we use a real domainName
    axios
      .get<IActivity[]>("http://localhost:5000/api/activities")
      .then((response) => {
        //console.log('response.data :>> ', response.data);
        this.setState({
          activities: response.data,
        });
      });
  }

  render() {
    return (
      <div>
        <Header as="h2">
          <Icon name="users" />
          <Header.Content>EventPlus</Header.Content>
        </Header>
        <List>
          {this.state.activities.map((activity) => (
            <List.Item key={activity.id}>{activity.title}</List.Item>
          ))}
        </List>
      </div>
    );
  }
}

export default App;
