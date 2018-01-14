// reducers/index.js
import { combineReducers } from 'redux'; // 利用combineReducers 合并reducers
import { routerReducer } from 'react-router-redux'; // 将routerReducer一起合并管理
// import AlertInfo from './../../compoments/common/AlertInfo';
const initialState = {
    defaultCreditCardData:'NOLOAD',
    userInfoData:'NOLOAD',
    createOrderData:'NOLOAD',
    orderSuccessData:'NOLOAD',
    getIndexData:'NOLOAD',
    getBannerData:'NOLOAD',
    invitationReward:'NOLOAD',
    invitationUsersData:'NOLOAD',
    getHotCardListData:'NOLOAD',
    getHotbanklistData:'NOLOAD',
    getprogressData:'NOLOAD',
    getBankcreditData:'NOLOAD',
    insertUserData:'NOLOAD',
    bankListAndIconData:'NOLOAD',
    indexRedPointData:'NOLOAD',
    myMessageData:'NOLOAD',
    getAdMessageData:'NOLOAD',
    getSysMessageData:'NOLOAD',
    messageDetailData:'NOLOAD',
    getUserBalanceData:'NOLOAD',
    getCouponData:'NOLOAD',
    getValidCouponData:'NOLOAD',
    getFinancialByPageData:'NOLOAD',
    cityListData:'NOLOAD',


};
export default combineReducers({
    update,
    routing: routerReducer
});
//  changeShow=()=>{
//     this.setState({
//         showAlert:false
//     })
// }
// autoClose=()=>{
//     window.clearAlert =  setTimeout(()=>{
//         this.setState({
//             showAlert:false
//         })
//
//     },this.state.closeTime);
// }
function update(state = initialState, action) {
    switch (action.type){
        case "errorAlert":
        case "errorAlertElseUrl":
            alert(action.val);
            if(action.val.indexOf('重新登录') > -1){
                if(action.elseUrl){
                    window.location.href=action.elseUrl;
                }else{
                    window.location.href="/#/encashment/login?goBack=1";
                }

            }
            return Object.assign({},state,{ errorAlert: action.val });
        case "getBanner" :   return Object.assign({},state,{getBannerData:action.val});
        case "getIndex" :   return Object.assign({},state,{getIndexData:action.val});
        case "defaultCreditCard":  return Object.assign({},state,{defaultCreditCardData:action.val});
        case "userInfo":  return Object.assign({},state,{userInfoData:action.val});
        case "insertUser":  return Object.assign({},state,{insertUserData:action.val});
        case "createOrder":  return Object.assign({},state,{createOrderData:action.val});
        case "orderSuccess":  return Object.assign({},state,{orderSuccessData:action.val});
        case "invitationReward":  return Object.assign({},state,{invitationRewardData:action.val});
        case "invitationUsersData":  return Object.assign({},state,{invitationUsersData:action.val});
        case "getHotCardList":  return Object.assign({},state,{getHotCardListData:action.val});
        case "getHotbanklist":  return Object.assign({},state,{getHotbanklistData:action.val});
        case "getprogress":  return Object.assign({},state,{getprogressData:action.val});
        case "getBankcredit":  return Object.assign({},state,{getBankcreditData:action.val});
        case "bankListAndIcon":  return Object.assign({},state,{bankListAndIconData:action.val});
        case "indexRedPoint":  return Object.assign({},state,{indexRedPointData:action.val});
        case "myMessage":  return Object.assign({},state,{myMessageData:action.val});
        case "getAdMessage":  return Object.assign({},state,{getAdMessageData:action.val});
        case "getSysMessage":  return Object.assign({},state,{getSysMessageData:action.val});
        case "messageDetail":  return Object.assign({},state,{messageDetailData:action.val});
        case "getUserBalance":  return Object.assign({},state,{getUserBalanceData:action.val});
        case "getCoupon":  return Object.assign({},state,{getCouponData:action.val});
        case "getValidCoupon":  return Object.assign({},state,{getValidCouponData:action.val});

        case "getFinancialByPage":  return Object.assign({},state,{getFinancialByPageData:action.val});

        case "cityList":  return Object.assign({},state,{cityListData:action.val});

        default : return state;
    }
}