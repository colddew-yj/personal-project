import  React from 'react';
import  TitleNav from './plugins/TitleNav/TitleNav';
import {is_weixn,isAppView} from './common/const';
class  DealTime extends  React.Component {
    constructor(props){
        super(props);

    }


    render(){
        return(<div className="dealTime">
                <title>交易时间调整公告</title>
                <TitleNav title="交易时间调整公告" style={isAppView()||is_weixn()?{display:'none'}:{}}/>

                <img src={require('./../images/V2/deailTme.png')} alt="" style={{width:'100%'}}/>
                <div className="content">
                    <div>亲爱的用户:</div>
                    {/*<div>我司将于10月11日 23:00--10月12日4:30,对业务系统进行维护升级,期间将暂停取现交易及影响部分用户绑卡,为您带来不便,敬请谅解。请您在可交易时间再来！</div>*/}
                    <div>为保证用户取现能及时到账,我司将调整交易时间,为您带来不便敬请谅解。请您在可交易时间再来！</div>
                    <div>可交易时间：01：00-22：00 <img src={require('./../images/rightIcon.png')} alt=""/></div>
                    <div>不可交易时间：22：00-次日01：00 <img src={require('./../images/errorIcon.png')} alt=""/></div>
                    {/*<div>为保障国庆期间交易正常运行，2017年国庆期间取现交易时间和结算时间有所调整，调整如下：*/}
                        {/*9月30日（星期六）至10月8日（星期日）交易时间为：10:00至22:00;*/}
                    {/*</div>*/}
                    {/*<div>10月9日（星期一）恢复为1:00至22:00；</div>*/}
                    {/*<div>*/}
                        {/*国庆期间个别用户因储蓄卡问题或网络问题，导致未能及时到账，需延迟至10月9日统一重新提现，为您带来不便，敬请谅解！*/}
                    {/*</div>*/}
                    {/*<div>可交易时间：10：00-22：00 <img src={require('./../images/rightIcon.png')} alt=""/></div>*/}

                    {/*<div>不可交易时间：22：00-次日10：00 <img src={require('./../images/errorIcon.png')} alt=""/></div>*/}

                </div>
            </div>
        )
    }
}

DealTime.contextTypes = {
    router: React.PropTypes.object.isRequired
};
export  default   DealTime
