import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { changeTitle } from '../redux/actions/layout'
import { findPropertyById } from '../redux/actions/properties'
import { addFavoriteById } from '../redux/actions/favorites'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Dialog from '@material-ui/core/Dialog';
import 'react-toastify/dist/ReactToastify.css'

const styles = {
    media: {
      objectFit: 'cover',
    }
};
const shareItems = ['Text', 'Email', 'Facebook', 'Twitter']

class SimpleDialog extends React.Component {
    handleClose = () => {
      this.props.onClose(this.props.selectedValue);
    };

    handleListItemClick = value => {
      this.props.onClose(value);
    };

    render() {
      const { classes, onClose, selectedValue, ...other } = this.props;

      return (
        <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" {...other}>
          <div>
            <List>
              {shareItems.map((shareItem, key) => (
                <ListItem button onClick={() => this.handleListItemClick(shareItem)} key={key}  style={{textAlign: 'center', minWidth: 300}}>
                  <ListItemText primary={shareItem} />
                </ListItem>
              ))}
            </List>
          </div>
        </Dialog>
      );
    }
  }

SimpleDialog.propTypes = {
    classes: PropTypes.object.isRequired,
    onClose: PropTypes.func,
    selectedValue: PropTypes.string,
};
const SimpleDialogWrapped = withStyles(styles)(SimpleDialog)
class Property extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: 'Property',
            open: false,
            selectedValue: shareItems[1],
        }
    };

    componentWillMount() {
        this.props.changeTitle(this.state.title)
        this.props.findPropertyById(this.props.match.params.id)
    }

    handleModalClose = (value) => {
      this.setState({selectedValue: value, open: false})
    };

    handleModalOpen = () => {
        this.setState({open: true})
    }

    showBrokerHandle = (id) => {
        this.props.history.push('/broker-detail/' + id);
    }

    favoriteHandle() {
        console.log(this.props.reduxStore.auth)
        let data = {'property__c': this.props.reduxStore.property.property.sfid, 'user__id': this.props.reduxStore.auth.user.id};
        this.props.addFavoriteById(data)
    }

    likeHandle() {
        let property = this.state.property
        property.likes += 1

    }

    shareHandle() {
        this.handleModalOpen()
    }

    // FormatPrice(op) {
    //   let fp = op.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    //   return fp
    // }

    render() {
        const { classes, reduxStore } = this.props
        const property = reduxStore.property.property
        return (
            <div>
                <SimpleDialogWrapped
                    selectedValue = {this.state.selectedValue}
                    open={this.state.open}
                    onClose={this.handleModalClose}
                />
                {property ?
                    <Card>
                    <CardActionArea>
                        <CardMedia
                        component="img"
                        alt="Contemplative Reptile"
                        className={classes.media}
                        image={property.picture__c}
                        title="Contemplative Reptile"
                        />
                    </CardActionArea>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2" style={{fontSize: '1.3rem'}}>
                            {property.title__c}
                        </Typography>
                        <Typography component="p">
                            {property.description__c}
                        </Typography>
                        <Divider />
                        <List component="nav">
                            <ListItem button>
                                <ListItemIcon>
                                    <i className="material-icons">brightness_3</i>
                                </ListItemIcon>
                                <ListItemText>
                                    Bedrooms<span style={{float: 'right', color: '#84BF41'}}>{property.beds__c}</span>
                                </ListItemText>
                            </ListItem>
                            <Divider />
                            <ListItem button>
                                <ListItemIcon>
                                    <i className="material-icons">waves</i>
                                </ListItemIcon>
                                <ListItemText>
                                    Bathrooms<span style={{float: 'right', color: '#84BF41'}}>{property.baths__c}</span>
                                </ListItemText>
                            </ListItem>
                            <Divider />
                            <ListItem button>
                                <ListItemIcon>
                                    <i className="material-icons">turned_in</i>
                                </ListItemIcon>
                                <ListItemText>
                                    Asking Price<span style={{float: 'right', color: '#84BF41'}}>{'$' + property.price__c}</span>
                                </ListItemText>
                            </ListItem>
                            <Divider />
                            <ListItem button onClick={() => this.showBrokerHandle(property.broker__c_sfid)}>
                                <ListItemIcon>
                                    <Avatar alt={property.broker__c_name} src={property.broker__c_picture__c} className={classes.avatar}/>
                                </ListItemIcon>
                                <ListItemText>
                                    <Typography gutterBottom variant="h6">
                                        {property.broker__c_name}
                                    </Typography>
                                    <Typography component="p">
                                        {property.broker__c_title__c}
                                    </Typography>
                                </ListItemText>
                            </ListItem>
                            <Divider />
                        </List>
                    </CardContent>
                    <CardActions>
                        <BottomNavigation
                            showLabels
                            className={classes.root}
                            style={{flex: 1}}
                        >
                            <BottomNavigationAction label="Favorites" icon={<FavoriteIcon style={{fontSize: 20, color: '#84BF41'}}/>} style={{maxWidth: 'unset', float: 'left'}} onClick={() => this.favoriteHandle()}/>
                            <BottomNavigationAction label="Like" icon={<i className="fas fa-thumbs-up" style={{fontSize: 20, color: '#84BF41'}}></i>} style={{maxWidth: 'unset'}} onClick={() => this.likeHandle()}/>
                            <BottomNavigationAction label="Share"  icon={<i className="fas fa-share" style={{fontSize: 20, color: '#84BF41'}}></i>} style={{maxWidth: 'unset'}} onClick={() => this.shareHandle()}/>
                        </BottomNavigation>
                    </CardActions>
                </Card>
                    : <div></div>
                }
            </div>
        )
    }
}

Property.propTypes = {
    classes: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
    return {
        reduxStore: {
            layout: state.layout,
            auth: state.auth,
            property: state.properties
        }
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({changeTitle, findPropertyById, addFavoriteById}, dispatch)
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Property));
