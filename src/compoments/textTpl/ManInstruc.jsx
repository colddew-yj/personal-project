import  React from 'react';
// import  { connect }from 'react-redux';
// import  {Link} from 'react-router';
import { Accordion ,List } from 'antd-mobile';
import  TitleNav from '../plugins/TitleNav/TitleNav';
import {is_weixn,isAppView} from '../common/const';
class  ManInstruc extends  React.Component {
    constructor(props){
        super(props);

    }
    render(){
        return(<div className="manInstruc">
                <title>使用说明</title>
                <TitleNav title="使用说明" style={isAppView()||is_weixn()?{display:'none'}:{}}/>
                <Accordion defaultActiveKey="0"   onChange={this.onChange} className="list">
                    <Accordion.Panel header="1、	什么是现金券？" className="content">
                        1,卡猫现金券是卡猫官方提供给用户电子券，在用户使用卡猫APP进行取现交易时可获得返现，用户可积极参加各种活动，更易获得更多现金券！
                    </Accordion.Panel>
                    <Accordion.Panel header="2、现金券使用规则？" className="content">
                        <div>
                            1.在现金券标明有效期内，在卡猫进行取现交易，且您的交易符合使用条件，即可选择使用现金券。若超过有效期未使用，则该现金券将会自动失效。建议收到券就尽快使用。
                        </div>
                        <div>
                            2.现金券不可叠加使用。
                        </div>

                        <div>
                            3.取现交易使用现金券，取现交易成功以后，该现金券的面值金额将进入“我的账户”，用户可在“我的账户”里面进行提现。比如使用了10元现金券，则10元现金进入您的账户，进入账户便可按照相关规定要求进行提现。
                        </div>
                    </Accordion.Panel>
                    <Accordion.Panel header="3、获取现金券的几种方式（包含但不限于）" className="content">
                        <div> 1.在卡猫APP上注册的新用户</div>
                        <div> 2.通过别人转发的邀请活动链接注册，并下载卡猫APP登录时</div>
                        <div> 3.参加卡猫各种官方活动</div>
                        <div> 4.加入卡猫社群，喵小妹发放  </div>

                    </Accordion.Panel>
                </Accordion>
                <div className="law">在法律允许范围内，本公司保留最终解释权。</div>
            </div>
        )
    }
}

ManInstruc.contextTypes = {
    router: React.PropTypes.object.isRequired
};
export  default   ManInstruc
