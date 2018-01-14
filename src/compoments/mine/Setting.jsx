import  React from 'react';
// import  {connect}from 'react-redux';
import  TitleNav from '../plugins/TitleNav/TitleNav';
// import LoadView from "../common/LoadView";
import Concat from '../plugins/Concat/Concat';
import {isAppView,is_weixn} from '../common/const';
import { Modal} from 'antd-mobile';

const selfAlert = Modal.alert;
class Setting extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            showModal:false
        }
    }

    componentDidMount() {
    }
    exit(){
        selfAlert('提示', '确定退出吗?', [
            { text: '取消', onPress: () => console.log('cancel') },
            {
                text: '确定',
                onPress: () => {
                    localStorage.mobile="";
                    localStorage.user_id="";
                    localStorage.h5_token="";
                    this.props.history.replace('/encashment/mine');
                },
            },
        ])

    }
    toNext(){
        this.props.history.push('/encashment/about');
    }
    hideModal() {
        this.setState({
            showModal: false
        });
    }
    concat(e) {
        setTimeout(() => {
            this.setState({
                showModal: true
            });
        }, 200)

    }
    render() {
        return (<div className="setting">
                <title>设置</title>
                <TitleNav title="设置" style={isAppView()||is_weixn()?{display:'none'}:{}}/>

                <section>
                    <div className="flex" onClick={this.concat.bind(this)}>
                        <div><img src={require('../../images/V2/li2_icon_3@2x.png')} alt=""/></div>
                        <div>联系客服</div>
                        <div><img src={require('../../images/arrows/8.png')} alt=""/></div>
                    </div>
                    <div className="flex"  onClick={this.toNext.bind(this)}>
                        <div><img src={require('../../images/V2/li2_icon_2@2x.png')} alt=""/></div>
                        <div>关于我们</div>
                        <div><img src={require('../../images/arrows/8.png')} alt=""/></div>
                    </div>
                </section>
                <div className="exit" onClick={this.exit.bind(this)} style={!localStorage.user_id?{display:'none'}:{}}>
                    退出登录
                </div>
                <Concat title="客服咨询" hideModal={this.hideModal.bind(this)} showModal={this.state.showModal}/>

            </div>
        )

    }
}

Setting.contextTypes = {
    router : React.PropTypes.object.isRequired
};

export  default  Setting