import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { changeTitle } from '../redux/actions/layout'
import {findBrokerById} from '../redux/actions/brokers'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import "./Broker.css";

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
        const { reduxStore} = this.props;
        const broker = reduxStore.broker.broker;
        return (
            <div style={{position: 'relative'}}>
                <div className="brokerContainer">
                    <div className="brokerContent">
                        <div style={{padding: 20, backgroundColor: '#84bf41'}}>
                            <div className="brokerHeader">
                                <img className="brokerLogo" src={broker.picture__c} alt={broker.name}/>
                            </div>
                            <h2>{broker.name}</h2>
                            <h3>{broker.title__c}</h3>
                        </div>
                        <div>
                            <div className="brokerBody">
                                <i className="brokerIcon fas fa-phone"></i>
                                <div className="brokerTextGroup" style={{textAlign: 'left'}}>
                                    <small className="brokerSmall">Call Office</small>
                                    <p className="brokerParagraph">{broker.phone__c}</p>
                                </div>
                            </div>
                            <div className="brokerBody">
                                <i className="brokerIcon fas fa-mobile"></i>
                                <div className="brokerTextGroup" style={{textAlign: 'left'}}>
                                    <small className="brokerSmall">Call Mobile</small>
                                    <p className="brokerParagraph">{broker.phone__c}</p>
                                </div>
                            </div>
                            <div className="brokerBody">
                                <i className="brokerIcon fas fa-comment"></i>
                                <div className="brokerTextGroup" style={{textAlign: 'left'}}>
                                    <small className="brokerSmall">Text</small>
                                    <p className="brokerParagraph">{broker.phone__c}</p>
                                </div>
                            </div>
                            <div className="brokerBody">
                                <i className="brokerIcon fas fa-envelope"></i>
                                <div className="brokerTextGroup" style={{textAlign: 'left'}}>
                                    <small className="brokerSmall">Email</small>
                                    <p className="brokerParagraph">{broker.email__c}</p>
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
export default connect(mapStateToProps, mapDispatchToProps)(Broker);
