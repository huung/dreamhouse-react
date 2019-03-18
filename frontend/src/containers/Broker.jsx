import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { changeTitle } from '../redux/actions/layout'
import {findBrokerById} from '../redux/actions/brokers'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

// import axios from 'axios'
const styles = {
    brokerContainer: {
        position: 'absolute',
        width: '100%',
        textAlign: 'center',
    },
    brokerContent: {
        margin: '100px 15px 15px',
        color: '#ffffff',
        boxShadow: '0 2px 5px 0.5px #cccccc',
        borderRadius: 3
    },
    brokerHeader: {
        margin: '-100px auto 0px'
    },
    brokerLogo: {
        width: 150,
        height: 150,
        borderRadius: '50%',
        border: '4px solid #ffffff'
    },
    brokerBody: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '5px 8px',
        cursor: 'pointer',
    },
    brokerIcon: {
        maxWidth: 56,
        maxHeight: 56, 
        margin: '8px 16px 8px 0px',
        fontSize: 20,
        minWidth: 45,
        color: '#333333'
    },
    brokerTextGroup: {
        flex: 1,
        paddingLeft: 8,
        paddingBottom: 5,
        borderBottom: '1px solid #cccccc'
    },
    brokerParagraph: {
        margin: '0 0 2px',
        fontSize: '1.2rem',
        lineHeight: 'normal',
        color: '#222222'
    },
    brokerSmall: {
        color: '#555555',
    }
  };
class Broker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: 'Broker',
        }
    };

    BrokerFindById(id) {
        this.props.findBrokerById(id)
    }

    componentWillMount() {
        this.props.changeTitle(this.state.title)
        this.BrokerFindById(this.props.match.params.id)
    }

    render() {
        const { classes, reduxStore} = this.props;
        const broker = reduxStore.broker.broker;
        return (
            <div style={{position: 'relative'}}>
                <div className={classes.brokerContainer}>
                    <div className={classes.brokerContent}>
                        <div style={{padding: 20, backgroundColor: '#84bf41'}}>
                            <div className={classes.brokerHeader}>
                                <img className={classes.brokerLogo} src={broker.picture__c} alt={broker.name}/>
                            </div>
                            <h2>{broker.name}</h2>
                            <h3>{broker.title__c}</h3>
                        </div>
                        <div>
                            <div className={classes.brokerBody}>
                                <i className={classes.brokerIcon + ' fas fa-phone'}></i>
                                <div className={classes.brokerTextGroup} style={{textAlign: 'left'}}>
                                    <small className={classes.brokerSmall}>Call Office</small>
                                    <p className={classes.brokerParagraph}>{broker.phone__c}</p>
                                </div>
                            </div>
                            <div className={classes.brokerBody}>
                                <i className={classes.brokerIcon + ' fas fa-mobile'}></i>
                                <div className={classes.brokerTextGroup} style={{textAlign: 'left'}}>
                                    <small className={classes.brokerSmall}>Call Mobile</small>
                                    <p className={classes.brokerParagraph}>{broker.phone__c}</p>
                                </div>
                            </div>
                            <div className={classes.brokerBody}>
                                <i className={classes.brokerIcon + ' fas fa-comment'}></i>
                                <div className={classes.brokerTextGroup} style={{textAlign: 'left'}}>
                                    <small className={classes.brokerSmall}>Text</small>
                                    <p className={classes.brokerParagraph}>{broker.phone__c}</p>
                                </div>
                            </div>
                            <div className={classes.brokerBody}>
                                <i className={classes.brokerIcon + ' fas fa-envelope'}></i>
                                <div className={classes.brokerTextGroup} style={{textAlign: 'left'}}>
                                    <small className={classes.brokerSmall}>Email</small>
                                    <p className={classes.brokerParagraph}>{broker.email__c}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Broker.propTypes = {
    classes: PropTypes.object.isRequired
}
//import store
const mapStateToProps = (state) => {
    return {
        reduxStore: {
            layout: state.layout,
            auth: state.auth,
            broker: state.brokers
        }
    }
}

//export store
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({changeTitle, findBrokerById}, dispatch)
}
export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Broker));