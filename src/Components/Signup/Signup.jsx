import React, { Component } from 'react';

import { connect } from 'react-redux';
import { loginRequest, signupRequest } from '../Actions/auth-actions';

import styles from './Styles/SignUpScreenStyles';

class SignUpScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstTime: false,
      UsernameinputSuccess: false,
      UsernameinputError: true,
      UsernameError: '',
      EmailinputSuccess: false,
      EmailinputError: true,
      EmailError: '',
      PasswordinputSuccess: false,
      PasswordinputError: true,
      PasswordError: '',
      email: '',
      username: '',
      password: '',
      error: '',
      loading: false,
      loggedIn: false,
      passwordValidation: 'nope',
    };
  }

  // ********* The next many lines handles the Signup.. *********

  onButtonPress() {
    const { email, password, username } = this.state;
    this.setState({ error: '', loading: true });
    console.log(this.state.EmailError);
    if (this.state.EmailError !== null || this.state.EmailError == '') {
      console.log(this.state.EmailError);
      console.log('Whoops error or empty string');
    } else {
      console.log('NOW FIRING SIGNUP REQUEST');
      this.setState({ loading: false });
      this.props.signupRequest(email, password, username);
    }
  }

  handleUsernameChange(usernameText) {
    const reg = /^[a-zA-Z0-9_-]{3,15}$/;

    this.setState({ username: usernameText });
    console.log(reg.test(usernameText));
    if (reg.test(usernameText) == true && usernameText.length > 1) {
      this.setState({ UsernameinputError: false, UsernameinputSuccess: true });
    } else {
      this.setState({ UsernameinputError: true, UsernameinputSuccess: false });
    }
  }

  handlePasswordChange(passwordText) {
    const reg = /^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8,24}$/;

    this.setState({ password: passwordText });
    if (reg.test(passwordText) == true && this.state.password.length > 1) {
      this.setState({ PasswordinputError: false, PasswordinputSuccess: true });
    } else {
      this.setState({ PasswordinputError: true, PasswordinputSuccess: false });
    }
  }

  handleEmailChange(emailText) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    this.setState({ email: emailText });
    if (re.test(emailText) == true && this.state.email.length > 1) {
      this.setState({
        EmailinputError: false,
        EmailinputSuccess: true,
        EmailError: null,
      });
    } else {
      this.setState({
        EmailinputError: true,
        EmailinputSuccess: false,
        EmailError: "Whoops, that email won't work",
      });
    }
  }

  onLoginFail() {
    this.setState({ error: 'Authentication Failed', loading: false });
    alert('Whoops, thats not the correct information!');
  }

  onLoginSuccess() {
    this.setState({
      email: '',
      password: '',
      loading: false,
      username: '',
      error: '',
      EmailError: '',
    });
    alert('You got signed in yolo!');
  }

  renderButton() {
    // if (this.state.loading) {
    //     return <Spinner size="small" />;
    // }

    return (
      <Button
        style={{ backgroundColor: '#757575', margin: 5 }}
        block
        bordered
        onPress={this.onButtonPress.bind(this)}
      >
        <Text>Sign Up</Text>
      </Button>
    );
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.mainContainer}>
        <Image
          source={Images.background}
          style={styles.backgroundImage}
          resizeMode="cover"
        />
        <Image source={Images.tools} style={styles.logo} />

        <ScrollView style={styles.container}>
          <Header style={{ shadowOpacity: 0, backgroundColor: 'transparent' }}>
            <Left>
              <Button
                transparent
                onPress={() => this.props.navigation.navigate('LaunchScreen')}
              >
                <Icon name="arrow-back" />
              </Button>
            </Left>
            <Body>
              <Title>
                <Text />
              </Title>
            </Body>
          </Header>
          <Container style={styles.container}>
            <Content>
              <Text style={styles.catchPhrase}>Drop the shop.</Text>

              <Text style={styles.signUp}>
                Sign up for your free account today!
              </Text>
              <Text style={styles.validation}>
                Password be at least 8 characters, two uppercase letter, two
                numbers, one special character
              </Text>
              <Text style={styles.validation}>
                Must be 3-15 characters, no special characters
              </Text>
              <Form style={styles.textInput}>
                <Item
                  success={!!this.state.UsernameinputSuccess}
                  error={!!this.state.UsernameinputError}
                >
                  <Input
                    placeholder="Username"
                    value={this.state.username}
                    onChangeText={text => this.handleUsernameChange(text)}
                  />
                  <Icon name="checkmark-circle" />
                </Item>
                <Item
                  success={!!this.state.EmailinputSuccess}
                  error={!!this.state.EmailinputError}
                >
                  <Input
                    placeholder="Email"
                    value={this.state.email}
                    onChangeText={text => this.handleEmailChange(text)}
                  />
                  <Icon name="checkmark-circle" />
                </Item>

                <Item
                  success={!!this.state.PasswordinputSuccess}
                  error={!!this.state.PasswordinputError}
                  last
                >
                  <Input
                    secureTextEntry
                    value={this.state.password}
                    onChangeText={text => this.handlePasswordChange(text)}
                    placeholder="Password"
                  />
                  <Icon name="checkmark-circle" />
                </Item>
              </Form>
              {this.renderButton()}
            </Content>
          </Container>

          <Text style={styles.errorTextStyle}>{this.state.error}</Text>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  loginRequest: user => dispatch(loginRequest(user)),
  signupRequest: (email, password, username) =>
    dispatch(signupRequest(email, password, username)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUpScreen);
