import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { findBrokerAll } from '../redux/actions/brokers'
import { changeTitle } from '../redux/actions/layout'
import './Properties.css'

class Brokers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: 'Brokers',
        }
    };

    BrokerDetail(id) {
        this.props.history.push('/broker-detail/' + id)
    }
    componentWillMount() {
        this.props.changeTitle(this.state.title)
        this.props.findBrokerAll()
    }

    render() {
        const { reduxStore } = this.props
        return (
            <div style={{padding: 20}}>
                { (reduxStore.brokers.brokers && reduxStore.brokers.brokers.length) ? reduxStore.brokers.brokers.map((broker, index) => (
                    <div className="property-container" key={index} onClick={() => this.BrokerDetail(broker.sfid)}>
                        <img src={broker.picture__c} className="property-logo" alt={broker.name}/>
                        <div className="property-content">
                            <h2>{broker.name}</h2>
                            <p>{broker.title__c}</p>
                        </div>
                    </div>
                )) : <div></div>}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        reduxStore: {
            layout: state.layout,
            auth: state.auth,
            brokers: state.brokers
        }
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({changeTitle, findBrokerAll}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Brokers);