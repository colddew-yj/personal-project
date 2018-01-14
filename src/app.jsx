require('babel-polyfill');
require('./style/style.less');
import React from "react";
import ReactDOM from "react-dom";
import { hashHistory, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux' ;
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import Routes from './router/router';
import reducer from './redux/reducer/reducer';
import 'whatwg-fetch';
import 'fetch-detector';
import 'fetch-ie8';
import {fetchPost,fetchGet,remSet} from 'jrbasic';

import  { setCommonLoginCookie } from './compoments/common/const';
require('es6-promise').polyfill();
setCommonLoginCookie();
if (module.hot) {
    module.hot.accept();
}
// import 'flex.css';
// import 'flex.css/dist/data-flex.css';
function is_weixn(){
    var ua = navigator.userAgent.toLowerCase();
    if(ua.match(/MicroMessenger/i)=="micromessenger") {
        return true;
    } else {
        return false;
    }
}
if(is_weixn()){
    fetchPost('/share/getWxInfo',{url:location.href.split('#')[0]}).then((res)=>{
        if(res.status===1){
            wx.config({
                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: res.data.appId, // 必填，公众号的唯一标识
                timestamp:res.data.timestamp , // 必填，生成签名的时间戳
                nonceStr: res.data.nonceStr, // 必填，生成签名的随机串
                signature: res.data.signature,// 必填，签名，见附录1
                jsApiList: [  'showMenuItems',
                    'onMenuShareTimeline',
                    'onMenuShareAppMessage',
                    'onMenuShareQQ',
                    'onMenuShareQZone','showOptionMenu','onMenuShareWeibo'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            });

            wx.ready(function () {
                wx.showOptionMenu({
                    success:function () {
                      console.log("s")
                    }
                });
                let shareData={
                    desc:'卡猫，信用卡取现神器，低费率，秒到账，无需审核！',
                    title: '我在卡猫用信用卡取现，注册即得34元红包！', // 分享标题
                    link:INV_URL+'&seo='+localStorage.inv_id || '',
                    imgUrl: WxShareIcon,// 分享图标
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

            });

            wx.error(function(res){
                // console.log(res);
                // alert("error");
                console.log(res);
            })
        }else{
            console.log("s");
            console.log(res.message);
        }
    })
}
const store = createStore(reducer, applyMiddleware(thunk));
const history = syncHistoryWithStore(hashHistory, store);

remSet(document,window);
ReactDOM.render(
    <Provider store={store}>
        <div className="encashment">
            <Routes history={history} />
        </div>
    </Provider>, document.getElementById('root'));
