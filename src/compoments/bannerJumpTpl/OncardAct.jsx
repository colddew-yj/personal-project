import  React from 'react';
import  Modal from '../plugins/Modal/Modal';
import {fetchHander,PLAT,setPreUrl,jrLog,onScroll} from './../common/const';
import emApi from './../common/api';
import {Toast} from 'antd-mobile';

class OncardAct extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            is_credit: 0,
            is_identity: 0,
            visible: false,
            closeDownload: false
        }
    }

    componentDidMount() {
        localStorage.channel_id = this.props.location.query.channel_id
        jrLog('kamao_bangka',{
            channel: localStorage.channel_id || '',
            isOnCardAct:true
        });
        fetchHander(emApi.getUserStatus, {
            user_id: localStorage.user_id || '',
            token: localStorage.h5_token || ''
        }).then((data) => {
            this.setState({
                is_credit: data.is_credit,
                is_identity: data.is_identity
            })
        })
    }

    redPackTpl() {
        let d = new Date();
        let month = d.getMonth() + 1;
        let date = d.getDate();
        let img  =  <img
            src={( (month === 10 && date > 19) || (month === 11 && date <= 19) ) ? require('./../../images/act/dw1.png') : require('./../../images/act/dw2.png')}
            alt="" onClick={this.download.bind(this)}/>
        return (
            <Modal hide={this.hide.bind(this)} visible={this.state.visible} getContentTpl={img}
                   contentClass = {(month === 10 && date > 19) || (month === 11 && date <= 19)  ? 'flex content' : 'flex content content2'}/>
        )
    }
    download(e){
        jrLog('kamao_bangka_clickxiazai',{channel: localStorage.channel_id || '', isOnCardAct:true});
        location.href = PLAT()==='ios'?IOSPACK:ANDROIDPACK
    }

    hide() {
        this.setState({
            visible: false
        });
    }

    showRedPack() {
        jrLog('kamao_bangka_clickhongbao',{channel: localStorage.channel_id || '', isOnCardAct:true});

        fetchHander(emApi.getCouponByActive, {
            user_id: localStorage.user_id || '',
            token:localStorage.h5_token || '',
            activity_no:'20170824124325'
        },true).then((data) => {
            this.setState({
                visible: true
            })
        },(mes)=>{
            let d = new Date();
            let month = d.getMonth() + 1;
            let date = d.getDate();
            if((month === 10 && date > 19) || (month === 11 && date <= 19)){
                console.log("s")
                Toast.offline(mes||'网络错误 ,请重试',2);
            }else{
                console.log("s2")
                this.setState({
                    visible: true
                });
                Toast.offline(mes||'网络错误 ,请重试',2);
            }

        })

    }

    toOncard() {
        jrLog('kamao_bangka_clickbangka',{channel: localStorage.channel_id || '', isOnCardAct:true});

        if(!localStorage.user_id){
           this.props.history.push('/encashment/login?goBack=1');
           return false;
       }
        localStorage.preUrl = setPreUrl();
        if (this.state.is_identity === 0) {
            this.props.history.push('/encashment/cardIdValid');
        } else if (this.state.is_credit === 0) {
            this.props.history.push('/encashment/onCard?type=1');
        }
    }

    toScroll() {
        let ele = document.getElementById('rule');
        if (ele) {
            ele.scrollIntoView();
        }
    }
    colosX(){
        this.setState({
            closeDownload:true
        })
    }
    toDownload() {
        if (PLAT() === 'ios') {
            location.href = IOSPACK;
        } else {
            location.href = ANDROIDPACK;
        }
    }

    render() {
        // if(!this.state.loading){
        //     console.log('sc');
        //     Toast.hide();
        // }
        return (<div className="oncardAct">
                <title>卡猫活动日</title>
                {/*<TitleNav title="卡猫" style={isAppView()||is_weixn()?{display:'none'}:{}}/>*/}
                <section>
                    <img src={require('./../../images/act/rule.png')} alt="" onClick={this.toScroll.bind(this)}/>
                    <div  onClick={this.state.is_credit === 1 ? this.showRedPack.bind(this) : () => {
                        Toast.offline('请先绑定信用卡再来领取红包');
                    }}>
                        <img
                            src={this.state.is_credit === 1 ? require('./../../images/act/yellw.png') : require('./../../images/act/gray.png')}
                            alt=""

                        />
                    </div>
                    <div>
                        <img
                            src={this.state.is_credit === 1 ? require('./../../images/act/op.png') : require('./../../images/act/op2.png')}
                            alt=""
                            onClick={this.state.is_credit === 1 ? this.showRedPack.bind(this) : this.toOncard.bind(this)}
                        />
                    </div>
                </section>
                <footer id="rule">
                    <div>—— 活动规则 ——</div>
                    <div>
                        <span>1</span>
                        <span>
                                                            活动时间：2017.10.20～2017.11.20；仅限信用卡取现的未绑卡用户参与；
                            </span>
                    </div>
                    <div>
                        <span>2</span>
                        <span>                            未绑卡用户，通过本页面首次绑卡成功，即可获得开启5～200元红包的机会，每人限参与1次，同一账号或手机号或设备号视作同一用户；</span>
                    </div>
                    <div>
                        <span>3</span>
                        <span>                            红包说明：红包现金券，需要在取现时，勾选使用符合提现条件的红包现金券，取现成功后，对应的红包将会自动提取到账户余额，您将余额转提到自己的银行卡中。可以到卡猫app-[我的现金券]查询相关信息。
</span>
                    </div>

                </footer>
                <div className="downloadNav" style={ this.state.closeDownload ? {display: 'none'} : {display: 'block'}}>
                    <div className="content flex">
                        <img className="icon" src={require('./../../images/V2/kamaoBlue.png')} alt=""/>
                        <div>下载卡猫App，信用卡取现分分钟搞定</div>
                        <div>
                            <button className="btn" type="button" onClick={this.toDownload.bind(this)}>下载
                            </button>
                            <img src={require('./../../images/V2/icon_close@2x(1).png')} onClick={this.colosX.bind(this)}/>
                        </div>
                    </div>

                </div>
                { this.redPackTpl() }
            </div>
        )
    }
}
OncardAct.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export  default   OncardAct