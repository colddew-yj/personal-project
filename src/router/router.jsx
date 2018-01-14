import React, { PropTypes } from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import {fetchPost,remSet} from 'jrbasic';
import emApi from "./../compoments/common/api";
import 'normalize.css';
remSet(document,window);
import {Toast} from 'antd-mobile';


//获取公共提示信息
const getTipInfo=()=>{
    fetchPost(emApi.getAllTip).then((res)=>{
        if(res.status===1){
            window.tipInfo = res.data.tip;
        }else{
            alert(res.message|| '网络异常');
        }
    })
}
!window.tipInfo && getTipInfo();

//按需加载
const EncashmentIndex = (location, callback) => {
    require.ensure([], require => {
        callback(null, require('./../compoments/EncashmentIndex').default)
    },'EncashmentIndex')
};
const SwiperCard = (location, callback) => {
    require.ensure([], require => {
        callback(null, require('./../compoments/SwiperCard').default)
    },'SwiperCard')
}
const CardIdValid = (location, callback) => {
    require.ensure([], require => {
        callback(null, require('./../compoments/CardIdValid').default)
    },'CardIdValid')
}
const IdConfirm = (location, callback) => {
    require.ensure([], require => {
        callback(null, require('./../compoments/IdConfirm').default)
    },'IdConfirm')
}
const Oncard = (location, callback) => {
    require.ensure([], require => {
        callback(null, require('./../compoments/Oncard').default)
    },'Oncard')
}
const ConfirmPay = (location, callback) => {
    require.ensure([], require => {
        callback(null, require('./../compoments/ConfirmPay').default)
    },'ConfirmPay')
}
const CardResult = (location, callback) => {
    require.ensure([], require => {
        callback(null, require('./../compoments/CardResult').default)
    },'CardResult')
}
const CardList = (location, callback) => {
    require.ensure([], require => {
        callback(null, require('./../compoments/CardList').default)
    },'CardList')
}

const DealList = (location, callback) => {
    require.ensure([], require => {
        callback(null, require('./../compoments/DealList').default)
    },'DealList')
}

const Ques = (location, callback) => {
    require.ensure([], require => {
        callback(null, require('../compoments/textTpl/Ques').default)
    },'Ques')
}
const Login = (location, callback) => {
    require.ensure([], require => {
        callback(null, require('./../compoments/Login').default)
    },'SwiperCard')
}
// const SpreadLogin = (location, callback) => {
//     require.ensure([], require => {
//         callback(null, require('../compoments/initTpl/SpreadLogin').default)
//     },'SpreadLogin')
// }
const Protocol = (location, callback) => {
    require.ensure([], require => {
        callback(null, require('../compoments/textTpl/Protocol').default)
    },'Protocol')
}
const Protocol2 = (location, callback) => {
    require.ensure([], require => {
        callback(null, require('../compoments/textTpl/Protocol2').default)
    },'Protocol2')
}
const DealTime = (location, callback) => {
    require.ensure([], require => {
        callback(null, require('./../compoments/DealTime').default)
    },'DealTime')
}
const TempAF = (location, callback) => {
    require.ensure([], require => {
        callback(null, require('./../compoments/TempAF').default)
    },'TempAF')
}
const BankList = (location, callback) => {
    require.ensure([], require => {
        callback(null, require('./../compoments/BankList').default)
    },'getBankList')
}
const MyAccount = (location, callback) => {
    require.ensure([], require => {
        callback(null, require('./../compoments/mine/MyAccount').default)
    },'_myAccount')
}
//错误页面
const ErrorInfo = (location, callback) => {
    require.ensure([], require => {
        callback(null, require('./../compoments/plugins/ErrorInfo/ErrorInfo').default)
    },'ErrorInfo')
}
//老邀新活动页面
const Recommend = (location, callback) => {
    require.ensure([], require => {
        callback(null, require('../compoments/recommendTpl/Recommend').default)
    },'Recommend')
}
const RecordList = (location, callback) => {
    require.ensure([], require => {
        callback(null, require('../compoments/recommendTpl/RecordList').default)
    },'RecordList')
}
const RecomReward = (location, callback) => {
    require.ensure([], require => {
        callback(null, require('../compoments/recommendTpl/RecomReward').default)
    },'RecomReward')
}
const RecashRulesList = (location, callback) => {
    require.ensure([], require => {
        callback(null, require('../compoments/textTpl/RecashRulesList').default)
    },'RecashRulesList')
}
const RecommRulesList = (location, callback) => {
    require.ensure([], require => {
        callback(null, require('../compoments/recommendTpl/RecommRulesList').default)
    },'recommRulesList')
}
const FinincList = (location, callback) => {
    require.ensure([], require => {
        callback(null, require('../compoments/bannerJumpTpl/Financing').default)
    },'_FinincList')
}
const Mine = (location, callback) => {
    require.ensure([], require => {
        callback(null, require('../compoments/mine/Mine').default)
    },'_exMine')
}
const CouponList = (location, callback) => {
    require.ensure([], require => {
        callback(null, require('../compoments/mine/CouponList').default)
    },'_exCouponList')
}
const Setting = (location, callback) => {
    require.ensure([], require => {
        callback(null, require('../compoments/mine/Setting').default)
    },'_Setting')
}
const About = (location, callback) => {
    require.ensure([], require => {
        callback(null, require('../compoments/mine/About').default)
    },'_exAbout')
}
const Message = (location, callback) => {
    require.ensure([], require => {
        callback(null, require('../compoments/mes/Message').default)
    },'_exMessage')
}
const MesList = (location, callback) => {
    require.ensure([], require => {
        callback(null, require('../compoments/mes/MesList').default)
    },'_MesList')
}
const MesDetail = (location, callback) => {
    require.ensure([], require => {
        callback(null, require('../compoments/mes/MesDetail').default)
    },'_MesDetail')
}
const AdvList = (location, callback) => {
    require.ensure([], require => {
        callback(null, require('../compoments/mes/AdvList').default)
    },'_advList')
}
const ChooseCoupon = (location, callback) => {
    require.ensure([], require => {
        callback(null, require('../compoments/ChooseCoupon').default)
    },'_ChooseCoupon')
}
const CityList = (location, callback) => {
    require.ensure([], require => {
        callback(null, require('../compoments/CityList').default)
    },'CityList')
}
//办卡页面
const GetCard = (location, callback) => {
    require.ensure([], require => {
        callback(null, require('../compoments/cardTpl/GetCard').default)
    },'GetCard')
}
const GetCardProgress = (location, callback) => {
    require.ensure([], require => {
        callback(null, require('../compoments/cardTpl/GetCardProgress').default)
    },'GetCardProgress')
}
const GetBankCards = (location, callback) => {
    require.ensure([], require => {
        callback(null, require('../compoments/cardTpl/GetBankCards').default)
    },'GetBankCards')
}
//说明页面
const ManInstruc = (location, callback) => {
    require.ensure([], require => {
        callback(null, require('../compoments/textTpl/ManInstruc').default)
    },'ManInstruc')
}
const ManInstrucPic = (location, callback) => {
    require.ensure([], require => {
        callback(null, require('../compoments/textTpl/ManInstrucPic').default)
    },'ManInstrucPic')
}
const CashInstruc = (location, callback) => {
    require.ensure([], require => {
        callback(null, require('../compoments/textTpl/CashInstruc').default)
    },'_CashInstruc')
}
const ExpireInstruc = (location, callback) => {
    require.ensure([], require => {
        callback(null, require('../compoments/textTpl/ExpireInstruc').default)
    },'ExpireInstruc')
}
//banner跳转页面
// const Nianqianan = (location, callback) => {
//     require.ensure([], require => {
//         callback(null, require('../compoments/bannerJumpTpl/Nianqianan').default)
//     },'Nianqianan')
// }
const Statement = (location, callback) => {
    require.ensure([], require => {
        callback(null, require('../compoments/bannerJumpTpl/Statement').default)
    },'Statement')
}
const FullBackAct = (location, callback) => {
    require.ensure([], require => {
        callback(null, require('../compoments/bannerJumpTpl/FullBackAct').default)
    },'FullBackAct')
}
const CommandPacketBanner = (location, callback) => {
    require.ensure([], require => {
        callback(null, require('../compoments/bannerJumpTpl/CommandPacketBanner').default)
    },'CommandPacketBanner')
}
//微信内置页面
const BalanceList = (location, callback) => {
    require.ensure([], require => {
        callback(null, require('../compoments/wxpageTpl/BalanceList').default)
    },'BalanceList')
}
//下载页
const  Download= (location, callback) => {
    require.ensure([], require => {
        callback(null, require('../compoments/textTpl/Download').default)
    },'_download')
}
//banner活动页
const  NewAct= (location, callback) => {
    require.ensure([], require => {
        callback(null, require('../compoments/bannerJumpTpl/NewAct').default)
    },'NewAct')
}
const  OncardAct= (location, callback) => {
    require.ensure([], require => {
        callback(null, require('../compoments/bannerJumpTpl/OncardAct').default)
    },'OncardAct')
}
const  CommandPacket= (location, callback) => {
    require.ensure([], require => {
        callback(null, require('../compoments/bannerJumpTpl/CommandPacket').default)
    },'_CommandPacket')
}
//测试页
const Test = (location, callback) => {
    require.ensure([], require => {
        callback(null, require('./../compoments/Test').default)
    },'Test')
}


const Routes = ({ history }) => {
    return <Router history={ history }>
                <Route path="/encashment" >
                    {/*首页*/}
                    <IndexRoute getComponent={EncashmentIndex}/>
                    {/*输入金额页面*/}
                    <Route path='swiperCard' getComponent={ SwiperCard } />
                    {/*身份验证页面(二要素)*/}
                    <Route path='cardIdValid' getComponent={ CardIdValid } />
                    {/*确认身份*/}
                    <Route path='idConfirm' getComponent={ IdConfirm } />
                    {/*绑卡,信用卡,储蓄卡*/}
                    <Route path='oncard' getComponent={ Oncard } />
                    {/*确认订单页面*/}
                    <Route path='confirmPay' getComponent={ ConfirmPay } />
                    {/*订单完成页面*/}
                    <Route path='cardResult' getComponent={ CardResult} />
                    {/*我的--我的卡包页面*/}
                    <Route path='CardList' getComponent={ CardList } />
                    {/*我的--刷卡(交易)记录页面*/}
                    <Route path='dealList' getComponent={ DealList } />
                    {/*常见问题*/}
                    <Route path='ques' getComponent={ Ques } />
                    {/*登录页*/}
                    <Route path='login' getComponent={ Login } />
                    {/*落地页-暂时不用*/}
                    {/*<Route path='spreadLogin' getComponent={ SpreadLogin } />*/}
                    {/*连个协议相关说明页面*/}
                    <Route path='protocol' getComponent={ Protocol } />
                    <Route path='protocol2' getComponent={ Protocol2 } />
                    {/*老邀新页面(分享相关)*/}
                    <Route path='recommend' getComponent={ Recommend } />
                    {/*分享记录*/}
                    <Route path='recordList' getComponent={ RecordList } />
                    {/*分享奖励*/}
                    <Route path='recomReward' getComponent={ RecomReward } />
                    {/*分享规则*/}
                    <Route path='recommRulesList' getComponent={ RecommRulesList } />
                    {/*提现规则页面*/}
                    <Route path='recashRulesList' getComponent={ RecashRulesList } />
                    {/*首页-办卡页面*/}
                    <Route path='getCard' getComponent={ GetCard } />
                    {/*办卡进度*/}
                    <Route path='getCardProgress' getComponent={ GetCardProgress } />
                    {/*具体银行下的卡列表*/}
                    <Route path='getBankCards' getComponent={ GetBankCards } />
                    {/*两个说明页面*/}
                    <Route path='manInstruc' getComponent={ ManInstruc } />
                    <Route path='manInstrucPic' getComponent={ ManInstrucPic } />
                    {/*念钱安/理财产品页面*/}
                    {/*<Route path='nianqianan' getComponent={ Nianqianan } />*/}
                    {/*声明页面*/}
                    <Route path='statement' getComponent={ Statement } />
                    {/*交易时间页面*/}
                    <Route path='dealTime' getComponent={ DealTime } />
                    {/*在微信端才有效的银行余额查询页面*/}
                    <Route path='balanceList' getComponent={ BalanceList } />
                    {/*取现公告*/}
                    <Route path='tempAF' getComponent={ TempAF } />
                    {/*选择银行(银行列表)*/}
                    <Route path='bankList' getComponent={ BankList } />
                    {/*首页--消息相关页面*/}
                    <Route path='message' getComponent={ Message } />
                    <Route path='mesList' getComponent={ MesList } />
                    <Route path='mesDetail' getComponent={ MesDetail } />
                    <Route path='advList' getComponent={ AdvList } />
                    {/*首页--我的 相关页面*/}
                    <Route path='mine' getComponent={ Mine } />
                    <Route path='couponList' getComponent={ CouponList } />
                    <Route path='setting' getComponent={ Setting } />
                    <Route path='about' getComponent={ About } />
                    {/*理财列表页面:目前无入口*/}
                    <Route path='finincList' getComponent={ FinincList } />
                    {/*选择现金券页面*/}
                    <Route path='chooseCoupon' getComponent={ ChooseCoupon } />
                    {/*app端我的账户跳转页*/}
                    <Route path='myAccount' getComponent={ MyAccount } />
                    {/*城市列表页(定位城市)*/}
                    <Route path='cityList' getComponent={ CityList } />
                    {/*app下载页*/}
                    <Route path='download' getComponent={ Download } />
                    {/*收单免刷(新人专项)活动页*/}
                    <Route path='newAct' getComponent={ NewAct } />
                    {/*获取红包活动页*/}
                    <Route path='oncardAct' getComponent={ OncardAct } />
                    {/*满减活动页*/}
                    <Route path='fullBackAct' getComponent={ FullBackAct } />
                    {/*我的--卡猫福利:口令红包活动页*/}
                    <Route path='commandPacket' getComponent={ CommandPacket } />
                    {/*取现说明页*/}
                    <Route path='cashInstruc' getComponent={ CashInstruc } />
                    {/*微信口令红包活动页*/}
                    <Route path='commandPacketBanner' getComponent={ CommandPacketBanner } />
                    {/*理财活动下架通知页*/}
                    <Route path='expireInstruc' getComponent={ ExpireInstruc } />

            <Route path='tempAF' getComponent={ TempAF } />
        </Route>
        <Route path='/error' getComponent={ ErrorInfo } />
        <Route path='test' getComponent={ Test } />
    </Router>
};

Routes.propTypes = {
    history: PropTypes.any,
};
export default Routes;