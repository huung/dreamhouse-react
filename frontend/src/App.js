import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Route, Switch } from 'react-router-dom';
import { PrivateRoute } from './private_route';
import 'react-toastify/dist/ReactToastify.css'
import Header from './components/header'
import Sidebar from './components/sidebar'
import Popup from './components/popup'
import Welcome from './containers/Welcome'
import Login from './containers/Login'
import PasswordReset from './containers/PasswordReset'
import AccountConfirmation from './containers/AccountConfirmation'
import Signup from './containers/Signup'
import Properties from './containers/Properties'
import PropertyDetail from './containers/Property'
import Brokers from './containers/Brokers'
import BrokerDetail from './containers/Broker'
import Favorites from './containers/Favorites'
import Approved from './containers/Approved'
import ShopRates from './containers/ShopRates'
import Calculator from './containers/Calculator'
import Profile from './containers/Profile'
import Settings from './containers/Settings'
import NoMatch from './containers/NoMatch'
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

const drawerWidth = 250;
const styles = theme => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0
  }
});

class App extends Component {
  render() {
    const { classes, reduxStore } = this.props;
    return (
      <div className={classes.root}>
        <CssBaseline />
        <Header />
        <Sidebar />
        <Popup />
        <main
          className={classNames(classes.content, {
            [classes.contentShift]: reduxStore.layout.isSidebar,
          })}
          style={{padding: 0, marginTop: 55}}
        >
          <Switch>
            <Route exact path="/" component={Welcome} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/password-reset" component={PasswordReset} />
            <Route path="/confirmation" component={AccountConfirmation} />
            <PrivateRoute exact path="/properties" component={Properties} />
            <PrivateRoute exact path="/property-detail/:id" component={PropertyDetail} />
            <PrivateRoute exact path="/brokers" component={Brokers}/>
            <PrivateRoute exact path="/broker-detail/:id" component={BrokerDetail}/>
            <PrivateRoute exact path="/favorites" component={Favorites}/>
            <PrivateRoute exact path="/approved" component={Approved}/>
            <PrivateRoute exact path="/shop-rates" component={ShopRates}/>
            <PrivateRoute exact path="/calculator" component={Calculator}/>
            <PrivateRoute exact path="/profile" component={Profile}/>
            <PrivateRoute exact path="/settings" component={Settings}/>
            <Route component={NoMatch} />
          </Switch>
        </main>
      </div>
      );
    }
  }

const mapStateToProps = (state) => {
  return {
      reduxStore: {
          layout: state.layout,
          alert: state.alert,
          properties: state.properties,
          brokers: state.brokers,
          favorites: state.brokers,
          auth: state.auth
      }
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({}, dispatch)
}

export default withStyles(styles, {withTheme: true})(connect(mapStateToProps, mapDispatchToProps)(App));