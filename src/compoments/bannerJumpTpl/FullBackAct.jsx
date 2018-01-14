import  React from 'react';
import  TitleNav from '../plugins/TitleNav/TitleNav';
import  Modal from '../plugins/Modal/Modal';
import {PLAT, jrLog,frBridge,is_weixn,isAppView,basicInfo,getNew, isLogin} from '../common/const';

import {Toast} from 'antd-mobile';
class  FullBackAct extends  React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showModal: false,
            closeDownload: false,
            isLastVersion:false,
            modal_type:''
        }
    }

    componentDidMount(){
        localStorage.channel_id = this.props.location.query.channel_id || '';
        jrLog('quxianhuodong_shoudan_openpage',{channel: localStorage.channel_id ,isOnCardAct:true});
        let that = this;
        Toast.loading('loading',0);
        setTimeout(function () {
            Toast.hide();
        },800)
        try{
            let plat_type = that.props.location.query.plat_type;
            getNew().then((r)=>{
                that.setState({
                    closeDownload: ((r&&PLAT()!=='ios')||(PLAT()==='ios') ) && plat_type === 'kamaoapp',
                    isLastVersion: r && plat_type === 'kamaoapp',
                })
            }).catch(function (e) {
                // alert("e:"+e);
                that.setState({
                    closeDownload: ((PLAT()==='ios') ) && plat_type === 'kamaoapp'
                })
            });
        }catch (e){
            alert('ex:'+e);
        }


    }

    toDownload(url) {

        if (PLAT() === 'ios') {
            location.href = IOSPACK;
        } else {
            location.href = ANDROIDPACK;
        }
    }
    colosX(){
        this.setState({
            closeDownload:true
        })
    }
    toNative(isCash){
        if(isCash){
            jrLog('quxianhuodong_shoudan_clickfreebutton',{channel: localStorage.channel_id || '',isOnCardAct:true});
        }else{
            jrLog('quxianhuodong_shoudan_clickviewbutton',{channel: localStorage.channel_id || '',isOnCardAct:true});
        }
        Toast.loading('loading',0);
        setTimeout(function () {
            Toast.hide();
        },800)

        let plat_type = this.props.location.query.plat_type;
        // alert(plat_type);
        if(plat_type==='kamaoh5'){
            // alert('mmmm');
            try{
                isLogin().then((r)=>{
                    // alert('rrr'+r);
                    if(r){
                        if(isCash){
                            this.props.history.push('/encashment/swiperCard?preUrl=1');
                        }else {
                            this.props.history.push('/encashment/couponList');
                        }
                    }else{
                        this.props.history.push('/encashment/login?goBack=1');
                    }
                });
            }catch(e){
               // alert(e)
            }

        }else if(plat_type==='kamaoapp' || plat_type==='otherapp'){
            // alert('ggg');
            if(this.state.isLastVersion){//判断是否为最新版本kamaoapp
                //最新版卡猫app
                isLogin().then((r)=>{
                    if(r){
                        frBridge('getData', {//
                            type: 'version'
                        },  (res)=> {
                            res = JSON.parse(res);
                            if((PLAT()==='ios'&&res&&res.data&&res.data.package_name!=='iOS_com.xmrongdao.kabao')||(PLAT()==='android')&&res&&res.data&&res.data.package_name!=='cn.rongdao.jrkabao'){
                                //其他app中
                                this.setState({
                                    showModal:true,
                                    modal_type:1
                                });
                            }else if(res && res.data){
                             let _v = Number(res.data.plat_version.replace(/\./g,''));
                             if((PLAT()==='ios'&&_v < 382) || (PLAT()==='android'&&_v < 381)){
                                 //其他版本中
                                 this.setState({
                                     showModal:true,
                                     modal_type:2
                                 });
                             }else{
                                 if(isCash){
                                     if(PLAT()==='ios'){
                                         frBridge('goNative', {//
                                             pageName: 'native://goCash'
                                         }, function (res) {
                                         });
                                     }else{
                                         frBridge('goNative', {//
                                             pageName: 'native://CashAdvanceActivity'
                                         }, function (res) {
                                         });
                                     }

                                 }else{
                                     if(PLAT()==='ios'){
                                         frBridge('goNative', {//
                                             pageName: 'native://myCashCoupon'
                                         }, function (res) {
                                         });
                                     }else{
                                         frBridge('goNative', {//
                                             pageName: 'native://MyCashCouponActivity?is_have_msg=false'
                                         }, function (res) {
                                         });
                                     }

                                 }
                             }
                            } else {
                                if(isCash){
                                    if(PLAT()==='ios'){
                                        frBridge('goNative', {//
                                            pageName: 'native://goCash'
                                        }, function (res) {
                                        });
                                    }else{
                                        frBridge('goNative', {//
                                            pageName: 'native://CashAdvanceActivity'
                                        }, function (res) {
                                        });
                                    }
                                }else{
                                    if(PLAT()==='ios'){
                                        frBridge('goNative', {//
                                            pageName: 'native://myCashCoupon'
                                        }, function (res) {
                                        });
                                    }else{
                                        frBridge('goNative', {//
                                            pageName: 'native://MyCashCouponActivity?is_have_msg=false'
                                        }, function (res) {
                                        });
                                    }
                                }
                            }
                        });

                    }else{
                        if(PLAT()==='ios'){
                            frBridge('goNative', {//跳转app登录
                                pageName: 'native://login'
                            }, function (res) {
                            });
                        }else{
                            frBridge('goNative', {//跳转app登录
                                pageName: 'native://LoginActivity'
                            }, function (res) {
                            });
                        }
                    }
                }).catch(function (e) {
                   alert(e);
                })

            }else{
                if(plat_type==='kamaoapp'){
                    this.setState({//老版本卡猫
                        showModal:true,
                        modal_type:2
                    });
                }else{
                    this.setState({//老版本其他app
                        showModal:true,
                        modal_type:1
                    });
                }

            }

        }

    }
    hide(){
        this.setState({
            showModal:false
        })
    }
    modalTpl(){
        return(
         <div>
             <img src={this.state.modal_type===1?require('./../../images/bannerJumpImgs/a1.png'):require('./../../images/bannerJumpImgs/a2.png')} alt=""/>
             <div className="txt">{this.state.modal_type===1?`请先下载卡猫APP，在卡猫APP上才可参加此活动哦`:PLAT()!=='ios'?`您当前的版本不是最新版本，请先下载卡猫最新版。`:`请前往appstore下载最新版卡猫`}</div>
             <div className="btns">
                 <div onClick={this.hide.bind(this)}>知道了</div>
                 <div onClick={this.toDownload.bind(this)} style={PLAT()==='ios'?{display:'none'}:{}}>立即下载</div>
             </div>
         </div>
        )
    }
    render(){
        // if(!this.state.loading){
        //     console.log('sc');
        //     Toast.hide();
        // }
        return(<div className="fullBackAct">
                <title >新用户首单满返活动</title>
                <TitleNav title="新用户首单满返活动" style={isAppView()||is_weixn()?{display:'none'}:{}}/>
                <section>
                    <img src={require('./../../images/bannerJumpImgs/bk.png')} alt=""/>
                    <img src={require('./../../images/bannerJumpImgs/mf1.png')} alt="" className="mf1" onClick={this.toNative.bind(this,1)}/>
                    <img src={require('./../../images/bannerJumpImgs/mf2.png')} alt="" className="mf2" onClick={this.toNative.bind(this,0)}/>
                    <div className="txt">
                        <div className="title">
                            活动规则
                        </div>
                        <div className="content">
                            <div>
                                1. 仅限卡猫app信用卡取现的新用户参与；
                            </div>
                            <div>
                                2. 首单免费取1000

                                活动期间，卡猫新用户首次取现，取1000元手续费5元再返现5元；返现可到卡猫版本[我的]-[个人账户]查询与提现；
A
                                首次取现不足1000元不返，大于等于1000元均返5元。
                            </div>
                            <div>
                                3. 34元大红包

                                大红包是由4张现金优惠券组合而成；

                                取现时，勾选使用符合提现条件的现金券，取现成功后，对应的金额将会自动转入返现余额，返现可到卡猫app3.8.1版本[我的]-[个人账户]查询与提现。
                            </div>
                            <div>
                               4. 在法律范围内本活动解释权归卡猫所有，兑换项和活动与设备生产商Apple Inc.公司无关。
                            </div>

                        </div>
                    </div>
                </section>
                <div className="downloadNav" style={this.state.closeDownload ? {display: 'none'} : {display: 'block'}}>
                    <div className="content flex">
                        <img className="icon" src={require('./../..//images/V2/kamaoBlue.png')} alt=""/>
                        <div>下载卡猫App，信用卡取现分分钟搞定</div>
                        <div>
                            <button className="btn" type="button" onClick={this.toDownload.bind(this)}>下载
                            </button>
                            <img src={require('./../../images/V2/icon_close@2x(1).png')} onClick={this.colosX.bind(this)}/>
                        </div>
                    </div>

                </div>
                <Modal visible={this.state.showModal} hide={this.hide.bind(this)} getContentTpl={this.modalTpl()}/>
            </div>
        )
    }
}
FullBackAct.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export  default   FullBackAct