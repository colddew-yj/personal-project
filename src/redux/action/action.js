import { jrRequest } from 'jrbasic';
import  empApi  from './../../compoments/common/api';
import {PLAT} from './../../compoments/common/const';
//统一返回action
export const handleXhr =(res,successType,elseUrl)=>{
    if(res.status==1){ //成功时
        return {
            type: successType,
            val: res.data
        }
    }else{
        if(elseUrl){
            return{//失败时重新登录分两种情况:第一种指定页面,第二种跳登录页
                type: 'errorAlertElseUrl',
                val: res.message,
                elseUrl:elseUrl
            }
        }else {
            return {
                type: 'errorAlert',
                val: res.message
            }
        }
    }
}
const _assign=(data)=>{//合并参数,绝大部分的接口会调用到
    let _data = Object.assign({
        package_name:PACKAGE_NAME,
        source_id	:'tuiguang',
        plat_version: '3.8.0',
        app_union_name:APP_NAME,
        plat_type:PLAT()=='ios'?32:31,
        channel_id:localStorage.channel_id ? localStorage.channel_id : ""
    },data);
    return _data;
}
export const getTipInfo = () => {
    return dispatch => {
        jrRequest({
            requestType: 'POST',
            dispatch: dispatch, /*dispatch方法*/
            jrApi: empApi.getAllTip, /*Api url*/
            successAction: (res)=>{
                return handleXhr(res,'tipInfo');
            }
        })
    }
}
export const getBanner = (data) => {

    return dispatch => {
        jrRequest({
            requestType: 'POST',
            dispatch: dispatch, /*dispatch方法*/
            jrApi: empApi.getBanner, /*Api url*/
            fetchPrm:  _assign({
                code:'quxianH5_index_banner'
            }),
            successAction: (res)=>{
                return handleXhr(res,'getBanner');
            }
        })
    }
}
export const getIndex = (data) => {

    return dispatch => {
        jrRequest({
            requestType: 'POST',
            dispatch: dispatch, /*dispatch方法*/
            jrApi: empApi.getIndex, /*Api url*/
            fetchPrm:  _assign(data),
            successAction: (res)=>{
                return handleXhr(res,'getIndex');
            }
        })
    }
}
export const getDefaultCreditCard = (data) => {
    return dispatch => {
        jrRequest({
            requestType: 'POST',
            dispatch: dispatch, /*dispatch方法*/
            jrApi: empApi.getDefaultCreditCard, /*Api url*/
            fetchPrm:_assign(data) ,
            successAction: (res)=>{
                return handleXhr(res,'defaultCreditCard');
            }
        })
    }
}
export const insertUserInfo = (user_id,token) => {
    return dispatch => {
        jrRequest({
            requestType: 'POST',
            dispatch: dispatch, /*dispatch方法*/
            jrApi: empApi.getMerchantInfo, /*Api url*/
            fetchPrm:_assign( {uid:user_id,
                token:token}),
            successAction: (res)=>{
                return handleXhr(res,'insertUser');
            }
        })
    }
}
export const getUserInfo = (user_id,token) => {
    return dispatch => {
        jrRequest({
            requestType: 'POST',
            dispatch: dispatch, /*dispatch方法*/
            jrApi: empApi.getUserIdentityInfo, /*Api url*/
            fetchPrm:_assign( {uid:user_id,
                token:token}),
            successAction: (res)=>{
                return handleXhr(res,'userInfo');
            }
        })
    }
}
export const createOrder = (data) => {
    return dispatch => {
        jrRequest({
            requestType: 'POST',
            dispatch: dispatch, /*dispatch方法*/
            jrApi: empApi.createOrder, /*Api url*/
            fetchPrm:_assign(data),
            successAction: (res)=>{
                return handleXhr(res,'createOrder');
            }
        })
    }
}
export const getOrderSuccess = (data) => {
    return dispatch => {
        jrRequest({
            requestType: 'POST',
            dispatch: dispatch, /*dispatch方法*/
            jrApi: empApi.orderSuccess, /*Api url*/
            fetchPrm:_assign(data),
            successAction: (res)=>{
                return handleXhr(res,'orderSuccess');
            }
        })
    }
}
export const invitationReward = (data) => {
    return dispatch => {
        jrRequest({
            requestType: 'POST',
            dispatch: dispatch, /*dispatch方法*/
            jrApi: empApi.invitationReward, /*Api url*/
            fetchPrm:_assign(data),
            successAction: (res)=>{
                return handleXhr(res,'invitationReward','/#/encashment/login?goBack=1');
            }
        })
    }
}
export const getInvitationUsers = (data) => {
    return dispatch => {
        jrRequest({
            requestType: 'POST',
            dispatch: dispatch, /*dispatch方法*/
            jrApi: empApi.getInvitationUsers, /*Api url*/
            fetchPrm:_assign(data),
            successAction: (res)=>{
                return handleXhr(res,'invitationUsersData','/#/encashment/login?goBack=1');
            }
        })
    }
}
export const getHotCardList = (data) => {
    return dispatch => {
        jrRequest({
            requestType: 'POST',
            dispatch: dispatch, /*dispatch方法*/
            jrApi: empApi.getHotCardList, /*Api url*/
            fetchPrm:data,
            successAction: (res)=>{
                return handleXhr(res,'getHotCardList');
            }
        })
    }
}
export const getHotbanklist = (data) => {
    return dispatch => {
        jrRequest({
            requestType: 'POST',
            dispatch: dispatch, /*dispatch方法*/
            jrApi: empApi.getHotbanklist, /*Api url*/
            fetchPrm:data,
            successAction: (res)=>{
                return handleXhr(res,'getHotbanklist');
            }
        })
    }
}
export const getprogress = (data) => {
    return dispatch => {
        jrRequest({
            requestType: 'POST',
            dispatch: dispatch, /*dispatch方法*/
            jrApi: empApi.getprogress, /*Api url*/
            fetchPrm:data,
            successAction: (res)=>{
                return handleXhr(res,'getprogress');
            }
        })
    }
}
export const getBankcredit = (data) => {
    return dispatch => {
        jrRequest({
            requestType: 'POST',
            dispatch: dispatch, /*dispatch方法*/
            jrApi: empApi.getBankcredit, /*Api url*/
            fetchPrm:data,
            successAction: (res)=>{
                return handleXhr(res,'getBankcredit');
            }
        })
    }
}
export const getBankList = (data) => {
    return dispatch => {
        jrRequest({
            requestType: 'POST',
            dispatch: dispatch, /*dispatch方法*/
            jrApi: empApi.getBankListAndIcon, /*Api url*/
            fetchPrm:data,
            successAction: (res)=>{
                return handleXhr(res,'bankListAndIcon');
            }
        })
    }
}
export const cityList = (data) => {
    return dispatch => {
        jrRequest({
            requestType: 'POST',
            dispatch: dispatch, /*dispatch方法*/
            jrApi: empApi.getcity, /*Api url*/
            fetchPrm:data,
            successAction: (res)=>{
                return handleXhr(res,'cityList');
            }
        })
    }
}
export const indexRedPoint = (data) => {
    return dispatch => {
        jrRequest({
            requestType: 'POST',
            dispatch: dispatch, /*dispatch方法*/
            jrApi: empApi.indexRedPoint, /*Api url*/
            fetchPrm:data,
            successAction: (res)=>{
                return handleXhr(res,'indexRedPoint');
            }
        })
    }
}
export const myMessage = (data) => {
    return dispatch => {
        jrRequest({
            requestType: 'POST',
            dispatch: dispatch, /*dispatch方法*/
            jrApi: empApi.myMessage, /*Api url*/
            fetchPrm:data,
            successAction: (res)=>{
                return handleXhr(res,'myMessage');
            }
        })
    }
}
export const getAdMessage = (data) => {
    return dispatch => {
        jrRequest({
            requestType: 'POST',
            dispatch: dispatch, /*dispatch方法*/
            jrApi: empApi.getAdMessage, /*Api url*/
            fetchPrm:data,
            successAction: (res)=>{
                return handleXhr(res,'getAdMessage');
            }
        })
    }
}
export const getSysMessage = (data) => {
    return dispatch => {
        jrRequest({
            requestType: 'POST',
            dispatch: dispatch, /*dispatch方法*/
            jrApi: empApi.getSysMessage, /*Api url*/
            fetchPrm:data,
            successAction: (res)=>{
                return handleXhr(res,'getSysMessage');
            }
        })
    }
}
export const messageDetail = (data) => {
    return dispatch => {
        jrRequest({
            requestType: 'POST',
            dispatch: dispatch, /*dispatch方法*/
            jrApi: empApi.messageDetail, /*Api url*/
            fetchPrm:data,
            successAction: (res)=>{
                return handleXhr(res,'messageDetail');
            }
        })
    }
}
export const getUserBalance = (data) => {
    return dispatch => {
        jrRequest({
            requestType: 'POST',
            dispatch: dispatch, /*dispatch方法*/
            jrApi: empApi.getUserBalance, /*Api url*/
            fetchPrm:data,
            successAction: (res)=>{
                return handleXhr(res,'messageDetail');
            }
        })
    }
}
export const getCoupon = (data) => {
    return dispatch => {
        jrRequest({
            requestType: 'POST',
            dispatch: dispatch, /*dispatch方法*/
            jrApi: empApi.getCoupon, /*Api url*/
            fetchPrm:data,
            successAction: (res)=>{
                return handleXhr(res,'getCoupon');
            }
        })
    }
}
export const getValidCoupon = (data) => {
    return dispatch => {
        jrRequest({
            requestType: 'POST',
            dispatch: dispatch, /*dispatch方法*/
            jrApi: empApi.getValidCoupon, /*Api url*/
            fetchPrm:data,
            successAction: (res)=>{
                return handleXhr(res,'getValidCoupon');
            }
        })
    }
}
export const getFinancialByPage = (data) => {
    return dispatch => {
        jrRequest({
            requestType: 'POST',
            dispatch: dispatch, /*dispatch方法*/
            jrApi: empApi.getFinancialByPage, /*Api url*/
            fetchPrm:_assign(data),
            successAction: (res)=>{
                return handleXhr(res,'getFinancialByPage');
            }
        })
    }
}
