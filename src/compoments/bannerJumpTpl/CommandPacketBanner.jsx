import  React from 'react';
import  TitleNav from '../plugins/TitleNav/TitleNav';
import  Modal from '../plugins/Modal/Modal';
import {PLAT, jrLog,frBridge,is_weixn,isAppView,basicInfo,getNew, isLogin} from '../common/const';

import {Toast} from 'antd-mobile';
class  CommandPacketBanner extends  React.Component {
    constructor(props) {
        super(props);
    }

    render(){
        return(<div className="commandPacketBanner">
                <title>微信口令红包</title>
                <TitleNav title="微信口令红包" style={isAppView()||is_weixn()?{display:'none'}:{}}/>
                <section>
                    <img src={require('./../../images/bannerJumpImgs/gb2.jpg')} alt="" style={{width:'100%'}}/>
                </section>
            </div>
        )
    }
}
CommandPacketBanner.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export  default   CommandPacketBanner