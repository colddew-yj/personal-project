import  React from 'react';
import  { connect }from 'react-redux';
import  {Link} from 'react-router';
import {fetchPost,fetchGet} from 'jrbasic';
import  TitleNav from '../plugins/TitleNav/TitleNav';
import {isAppView} from '../common/const';
class  CashInstruc extends  React.Component {
    constructor(props){
        super(props);
    }
    componentDidMount(){
        let that = this;

    }

    render(){
        return(<div className="cashInstruc">
                <title>信用卡取现说明</title>
                <TitleNav  title="信用卡取现说明" style={isAppView()?{display:'none'}:{}}/>
                <div className="content">
                    <div className="nav"><img src={require('./../../images/quesInstru.png')} alt=""/> 什么是信用卡取现？</div>
                    <div className="txt">
                        <div>1. 通过卡猫，您可以将信用卡中的资金取现至个人储蓄卡账户中，每取现一笔资金会收款一定的费率。</div>
                        <div>2. 一天之内，单笔最多可取现2万人民币，单卡最多5万人民币，可支持绑定多张信用卡。</div>
                        <div>3. 信用卡取现时间：每日01:00—22:00,实时到账。</div>
                    </div>
                    <div className="instruc">
                        <div>举个例子</div>
                        <img src={require('./../../images/cashinstruc.png')} alt=""/>
                    </div>
                </div>

            </div>
        )
    }
}

CashInstruc.contextTypes = {
    router: React.PropTypes.object.isRequired
};
export  default   CashInstruc