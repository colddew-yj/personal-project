import  React from 'react';
import  { connect }from 'react-redux';
import  {Link} from 'react-router';
import {fetchPost,fetchGet} from 'jrbasic';
import  TitleNav from '../plugins/TitleNav/TitleNav';
import {isAppView} from '../common/const';
class  ExpireInstruc extends  React.Component {
    constructor(props){
        super(props);
    }
    componentDidMount(){
        let that = this;

    }

    render(){
        return(<div className="expireInstruc">
                <title>理财活动下架</title>
                <TitleNav  title="理财活动下架" style={isAppView()?{display:'none'}:{}}/>
                <div className="content">
                    <img src={require('./../../images/expireInstruc.png')} alt=""/>
                    <div>很抱歉,该活动已下架!</div>
                    <div>敬请期待新产品</div>
                </div>

            </div>
        )
    }
}

ExpireInstruc.contextTypes = {
    router: React.PropTypes.object.isRequired
};
export  default   ExpireInstruc