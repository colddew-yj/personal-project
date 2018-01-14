import  React from 'react';

import './style.less';
class  TitleInfo extends  React.Component {
    constructor(props){
        super(props);
    }
    close(){
        this.props.close();
    }
    render(){
        return(
            <div className="titleInfo" style={this.props.titleInfoShow?{}:{display:'none'}} >
                <div className="content">{this.props.content}</div>
                <img style={this.props.closeIcon?{}:{display:'none'}} src={require('./img/icon_close.png')} alt="" onClick={this.close.bind(this)}/>
            </div>
        )
    }
}

TitleInfo.contextTypes = {
    router: React.PropTypes.object.isRequired
};
export  default  TitleInfo