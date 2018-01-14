import  React from 'react';
// import  {connect}from 'react-redux';
import  TitleNav from '../plugins/TitleNav/TitleNav';
// import LoadView from "../common/LoadView";

class MyAccount extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            showModal:false
        }
    }

    componentDidMount() {
    }
    render() {
        return (<div className="myAccount">
                <title>我的账户</title>
                <TitleNav title="我的账户" />
                <button>查看我的账户</button>
            </div>
        )

    }
}

MyAccount.contextTypes = {
    router : React.PropTypes.object.isRequired
};

export  default  MyAccount