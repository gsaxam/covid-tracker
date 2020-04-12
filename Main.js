import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, ImageBackground } from 'react-native';
import axios from 'axios';
const { width, height } = Dimensions.get('window');

const background = require('./images/login1_bg.png');
const mark = require('./images/login1_mark.png');
const deathsIcon = require('./images/deaths.png');
const casesIcon = require('./images/cases.png');
const peopleTestedIcon = require('./images/people-tested.png');
const hospitalizedIcon = require('./images/hospitalized.png');
const countiesIcon = require('./images/counties.png');

class Main extends Component {
  state = { covidData: {} };

  covidURL = 'https://covid19.colorado.gov/case-data';
  scrapeDataBegin = 'Note: This summary only includes data through';
  scrapeDataEnd = 'outbreaks at residential and non-hospital health care facilities</p>';

  componentDidMount() {
    axios.get(this.covidURL).then((res) => {
      const data1 = res.data;
      var data = data1.substring(
        data1.lastIndexOf(this.scrapeDataBegin) + 1,
        data1.lastIndexOf(this.scrapeDataEnd)
      );
      data = data.replace(/(<([^>]+)>)/gi, ''); // remove all html tags.
      data = data.replace(/[a-z]/g, ''); // remove all letters.
      data = data.toString().split('\n'); // split string on new line characters.
      data.splice(0, 2); // remove first to elements of the array.

      const covidData = {
        cases: data[0].replace(/\D/g, ''), // remove all non numeric characters.
        hospitalized: data[1].replace(/\D/g, ''),
        counties: data[2].replace(/\D/g, ''),
        peopleTested: data[3].replace(/\D/g, ''),
        deaths: data[4].replace(/\D/g, ''),
        outbreaks: data[5].replace(/\D/g, ''),
      };
      console.log(covidData);
      this.setState({ covidData }); // data is ready.
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground source={background} style={styles.background} resizeMode="cover">
          <View style={styles.markWrap}>
            <Image source={mark} style={styles.mark} resizeMode="contain" />
          </View>
          <View style={styles.wrapper}>
            <View style={styles.inputWrap}>
              <View style={styles.iconWrap}>
                <Image source={casesIcon} style={styles.icon} resizeMode="contain" />
              </View>
              <Text placeholder="Cases" placeholderTextColor="#FFF" style={styles.input}>
                Cases: <Text style={styles.value}>{this.state['covidData']['cases']}</Text>
              </Text>
            </View>
            <View style={styles.inputWrap}>
              <View style={styles.iconWrap}>
                <Image source={countiesIcon} style={styles.icon} resizeMode="contain" />
              </View>
              <Text placeholder="Cases" placeholderTextColor="#FFF" style={styles.input}>
                Counties: <Text style={styles.value}>{this.state['covidData']['counties']}</Text>
              </Text>
            </View>
            <View style={styles.inputWrap}>
              <View style={styles.iconWrap}>
                <Image source={deathsIcon} style={styles.icon} resizeMode="contain" />
              </View>
              <Text placeholder="Cases" placeholderTextColor="#FFF" style={styles.input}>
                Deaths: <Text style={styles.value}>{this.state['covidData']['deaths']}</Text>
              </Text>
            </View>
            <View style={styles.inputWrap}>
              <View style={styles.iconWrap}>
                <Image source={hospitalizedIcon} style={styles.icon} resizeMode="contain" />
              </View>
              <Text placeholder="Cases" placeholderTextColor="#FFF" style={styles.input}>
                Hospitalized:{' '}
                <Text style={styles.value}>{this.state['covidData']['hospitalized']}</Text>
              </Text>
            </View>
            <View style={styles.inputWrap}>
              <View style={styles.iconWrap}>
                <Image source={peopleTestedIcon} style={styles.icon} resizeMode="contain" />
              </View>
              <Text placeholder="Cases" placeholderTextColor="#FFF" style={styles.input}>
                People Tested:{' '}
                <Text style={styles.value}>{this.state['covidData']['peopleTested']}</Text>
              </Text>
            </View>
          </View>
          <View style={styles.container}>
            <View style={styles.signupWrap}>
              <Text style={styles.accountText}>COVID-19 Colorado Statistics. Built by GSAXAM.</Text>
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  markWrap: {
    flex: 1,
    paddingVertical: 10,
  },
  mark: {
    width: null,
    height: null,
    flex: 1,
  },
  background: {
    width,
    height,
  },
  wrapper: {
    paddingVertical: 30,
  },
  inputWrap: {
    flexDirection: 'row',
    marginVertical: 15,
    height: 40,
  },
  iconWrap: {
    paddingHorizontal: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    height: 50,
    width: 50,
  },
  input: {
    flex: 1,
    paddingHorizontal: 10,
    color: '#fff',
    fontSize: 30,
  },
  value: {
    flex: 1,
    paddingHorizontal: 10,
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#FF3366',
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
  },
  forgotPasswordText: {
    color: '#D8D8D8',
    backgroundColor: 'transparent',
    textAlign: 'right',
    paddingRight: 15,
  },
  signupWrap: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  accountText: {
    color: '#D8D8D8',
  },
  signupLinkText: {
    color: '#FFF',
    marginLeft: 5,
  },
  numbers: {
    fontSize: 30,
  },
  label: {
    textAlign: 'left',
  },
});

export default Main;
