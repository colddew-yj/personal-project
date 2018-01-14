import  React from 'react';
import  { connect }from 'react-redux';
import  {Link} from 'react-router';
import {fetchPost,fetchGet} from 'jrbasic';
import  TitleNav from '../plugins/TitleNav/TitleNav';
import {isAppView} from '../common/const';
import { Accordion ,List } from 'antd-mobile';
class  RecashRulesList extends  React.Component {
    constructor(props){
        super(props);
    }
    componentDidMount(){
        let that = this;

    }

    render(){
        return(<div className="recashRulesList">
                <title>账户提现规则</title>
                <TitleNav  title="账户提现规则" style={isAppView()?{display:'none'}:{}}/>
            <Accordion defaultActiveKey="0"   onChange={this.onChange} className="list">
                <Accordion.Panel header="1、	我的账户是用来干什么的？" className="content" style={this.props.location.query.elseType==='1'?{display:'none'}:{}}>
                    卡猫每一个注册用户都会有一个活动返现账户，卡猫会不定期举行一些活动，活动返现的金额会打至账户中，达到一定金额后可以提现至自己的银行卡。
                </Accordion.Panel>
                <Accordion.Panel header="1、	活动账户是用来干什么的？" className="content" style={!(this.props.location.query.elseType==='1')?{display:'none'}:{}}>
                    随卡付每一个注册用户都会有一个活动返现账户，随卡付会不定期举行一些活动，活动返现的金额会打至账户中，达到一定金额后可以提现至自己的银行卡。
                </Accordion.Panel>

                <Accordion.Panel header="2、	账户金额累积到多少可以提现？" className="content">
                    账户金额累积到100元以上可以提现。
                </Accordion.Panel>
                <Accordion.Panel header="3、	账户提现规则？" className="content">
                    单笔提现金额最低100元，最高1000元，每日只能提现1笔。
                </Accordion.Panel>
                <Accordion.Panel header="4、	邀请好友没有上限？" className="content">
                    没有上限，多邀多得。
                </Accordion.Panel>
            </Accordion>

            </div>
        )
    }
}

RecashRulesList.contextTypes = {
    router: React.PropTypes.object.isRequired
};
export  default   RecashRulesList