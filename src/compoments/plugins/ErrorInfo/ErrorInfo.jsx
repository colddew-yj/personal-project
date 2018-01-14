import React from 'react';
import './style.less';
class ErrorInfo extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className="error">
                <div className="img">    <img src={require('./img/error.png')} alt=""/>
                </div>
                <div className="desc">{this.props.location.query.desc}</div>
                <a href="javascript:;" onClick={this.back.bind(this)}>点击重试</a>
            </div>
            )
    }
    back(){
        this.props.history.goBack();
    }
}
ErrorInfo.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default ErrorInfo;