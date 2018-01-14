import empApi from './api'
import {Toast, Icon} from 'antd-mobile';
import {fetchGet, fetchPost, searchToObj} from 'jrbasic'
//组件AlertProps基本参数:用到的比较少
export const alertProps = {
    showAlert: false,
    iconType: 0, //0 loading  ,  1  success , 2 false
    closeTime: 2000,
    iconStatus: true,
    icon: '',
    textVal: '',
    extendStyle: {}

}
//判断哪个平台
export const PLAT = () => {
    let plat;
    if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {  //判断iPhone|iPad|iPod|iOS
        plat = 'ios';
    } else if (/(Android)/i.test(navigator.userAgent)) {   //判断Android
        plat = 'android';
    } else {
        plat = "pc";
    }
    ;
    return plat;
}

if (!window.getDeviceInfo) {
    window.getDeviceInfo = function (fun) {
        fun({
            "system": "ios",
            "location": {"longitude": -122.406417, "latitude": 37.785834},
            "appVersion": "1.0",
            "appName": "员工助手",
            "appPackageName": "com.workai.empassist",
            "type": "iPhone Simulator",
            "network": "WIFI"
        })
    }
}
//合并公共参数
export const _assign = (data) => {//合并公共的参数
    let _data = Object.assign(data, {
        package_name: PACKAGE_NAME,
        source_id: 'tuiguang',
        plat_version: '3.8.0',
        app_union_name: 'kamaoh5',
        plat_type: PLAT() == 'ios' ? 32 : 31,
        channel_id: localStorage.channel_id ? localStorage.channel_id : ""
    });
    return _data;
}
//跳转app的登录
export const appLogin = () => {
    try {
        PLAT() === 'ios' ? window.webkit.messageHandlers.NativeMethod.postMessage('jump_login') : onCallByH5.startActivity("LoginActivity");
    } catch (e) {
        location.href = SERVICE_URL + '/#/encashment/login?goBack=1'
        // alert(e);
    }
}
// export const addGrowingLog = (event_name, otherPrm) => {
//     let prm = {
//         appedition: '3.6.0'
//     };
//     // const envPrm = _assign({});
//
//     const isIos = PLAT();
//
//     Object.assign(prm, { channel_id: localStorage.channel_id? localStorage.channel_id:'' ,package_name:'quxian_h5' });
//     // Object.assign(prm,envPrm);
//
//     Object.assign(prm, { system: isIos==='ios' ? 'iOS' : 'Android' });
//
//     otherPrm && Object.assign(prm, otherPrm);
//     try {
//         window._vds.track(event_name, prm);
//     }catch (e) {
//         console.log(e)
//     }
// };
// let mes = '';
export const tipInfo = (data) => {
    if (data) {
        localStorage.msgs = data.tip;
        return localStorage.msgs;
    } else {
        return localStorage.msgs;
    }
}
/*
对fetchget,fetchpost 的再度封装,成功得到数据后,返回data内部数据,错误时,默认显示错误内容,也可以到外层进行另外的处理:即在返回的第二个方法内处理(可参考Oncard页面)
特殊情况是:个人用户被其他端登录会提示重新登录,然后需要去登录页面
 * url:api地址 必填
 * data:数据
 * error:是否在外层处理错误信息,默认false
 * post:是否用post发送请求,默认 false
 * elseUrl: 另外的登录跳转页
 * */
export const fetchHander = (url, data, error, get, elseUrl) => {
    return new Promise((resolve, reject) => {
        let hander = get ? fetchGet : fetchPost;
        hander(url, data).then((res) => {
            if (res.status === 1) {
                resolve(res.data);
            } else {
                if (~res.message.indexOf('重新登录')) {
                    alert(res.message);
                    Toast.hide();
                    elseUrl ? window.location.href = elseUrl : window.location.href = "/#/encashment/login";

                } else {
                    //错误情况下的特殊处理:拿到外层,在reject funtion下处理
                    //及错误情况下的一般性(默认)处理
                    error ? reject(res.message) : Toast.offline(res.message || '网络错误 ,请重试', 2);

                }
            }
        })
    });
}
export const content = ``;
//判断页面是否嵌入在微信中打开
export const is_weixn = () => {
    var ua = navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == "micromessenger") {
        return true;
    } else {
        return 0;
    }
}
//设置当前的路由路径,作为要返回的路径
export const setPreUrl = () => {
    let _i;
    if (location.hash.lastIndexOf("&") > -1) {
        _i = location.hash.lastIndexOf("&");
    } else {
        _i = location.hash.lastIndexOf("?");
    }
    return location.hash.substring(1, _i);
}
const _addJrLog = (prms) => {

    let howLog = {
        prm: {},
        event_key: ''
    };
    Object.assign(howLog, prms);

    let {gifUrl, prm, event_key} = howLog;

    let logGif = document.createElement('img');

    gifUrl = `${gifUrl}?event_key=${event_key}`;

    for (let item in prm) {
        gifUrl = gifUrl + `&${item}=${encodeURIComponent(prm[item])}`
    }
    logGif.src = gifUrl;
    logGif.style.display = 'none';
    document.getElementById('root').appendChild(logGif);
};
export const jrLog = (event_key, otherPrm) => {
    if (!(JR_LOG * 1)) {
        return 0;
    }
    const storage = window.localStorage;
    let prm = {};
    let _p = isAppView() === 'ios' ? 'IOS' : isAppView() === 'android' ? 'ANDROID' : 'H5'
    Object.assign(prm, {
        system: _p,
        channel: storage.channel_id || '',
        // source_id: localStorage || '',
        package_name: PACKAGE_NAME,
        app_name: APP_NAME,
        user_id: localStorage.user_id || '',
        token: localStorage.h5_token,
        phone: localStorage.mobile || ''
    }, otherPrm);
    _addJrLog({
        gifUrl: otherPrm && otherPrm.isOnCardAct ? 'https://frio.mifengkong.cn/1.gif' : 'https://frio.mifengkong.cn/3.gif',
        prm: prm,
        event_key: event_key
    });
};
export const setCommonLoginCookie = function () {

    const thisSearch = `?${window.location.href.split('?')[1]}`;

    const hashPrm = searchToObj(thisSearch);
    const {normalKey, phone} = hashPrm;
    if (normalKey) {
        /*存在normalkey 更新token相关参数*/
        const [TIME, userStr] = normalKey.split('TIME')[1].split('UID');
        const [uid, token] = userStr.split('KEY');
        console.log(TIME);
        if (Date.parse(new Date()) / 1000 - TIME < 5) {
            console.log('TOKEN有效 设置全局信息');
            // setCookie('token', token);
            // setCookie('uid', uid);
            localStorage.user_id = uid;
            localStorage.h5_token = token;
            localStorage.mobile = phone;

            return true
        } else {
            console.log('用户参数已经过期');
            return 0;
        }
    }
};
export const frBridge = function (api, parameter, callback) {
    /*
     *  api: 接口名称
     *  parameter: 参数
     *  callBack: 回调函数
     * */
    setupWebViewJavascriptBridge(function (bridge) {
        bridge.callHandler(api, parameter, callback)
    });

};
export const basicInfo = function () {
    let _u = window.navigator.userAgent.split('AND');
    return {
        plat: _u[0],
        package_name: _u[1] ? _u[1].substring(_u[1].indexOf('PackageName') + 11) : '',
        version: _u[2] ? _u[2].substring(_u[2].indexOf('Version') + 7) : ''
    }
}
//判断是否可用frbridge的版本
export const getNew = () => {
    return new Promise(function (resl, rej) {
        let isNew = false;
        setTimeout(function () {
            frBridge('getData', {type: 'version'}, () => {
                isNew = true;
            });
        }, PLAT() === 'ios' ? 100 : 500)

        setTimeout(function () {
            if (isNew) {
                resl(true);
            } else {
                rej(false);
            }
        }, PLAT() === 'ios' ? 300 : 700);

    });
}

//判断是否登录 :兼容三端,及各个版本
export const isLogin = function () {
    return new Promise(function (resolve, reject) {
        const thisSearch = `?${window.location.href.split('?')[1]}`;
        const hashPrm = searchToObj(thisSearch);
        if (hashPrm.plat_type === 'kamaoh5') {
            try {
                if (localStorage.user_id) {
                    resolve(1);
                } else {
                    resolve(0);
                }
            } catch (e) {
                console.log(2);
            }
        } else if (hashPrm.plat_type === 'kamaoapp' || hashPrm.plat_type === 'otherapp') {
            getNew().then((res) => {
                if (res) {
                    frBridge('getData', {type: 'userInfo'}, (res) => {
                        let resObject = JSON.parse(res);
                        if (resObject && resObject.data && resObject.data.user_id) {
                            resolve(1);
                        } else {
                            resolve(0);
                        }
                    })
                } else {
                    if (localStorage.userId) {
                        resolve(1);
                    } else {
                        resolve(0);
                    }
                }
            }).catch(function (e) {
                console.log('e:'+e);
                if (localStorage.userId) {
                    resolve(1);
                } else {
                    resolve(0);
                }
            });
        }


    });
}
//判断是否在app内打开h5
export const isAppView = () => {
    // const thisSearch = `?${window.location.href.split('?')[1]}`;
    // const hashPrm = searchToObj(thisSearch);
    // if (hashPrm.plat_type === 'kamaoapp') {
    //     return true;
    // }else{
    //     return 0;
    // }
    // if (window.navigator.userAgent.indexOf('fengrong') > -1) {
    //     return true;
    // } else {
    //     return 0;
    // }
    try {
        if (PLAT() === 'ios') {
            if (localStorage.kamao_isAppView) {
                return true;
            } else {
                return 0;
            }
        } else if (PLAT() === 'android') {
            if (onCallByH5.shareView && localStorage.package_name === 'cn.rongdao.jrkabao') {
                return true;
            } else {
                return 0;
            }
        } else {
            alert('请用移动端访问');
        }
    } catch (e) {
        console.log(e);
        return 0;
    }
}
//节流函数
//method: 方法
//delay: 间隔时间 毫秒
export const throttle = function (method, delay) {
    var timer = null;
    return function () {
        var context = this, args = arguments;
        clearTimeout(timer);
        timer = setTimeout(function () {
            method.apply(context, args);
        }, delay);
    }
}
//滚动函数
/*
 *eleId:目标元素id
 * isArr:是数组: (列表中使用,可配合图片懒加载,暂时没有开发) 非数组:使用场景举例:滚动操作时隐藏或显示某元素(后面考虑使用函数节流)
 * bias:高度偏值
 * method:具体业务操作方法
 * */
export const onScroll = (eleId, method, isArr = false, bias = 120) => {
    let content = document.getElementById(eleId);
    let seeHeight = document.documentElement.clientHeight;         //可见区域高度
    let srcollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop; //滚动条距离顶部高度
    let curImg;
    if (isArr) {
        // var imgLen = content.children.length;
        // for(let i = 0;i < imgLen; i++){
        //   curImg  = content.children[i].children[0];
        //     if(curImg.offsetTop < (seeHeight + srcollTop-(bias))){
        //         if(curImg.dataset.src != "undefined"){
        //             curImg.setAttribute("src",curImg.dataset.src);
        //         }
        //     }
        // }
    } else {
        curImg = content;
        method(curImg.offsetTop < (seeHeight + srcollTop - (bias)));
    }
}
//柯里化函数,暂时不用
export const curry = function (func) {
    var fixedArgs = [].slice.call(arguments, 1);
    return function () {
        var args = fixedArgs.concat([].slice.call(arguments));
        return func.apply(null, args);

    };
}
// export const DEVICE = window.getDeviceInfo() ? getDeviceInfo('deviceInfoCallBack') : "";