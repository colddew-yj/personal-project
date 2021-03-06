const empApi = {
    getAllTip:'Cash/getAllTip',
    getIndex:'Cash/getIndex',
    getBankInfo:'Cash/getBankInfo',
    getDefaultCreditCard:'Cash/getDefaultCreditCard',
    login: '/user/login',
    getLoginCode:'/user/getUserAppLoginCheckCode',
    getCode: '/Cash/sendVerify',
    getBankInfo:'Cash/getBankInfo',
    addCreditCard:'Cash/addCreditCard',
    getMerchantInfo:'Cash/insertUser',
    getUserIdentityInfo:'user/getUserIdentityInfo',
    addBankCard:'Cash/addBankCard',
    addIdPhoto: '/userProfile/addIdPhoto',
    editUserIdentityInfo:'/User/editUserIdentityInfo',
    createOrder:'Cash/createOrder',
    debit:'Cash/debit',
    orderSuccess:'Cash/orderSuccess',
    getCreditCardList:'Cash/getCreditCardList',
    getBankCardList:'Cash/getBankCardList',
    getTradeLog:'Cash/getTradeLogByMonth',
    deleteCreditCard:'Cash/deleteCreditCard',
    setDefaultCreditCard:'Cash/setDefaultCreditCard',
    getBanner:'/Adv/getBanner',
    getConfig:'/Channel/getConfig',
    getVerificationCodeConfig: '/Config/getVerificationCodeConfig',
    invitationReward:'/Invitation/invitationReward',
    getInvitationUsers:'/Invitation/getInvitationUsers',
    getInvitationQRCode:'Invitation/getInvitationQRCode',
    getHotCardList:'/Feature/fourfeature',
    getHotbanklist:'/bank/banklist',
    getprogress:'/bank/getprogress',
    getBankcredit:'/bank/bankcredit',
    getFinancialNumber:'/Financial/getFinancialNumber',
    FinancialRegister:'/Financial/FinancialRegister',
    wxBankList:'/share/bankList',
    getBankListAndIcon:'/Cash/getBankListAndIcon',
    myMessage:'/Message/myMessage',
    getAdMessage:'/Message/getAdMessage',
    getSysMessage:'/Message/getSysMessage',
    messageDetail:'Message/messageDetail',
    indexRedPoint:'Cash/indexRedPoint',
    getUserBalance:'/Invitation/getUserBalance',
    getCoupon:'coupon/getCoupon',
    getValidCoupon:'coupon/getValidCoupon',
    getFinancialByPage:'/Financial/getFinancialByPage',
    getcity:'bank/getcity',
    getUserStatus:'/Cash/getUserStatus',
    getCouponByActive:'/Cash/getCouponByActive',
    sendCouponByCommand:'coupon/sendCouponByCommand'

}
export default  empApi
