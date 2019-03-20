import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { expanseNavbar } from '../redux/actions/layout'
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

const drawerWidth = 250;
const styles = theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  sideLogo: {
    width: '6vw',
    minWidth: 50,
    margin: 'auto'
  },
  subtitle: {
    padding: '10px 15px'
  },
  blackIcon : {
    color: "#000"
  }
})

const HomeItems = [
    {label: 'Welcome', icon: 'bookmark', path: '/'},
    {label: 'Properties', icon: 'home', path: '/properties'},
    {label: 'Brokers', icon: 'people', path: '/brokers'},
    {label: 'Favorites', icon: 'grade', path: '/favorites'},
  ]
const MortagageItems = [
    {label: 'Get Pre-Approved', icon: 'check_box', path: '/approved'},
    {label: 'Shop Rates', icon: 'shopping_cart', path: '/shop-rates', title: 'Shop Rates'},
    {label: 'Mortgage Calculator', icon: 'gradient' , path: '/calculator'},
  ]
const AccountItems = [
    {label: 'Profile', icon: 'person', path: '/profile', title: 'Profile'},
    {label: 'Settings', icon: 'settings', path: '/settings', title: 'Settings'}
  ]

class Sidebar extends Component {

    handleDrawerClose = () => {
        this.props.expanseNavbar(false)
    }

    render() {
        const {classes, theme, reduxStore} = this.props
        return (
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={reduxStore.layout.isSidebar}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <Link to="/" style={{margin: 'auto'}}>
                        <img src={process.env.PUBLIC_URL + '/images/logo.png'} className={classes.sideLogo} alt="LOGO"/>
                    </Link>
                    <IconButton onClick={this.handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </div>
                <Typography className={classes.subtitle}>HOME SEARCH</Typography>
                <Divider />
                <List>
                    {HomeItems.map((item, index) => (
                    <Link key={index} to={item.path} style={{ textDecoration: 'none'}} >
                        <ListItem button>
                        <ListItemIcon>
                            <i className={'material-icons' + classes.blackIcon}>{item.icon}</i>
                        </ListItemIcon>
                        <ListItemText primary={item.label} />
                        </ListItem>
                    </Link>
                    ))}
                </List>
                <Typography className={classes.subtitle}>MORTGAGE</Typography>
                <Divider />
                <List>
                    {MortagageItems.map((item, index) => (
                    <Link key={index} to={item.path} style={{ textDecoration: 'none'}}>
                        <ListItem button>
                        <ListItemIcon>
                          <i className={'material-icons' + classes.blackIcon}>{item.icon}</i>
                        </ListItemIcon>
                        <ListItemText primary={item.label} />
                        </ListItem>
                    </Link>
                    ))}
                </List>
                <Typography className={classes.subtitle}>ACCOUNT</Typography>
                <Divider />
                <List>
                    {AccountItems.map((item, index) => (
                    <Link key={index} to={item.path} style={{ textDecoration: 'none'}}>
                        <ListItem button>
                        <ListItemIcon>
                            <i className={'material-icons' + classes.blackIcon}>{item.icon}</i>
                        </ListItemIcon>
                        <ListItemText primary={item.label} />
                        </ListItem>
                    </Link>
                    ))}
                </List>
            </Drawer>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        reduxStore: {
            layout: state.layout,
            auth: state.auth
        }
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({expanseNavbar}, dispatch)
}

export default withStyles(styles, {withTheme: true})(connect(mapStateToProps, mapDispatchToProps)(Sidebar));
