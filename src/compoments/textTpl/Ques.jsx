import  React from 'react';
import {fetchPost,fetchGet} from 'jrbasic';
import  TitleNav from '../plugins/TitleNav/TitleNav';
import Concat from '../plugins/Concat/Concat';
// import {isAppView} from '../common/const';

class  Ques extends  React.Component {
    constructor(props){
        super(props);
        this.state={
            showModal:false
        }
    }
    componentDidMount(){
    }
    concat(e){
        setTimeout(()=>{
            this.setState({
                showModal:true
            });
        },200)

    }
    hideModal(){
        this.setState({
            showModal:false
        });
    }


    render(){
        return(<div className="ques">
                <title>常见问题</title>
                <TitleNav title="常见问题" opImg={require('../../images/concat.png')} handler={this.concat.bind(this)} />
                <div className="list">
                    <div className="title" style={this.props.location.query.elseType==='1'?{display:'none'}:{}}>一、信用卡无卡取现是什么？</div>
                    <div className="content" style={this.props.location.query.elseType==='1'?{display:'none'}:{}}>
                        也叫“无卡取款”，将信用卡中可用额度提现到绑
                        定的储蓄卡中。帮助用户短期资金周转。

                    </div>
                    <div className="title" style={!(this.props.location.query.elseType==='1')?{display:'none'}:{}}>一、刷卡收款是什么？</div>
                    <div className="content" style={!(this.props.location.query.elseType==='1')?{display:'none'}:{}}>
                        将信用卡中可用额度提现到绑
                        定的储蓄卡中。帮助用户短期资金周转。

                    </div>
                </div>
                <div className="list">
                    <div className="title">二、身份证验证问题？</div>
                    <div className="content">
                        初次申请取现的用户，需进行本人身份证验证，下一次申请，无需再验证本人身份证。
                    </div>
                </div>
                <div className="list">
                    <div className="title">三、信用卡绑卡问题？</div>
                    <div className="content">
                        绑定的信用卡持卡人需与身份证验证相匹配，可
                        添加多张信用卡。绑定信用卡为取现支付卡。

                    </div>
                </div>
                <div className="list">
                    <div className="title">四、储蓄卡绑卡问题？</div>
                    <div className="content">
                        绑定的储蓄卡持卡人需与身份证验证相匹配，一
                        个用户只能绑定一张储蓄卡，若已绑定储蓄卡异
                        常无法收到到款，可进入管理页面进行更换新储
                        蓄卡。

                    </div>
                </div>
                <div className="list">
                    <div className="title">五、支持哪些银行卡交易？</div>
                    <div className="content">
                        所有中国大陆发行的具有银联标志的卡。

                    </div>
                </div>
                <div className="list">
                    <div className="title">六、结算规则？</div>
                    <div className="content">
                        D0交易：<br/>
                        01:00-22:00期间持卡人刷卡后，当日结算，预计
                        当日2小时左右到您的收款账户；其余时间或您的结算帐号信息有误，或银行问题，可能转至T1或第二个工作日结算，请耐心等待。

                    </div>
                </div>
                <div className="list">
                    <div className="title">七、身份验证无法拍照？</div>
                    <div className="content">
                        进行身份验证时，无法拍照，可能您关闭了手机
                        设置相机拍照权限，请至手机设置中重新开启权
                        限后重试。

                    </div>
                </div>
                <div className="list">
                    <div className="title">八、储蓄卡遗失无法收到到款？</div>
                    <div className="content" style={this.props.location.query.elseType==='1'?{display:'none'}:{}}>
                        绑定的储蓄卡遗失，并已通知银行冻结银行卡，
                        在此期间的金额无法打款到绑定储蓄卡，需更换绑定储蓄卡并联系客服帮助您重新打款到您的新账户。

                    </div>
                    <div className="content" style={!(this.props.location.query.elseType==='1')?{display:'none'}:{}}>
                        绑定的储蓄卡遗失，并已通知银行冻结银行卡，
                        在此期间刷卡的金额无法打款到绑定储蓄卡，需更换绑定储蓄卡并联系客服帮助您重新打款到您的新账户。
                    </div>
                </div>
                <Concat title="客服咨询" hideModal={this.hideModal.bind(this)} showModal={this.state.showModal} />

            </div>
        )
    }
}

Ques.contextTypes = {
    router: React.PropTypes.object.isRequired
};
export  default   Ques