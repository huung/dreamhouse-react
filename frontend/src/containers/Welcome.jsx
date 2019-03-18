import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { changeTitle } from '../redux/actions/layout'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Carousel, CarouselItem, CarouselControl, CarouselIndicators, CarouselCaption } from 'reactstrap';
import { withStyles } from '@material-ui/core/styles';

const styles = {
    carousel: {
        position: 'absolute',
        width: '100%'
    },
    carouselItem: {
        height: 'calc(100vh - 55px)',
        overflowY: 'hidden'
    }
}
const items = [
    {
        src: 'images/slide_properties.jpg' ,
        altText: 'properties',
        caption: 'Your dream house is just a few taps away! Select Properties in the menu to start your search'   
    }, {
        src: 'images/slide_brokers.jpg',
        altText: 'brokers',
        caption: 'Select Brokers in the menu to connect with the best brokers in the business in a whole new way!' 
    }, {
        src: 'images/slide_favorites.jpg',
        altText: 'favorites',
        caption: 'Keep track of your favorites and get notified in real time when important events happen' 
    } 
]
class Welcome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: 'Welcom to DreamHouse Realty',
            activeIndex: 0
        }
    };
      componentWillMount() {
          this.props.changeTitle(this.state.title)
      }
      onExiting = () => {
        this.animating = true;
      }
    
      onExited = () => {
        this.animating = false;
      }
    
      next = () => {
        if (this.animating) return;
        const nextIndex = this.state.activeIndex === items.length - 1 ? 0 : this.state.activeIndex + 1;
        this.setState({ activeIndex: nextIndex });
      }
    
      previous = () => {
        if (this.animating) return;
        const nextIndex = this.state.activeIndex === 0 ? items.length - 1 : this.state.activeIndex - 1;
        this.setState({ activeIndex: nextIndex });
      }
    
      goToIndex = (newIndex) => {
        if (this.animating) return;
        this.setState({ activeIndex: newIndex });
      }

    render() {
        const {activeIndex} = this.state
        const { classes } = this.props

        const slides = items.map((item) => {
            return (
                <CarouselItem 
                    onExiting={this.onExiting}
                    onExited={this.onExited}
                    key={item.src} 
                   className={classes.carouselItem}
                >
                    <img src={item.src} alt={item.altText} style={{width: '100%'}}/>
                    <CarouselCaption captionHeader={item.caption} captionText="" style={{backgroundColor: '#84bf41de', bottom: 0, left: 0}}/>
                </CarouselItem>
            )
        })
        return (
            <Carousel
                activeIndex={activeIndex}
                next={this.next}
                previous={this.previous}
                className={classes.carousel}
            >
                <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
                {slides}
                <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
                <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
            </Carousel>
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
    return bindActionCreators({changeTitle}, dispatch)
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Welcome));