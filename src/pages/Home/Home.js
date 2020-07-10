import React, { Component } from 'react';
import { connect } from 'react-redux';
import {GET_MENU} from 'Redux/action-types';

export class Home extends Component {
    constructor(props){
        super(props);
    }
    componentDidMount(){
        this.props.getTest();
    }
    render() {
        return (
            <div>
                home page
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = dispatch =>{
    return {
        getTest:() => dispatch({type:GET_MENU})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)


