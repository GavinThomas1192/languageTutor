import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';
import purple from 'material-ui/colors/purple';
import red from 'material-ui/colors/red';
import Button from 'material-ui/Button';
import SendIcon from 'material-ui-icons/Send';
import { CircularProgress } from 'material-ui/Progress';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
  },
  inputLabelFocused: {
    color: '#42d1a8',
    fontSize: '24px',
  },

  inputInkbar: {
    '&:after': {
      backgroundColor: '#42d1a8',
    },
  },
  ErrorInputLabelFocused: {
    color: red[500],
    fontSize: '24px',
  },
  ErrorInputInkbar: {
    '&:after': {
      backgroundColor: red[500],
    },
  },
  textFieldRoot: {
    padding: 0,
    'label + &': {
      marginTop: theme.spacing.unit * 3,
    },
  },
  textFieldInput: {
    borderRadius: 4,
    backgroundColor: theme.palette.common.white,
    border: '1px solid #ced4da',
    fontSize: 18,
    padding: '10px 12px',
    width: 'calc(100% - 24px)',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:focus': {
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
  textFieldFormLabel: {
    fontSize: 24,
  },
});

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      email: '',
      emailError: false,
      usernameError: false,
      passwordError: false,
      errors: false,
      loading: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {}
  handleInputChange = name => (event) => {
    this.setState(
      {
        [name]: event.target.value,
      },
      () => {
        // %%%%%%%%%%%%%%%%%%% username VALIDATION %%%%%%%%%%%%%%%%%%%
        // let regUsername = /^[a-zA-Z0-9_-]{4,15}$/
        {
          this.state.username.length < 3
            ? this.setState({ usernameError: true })
            : this.setState({ usernameError: false });
        }
        // %%%%%%%%%%%%%%%%%%% passworD VALIDATION %%%%%%%%%%%%%%%%%%%

        const regPassword = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
        {
          regPassword.test(this.state.password) !== true &&
          this.state.password !== ''
            ? this.setState({ passwordError: true })
            : this.setState({ passwordError: false });
        }
        // %%%%%%%%%%%%%%%%%%% email VALIDATION %%%%%%%%%%%%%%%%%%%
        const regEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        {
          regEmail.test(this.state.email) !== true && this.state.email !== ''
            ? this.setState({ emailError: true })
            : this.setState({ emailError: false });
        }
        // %%%%%%%%%%%%%%%%%%% species VALIDATION %%%%%%%%%%%%%%%%%%%
      },
    );
  };

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ loading: true });
    // this.props
    //   .onComplete(this.state)
    //   .then(() => {
    //     {
    //       this.props.userFetchRequest
    //         ? this.props.userFetchRequest().then(() => {
    //           this.setState({ loading: false });
    //           window.location.href = '/home';
    //         })
    //         : (window.location.href = '/');
    //     }
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //     this.setState({ error, loading: false });
    //   });
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        {this.state.usernameError ? (
          <FormControl>
            <InputLabel
              FormControlClasses={{
                focused: classes.ErrorInputLabelFocused,
              }}
              htmlFor="Username"
            >
              Username
            </InputLabel>
            <Input
              style={{ fontSize: '18px' }}
              onChange={this.handleInputChange('username')}
              error={this.state.errors}
              value={this.state.username}
              classes={{
                inkbar: classes.ErrorInputInkbar,
              }}
              id="Username"
            />
          </FormControl>
        ) : (
          <FormControl>
            <InputLabel
              FormControlClasses={{
                focused: classes.inputLabelFocused,
              }}
              htmlFor="Username"
            >
              Username
            </InputLabel>
            <Input
              style={{ fontSize: '18px' }}
              onChange={this.handleInputChange('username')}
              error={this.state.errors}
              value={this.state.username}
              classes={{
                inkbar: classes.inputInkbar,
              }}
              id="Username"
            />
          </FormControl>
        )}

        <br />
        {this.state.passwordError ? (
          <FormControl className={classes.formControl}>
            <InputLabel
              style={{ paddingLeft: '13em' }}
              FormControlClasses={{
                focused: classes.ErrorInputLabelFocused,
              }}
              htmlFor="Password"
            >
              At least 6 characters. Two numbers. One Special Character.
            </InputLabel>
            <Input
              style={{ fontSize: '18px' }}
              onChange={this.handleInputChange('password')}
              // error={this.state.errors}
              value={this.state.password}
              classes={{
                inkbar: classes.ErrorInputInkbar,
              }}
              id="Password"
            />
          </FormControl>
        ) : (
          <FormControl className={classes.formControl}>
            <InputLabel
              FormControlClasses={{
                focused: classes.inputLabelFocused,
              }}
              htmlFor="Password"
            >
              Password
            </InputLabel>
            <Input
              type="password"
              style={{ fontSize: '18px' }}
              onChange={this.handleInputChange('password')}
              error={this.state.errors}
              value={this.state.password}
              classes={{
                inkbar: classes.inputInkbar,
              }}
              id="Password"
            />
          </FormControl>
        )}

        <br />
        {this.state.emailError ? (
          <FormControl className={classes.formControl}>
            <InputLabel
              FormControlClasses={{
                focused: classes.ErrorInputLabelFocused,
              }}
              htmlFor="Email"
            >
              Email
            </InputLabel>
            <Input
              style={{ fontSize: '18px' }}
              onChange={this.handleInputChange('email')}
              error={this.state.emailError}
              value={this.state.email}
              classes={{
                inkbar: classes.ErrorInputInkbar,
              }}
              id="Email"
            />
          </FormControl>
        ) : (
          <FormControl className={classes.formControl}>
            <InputLabel
              FormControlClasses={{
                focused: classes.inputLabelFocused,
              }}
              htmlFor="Email"
            >
              Email
            </InputLabel>
            <Input
              style={{ fontSize: '18px' }}
              onChange={this.handleInputChange('email')}
              error={this.state.emailError}
              value={this.state.email}
              classes={{
                inkbar: classes.inputInkbar,
              }}
              id="Email"
            />
          </FormControl>
        )}

        <br />
        {this.state.speciesError ? (
          <FormControl className={classes.formControl}>
            <InputLabel
              style={{ paddingLeft: '10em' }}
              FormControlClasses={{
                focused: classes.ErrorInputLabelFocused,
              }}
              htmlFor="Species"
            >
              While we support free speech. Please keep it clean.
            </InputLabel>
            <Input
              onChange={this.handleInputChange('species')}
              error={this.state.errors}
              value={this.state.species}
              classes={{
                inkbar: classes.ErrorInputInkbar,
              }}
              id="Species"
            />
          </FormControl>
        ) : (
          <FormControl className={classes.formControl}>
            <InputLabel
              FormControlClasses={{
                focused: classes.inputLabelFocused,
              }}
              htmlFor="Species"
            >
              Species
            </InputLabel>
            <Input
              style={{ fontSize: '18px' }}
              onChange={this.handleInputChange('species')}
              error={this.state.errors}
              value={this.state.species}
              classes={{
                inkbar: classes.inputInkbar,
              }}
              id="Species"
            />
          </FormControl>
        )}
        <br />

        <Button
          onClick={this.handleSubmit}
          raised
          style={{ backgroundColor: '#42d1a8', color: '#FAFAFA' }}
        >
          <SendIcon />
        </Button>
        <br />
        {this.state.loading ? (
          <CircularProgress style={{ color: purple[500] }} thickness={7} />
        ) : (
          undefined
        )}
      </div>
    );
  }
}

Signup.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Signup);
