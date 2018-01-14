import  React from 'react';
import {fetchPost,fetchGet} from 'jrbasic';
import  TitleNav from '../plugins/TitleNav/TitleNav';
import {isAppView,fetchHander,PLAT,jrLog,is_weixn,appLogin} from '../common/const';
import emApi from "../common/api";
import {Toast} from 'antd-mobile';
class  Recommend extends  React.Component {
    /*
    * app进入: inv_id来自url
    * 直接网页进入:inv_id来自登录后存入的localStorage.user_id
    * */
    constructor(props){
        super(props);
        this.state={
            isAppView:false,
            h5Share:false,
            codeImg:'',
            shareUrl:'',
            inv_id:''
        };
    }
    wxShare(){

        try{
            let shareData={
                desc:'卡猫，信用卡取现神器，低费率，秒到账，无需审核！',
                title: '我在卡猫用信用卡取现，注册即得34元红包！', // 分享标题
                link:this.state.shareUrl+'&seo='+localStorage.inv_id,
                imgUrl: WxShareIcon ,// 分享图标
                success:function (r) {
                    console.log('success');
                },
                fail:function (r) {
                    console.log("fail");
                },
                cancel: function () {
                    // 用户取消分享后执行的回调函数
                }
            }
            wx.onMenuShareTimeline(shareData);
            wx.onMenuShareAppMessage(shareData);
            wx.onMenuShareQQ(shareData);
            wx.onMenuShareQZone(shareData);
            wx.onMenuShareWeibo(shareData);
        }catch (e){
            console.log('wx:请使用微信打开');
        }

    }
    componentDidMount(){
        if(this.props.location.query.channel_id){//特定渠道推广:如短信
          this.setState({
            shareUrl:INV_URL+'&channel_id='+this.props.location.query.channel_id
          });
          localStorage.channel_id=this.props.location.query.channel_id;

        }else{//微信,app,二维码,新浪,qq内打开分享
          this.setState({
            shareUrl:INV_URL+'&channel_id=0180'
          });
            localStorage.channel_id=='0180';
        }
        if( localStorage.userId ){
            localStorage.user_id = localStorage.userId;
            localStorage.userId='';
        }
        if( localStorage.token ){
            localStorage.h5_token = localStorage.token;
            localStorage.token='';
        }

        this.setState({
            isAppView:isAppView(),
            inv_id:this.props.location.query.inv_id
        });
        // if(isAppView()){
        //
        // }else {
        //     this.setState({
        //         // isAppView:false,
        //         inv_id:this.props.location.query.inv_id
        //     });
        // }
        if(this.props.location.query.inv_id){
            localStorage.inv_id = this.props.location.query.inv_id ;
            this.setState({
                inv_id:this.props.location.query.inv_id
            });
        }
        // if(is_weixn){
        //     this.wxShare();
        // }
    }
    share(){

        //内嵌于卡猫app时,只需判断是否有user_id,否则还需要判断inv_id是否为空
        if((!localStorage.user_id) || ( (!localStorage.user_id || !localStorage.inv_id)) ){
            let _to = confirm("您还未登录,前往登录?");
            if(_to){
                appLogin();
            }
        }else{
            // if(is_weixn()){
            //     this.wxShare();
            // }
            if(this.state.isAppView || (!this.state.isAppView && this.props.location.query.inv_id) ){
                //调用app分享
                try {
                    if(PLAT()==='ios'){
                        window.webkit.messageHandlers.NativeMethod.postMessage({
                            nativeKey:'shard',
                            shardPicture:WxShareIcon,
                            shardTitle:'我在卡猫用信用卡取现，注册即得34元红包！',
                            shardDescribe:'卡猫，信用卡取现神器，低费率，秒到账，无需审核！',
                            shardURL:this.state.shareUrl+'&seo='+this.state.inv_id
                        })
                    }else if(PLAT()==='android'){
                        onCallByH5.shareView('我在卡猫用信用卡取现，注册即得34元红包！','卡猫，信用卡取现神器，低费率，秒到账，无需审核！',
                            this.state.shareUrl+'&seo='+this.state.inv_id,
                            WxShareIcon);
                    }
                }catch(e){
                    alert(e);
                    console.log(e);
                }
            }else{
                //显示h5分享
                this.setState({
                    iconType:0,
                    showAlert:true
                });
                Toast.loading('加载中...',0);
                fetchHander(emApi.getInvitationQRCode,{
                    user_id:localStorage.user_id,
                    token:localStorage.h5_token
                },"","",'/#/encashment/login?goBack=1').then((data)=>{
                    Toast.hide();
                    this.setState({
                        h5Share:true,
                        codeImg:data.img_link,
                        showAlert:false
                    });
                })

            }
        }

    }
    // sinaShare(){
    //     jrLog('kamao_friends_share_59',{type:3});
    //
    //    // let  url = "http://service.weibo.com/share/share.php?title=" + encodeURIComponent( ` 点这里` +  window.location.href);
    //     let  url = `http://v.t.sina.com.cn/share/share.php?title=`
    //         +`动动手指，就能在家赚钱 以后在这赚大钱，工资只是小零花，大家组团一起赚零花呀！`
    //         +`&url=`+encodeURIComponent(this.state.shareUrl+`&inv_id=`+localStorage.inv_id)
    //         +`&content=utf-8&pic=`+`https://mifengkong.oss-cn-shenzhen.aliyuncs.com/weixin/kamao2.png`;
    //     window.open(url);
    // }
    // qqShare(){
    //     jrLog('kamao_friends_share_59',{type:4})
    //     let url=`http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?summary=`
    //         +`动动手指，就能在家赚钱  以后在这赚大钱，工资只是小零花，大家组团一起赚零花呀!`
    //         +`&url=`+encodeURIComponent(this.state.shareUrl+`&inv_id=`+localStorage.inv_id)
    //         +`&pics=`+`https://mifengkong.oss-cn-shenzhen.aliyuncs.com/weixin/kamao2.png`;
    //     window.open(url);
    // }
    // wx(){
    //     wx.showOptionMenu();
    // }
    //  is_weixn(){
    //     var ua = navigator.userAgent.toLowerCase();
    //     if(ua.match(/MicroMessenger/i)=="micromessenger") {
    //         return true;
    //     } else {
    //         return false;
    //     }
    // }
    wxAlert(){
         alert('请点击右上角分享');
    }
    stopMove(){
        event.preventDefault();
    }

    sharePart(){
        return(
            <div className="sharePart" style={{display:this.state.h5Share?'block':'none'}} onTouchMove={this.stopMove}>
                <div>
                    <div className="code">
                        <img src={this.state.codeImg} alt=""/>
                    </div>
                    <div className="content" onClick={this.hideShare.bind(this)}>
                        {/*<div className="desc">分享到</div>*/}
                        {/*<div className="shareType">*/}
                            {/*<div onClick={this.sinaShare.bind(this)}>*/}
                                {/*<img src={require('../../images/sina.png')} alt=""/>*/}
                                {/*<div>新浪微博</div>*/}
                            {/*</div>*/}
                            {/*<div onClick={this.qqShare.bind(this)} style={this.is_weixn()?{display:'none'}:{}}>*/}
                                {/*<img src={require('../../images/zone.png')} alt=""/>*/}
                                {/*<div>QQ空间</div>*/}
                            {/*</div>*/}
                            {/*/!*<div  style={this.is_weixn()?{display:'none'}:{}}>*!/*/}
                            {/*/!*<img src={require('./../images/wx.png')} alt=""/>*!/*/}
                            {/*/!*<div>请在微信中打开并分享</div>*!/*/}
                            {/*/!*</div>*!/*/}
                            {/*<div onClick={this.wxAlert.bind(this)} style={!is_weixn()?{display:'none'}:{}}>*/}
                                {/*<img src={require('../../images/wx.png')} alt=""/>*/}
                                {/*<div>请点击右上角分享</div>*/}
                            {/*</div>*/}
                        {/*</div>*/}
                        取消分享
                    </div>
                </div>

            </div>
        )
    }
    hideShare(){
        this.setState({
            h5Share:false
        });
    }
    toRecordList(){
        let _plat = (this.state.isAppView&&!localStorage.user_id) || (!this.state.isAppView && (!localStorage.user_id || !localStorage.inv_id));
        if(_plat){
            let _to = confirm("您还未登录,前往登录?");
            if(_to){
                appLogin();
            }
        }else{
            this.props.history.push('/encashment/recordList?plat_type='+this.props.location.query.plat_type);
        }
    }
    toReward(){
        if((this.state.isAppView&&!localStorage.user_id) || (!this.state.isAppView && (!localStorage.user_id || !localStorage.inv_id))){
            let _to = confirm("您还未登录,前往登录?");
            if(_to){
                appLogin();
            }
        }else{
            this.props.history.push('/encashment/recomReward?plat_type='+this.props.location.query.plat_type)
        }
    }
    toRules(){
        this.props.history.push('/encashment/recommRulesList/#top');
    }
    // changeShow(){
    //     this.setState({
    //         showAlert:false
    //     })
    // }
    // autoClose(time){
    //     window.clearAlert =  setTimeout(()=>{
    //         this.setState({
    //             showAlert:false
    //         })
    //     },time);
    // }
    render(){
        return(<div className="recommend">
                <title>邀请好友送现金</title>
                <TitleNav title="邀请好友送现金"  style={(is_weixn||this.state.isAppView)?{display:'none'}:{}}/>
                <section><img src={require('../../images/bannerJumpImgs/recommend.png')} alt=""/>
                    <img src={require('../../images/bannerJumpImgs/actFloat.png')}  alt="" onClick={this.toRules.bind(this)}/>
                </section>
                <div className="header">
                    <div ><img src={require('./../../images/bannerJumpImgs/goCash.png')} alt="" onClick={this.share.bind(this)}/>
                    <div>
                        <img src={require('./../../images/bannerJumpImgs/recordList.png')} alt="" onClick={this.toRecordList.bind(this)}/>
                        <img src={require('./../../images/bannerJumpImgs/reward.png')} alt="" onClick={this.toReward.bind(this)}/>
                    </div>
                    </div>
                </div>
                {/*<hr/>*/}
                {/*<div onClick={this.toRules.bind(this)} className="ruleStyle"  style={this.state.isAppView?{}:{display:'none'}}>活动规则 > </div>*/}
                 { this.sharePart(this)}
                {/*<AlertInfo {...this.state} />*/}
            </div>
        )
    }
}

Recommend.contextTypes = {
    router: React.PropTypes.object.isRequired
};
export  default  Recommend
