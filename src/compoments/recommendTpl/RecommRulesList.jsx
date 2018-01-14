import  React from 'react';
// import  { connect }from 'react-redux';
// import  {Link} from 'react-router';
import {fetchPost,fetchGet} from 'jrbasic';
import  TitleNav from '../plugins/TitleNav/TitleNav';
import {isAppView,is_weixn} from '../common/const';


class  RecommRulesList extends  React.Component {
    constructor(props){
        super(props);
        this.state={
            showModal:false
        }
    }
    componentDidMount(){
        this.node.scrollIntoView();
    }

    render(){
        return(<div className="recommRulesList" ref={node => this.node = node}>
                <title>活动规则</title>
                <TitleNav  title="活动规则"  style={isAppView()||is_weixn()?{display:'none'}:{}}/>
                <div className="head">
                    活动时间：2017.11.21～2017.12.04
                </div>
                <div className="item">
                    <div className="title">邀请人奖励1</div>
                    <div className="content">
                        <p>活动期间邀请好友注册，并首次取现成功，且取现金额不低于500，奖励20元现金；</p>
                        {/*<p>(2) 此后，TA刷卡的所有金额，您都可以获得分成！好友刷得越多，刷得越久，您得到的奖励更多！所有好友叠加奖励，多邀多送，上不封顶；</p>*/}
                        {/*<p>(3) 每月邀请好友TOP10用户，还会奖励神秘大礼！</p>*/}
                    </div>
                </div>
                <div className="item">
                    <div className="title">邀请人奖励2</div>
                    <div className="content">
                        <p>活动期间邀请好友注册，自好友注册日起1年内，邀请人将获得好友全部取现额度的0.04%作为奖励；好友取现1笔，奖励返1笔，每日结算，上不封顶；</p>
                        {/*<p>(2) 所有奖金，针对好友在您的专属邀请链接下注册成功，并取现成功以后的奖励。若因二次转发，未在您的专属邀请链接下注册，则不算邀请成功。若好友取现未成功，则无奖励；</p>*/}
                        {/*<p>(3) 好友持续刷卡金额持续分成，所以相当您将会持续获得奖励；</p>*/}
                        {/*<p>(4) 好友取现奖励每日一结算。</p>*/}
                    </div>
                </div>
                <div className="item">
                    <div className="title">其他</div>
                    <div className="content">
                        <p>(1) 被邀请好友必须是卡猫app未注册用户；</p>
                        <p>(2) 所有奖励，只针对好友在您分享的专属邀请链接或二维码下注册成功，并取现成功。若因二次转发，未在您的专属邀请链接下注册，则不算邀请成功。若好友取现未成功，无奖励；直接下载app无效；</p>
                        <p>(3) 所有现金和奖励，均发放到卡猫app个人返利账户，可以直接提现；</p>
                        <p>(4) 本活动与苹果公司无关，本活动解释权在法律规定的范围内归本公司所有；</p>
                    </div>
                </div>
            </div>
        )
    }
}

RecommRulesList.contextTypes = {
    router: React.PropTypes.object.isRequired
};
export  default   RecommRulesList