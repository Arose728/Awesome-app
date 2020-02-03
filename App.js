import React from 'react';
import { FlatList, ActivityIndicator, Text, View  } from 'react-native';

export default class FetchExample extends React.Component {

  constructor(props){
    super(props);
    this.state ={ isLoading: true}
  }

  componentDidMount(){
    return fetch('https://jsonplaceholder.typicode.com/photos')
        .then((response) => response.json())
        .then((responseJson) => {

          this.setState({
            isLoading: false,
            dataSource: responseJson,
          }, function(){
          });

        })
        .catch((error) =>{
          console.error(error);
        });
  }



  render(){

    if(this.state.isLoading){
      return(
          <View style={{flex: 1, padding: 200}}>
            <ActivityIndicator/>
          </View>
      )
    }

    return(
        <View style={{flex: 1, paddingTop:100}}>
          {/*<ActivityIndicator size="large" color="#0000ff" />*/}
          <FlatList
              data={this.state.dataSource}
              renderItem={({item}) => <Text>{item.url}</Text>}
              keyExtractor={({id}, index) => id}
          />
        </View>
    );
  }
}
