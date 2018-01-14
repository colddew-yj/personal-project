import  React from 'react';
// import  {connect}from 'react-redux';
import  TitleNav from '../plugins/TitleNav/TitleNav';
// import LoadView from "../common/LoadView";
import {Toast, Icon} from 'antd-mobile';
import copy from 'copy-to-clipboard';
import {isAppView, is_weixn} from '../common/const';

class About extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    copy(e) {

        try {
            copy('kamao99');
            Toast.success('复制成功', 1);
        } catch (e) {
            Toast.info('请长按复制');
        }
        // window.clipboardData.setData("Text",'kamao99');
    }

    render() {
        return (<div className="aboutAs">
                <title>关于我们</title>
                <TitleNav title="关于我们" style={isAppView() || is_weixn() ? {display: 'none'} : {}}/>

                <div className="head">
                    <p>
                        <img src={require('./../../images/V2/kamIcon.png')} alt=""/>
                    </p>

                    <div>
                        <div className="flex">
                            <span>要取现</span> <span>上卡猫</span>
                        </div>
                    </div>
                </div>
                <section>
                    <div className="flex">
                        <div><img src={require('../../images/V2/icon_weixin@2x.png')} alt=""/></div>
                        <div>
                            <div>卡猫微信号</div>
                            <div>kamao99</div>
                        </div>
                        <div>
                            <button onClick={this.copy}>复制</button>
                        </div>
                    </div>
                </section>
                <div className="copy">
                    Copynight © 2017 厦门融到金融信息服务有限公司
                </div>


            </div>
        )

    }
}

About.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export  default  About