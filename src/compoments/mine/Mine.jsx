import  React from 'react';
import  {connect}from 'react-redux';
import {Toast} from 'antd-mobile';
import {getUserBalance} from '../../redux/action/action';
import {jrLog} from '../common/const';

class Mine extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            balance: ''
        }
    }

    componentDidMount() {
        Toast.hide();
        // if (localStorage.user_id) {
        //     fetchHander(this, empApi.getUserBalance, {
        //         user_id: localStorage.user_id
        //     }, false, true).then((data) => {
        //         this.setState({
        //             balance: data.balance
        //         })
        //     })
        // }
    }

    goBack() {
        this.props.history.push('/encashment');
    }

    toLogin() {
        jrLog('kamao_my_denglu_70');
        this.props.history.push('/encashment/login?goBack=1')
    }

    toNext(type) {

        switch (type) {
            case 0:
                jrLog('kamao_my_mycrash_62');
                if (!localStorage.user_id) {
                    this.props.history.push('/encashment/login?goBack=1');
                    return false;
                }
                this.props.history.push('/encashment/couponList');
                break;
            case 1:
                jrLog('kamao_my_myquxian_63');
                if (!localStorage.user_id) {
                    this.props.history.push('/encashment/login?goBack=1');
                    return false;
                }
                this.props.history.push('/encashment/dealList')
                break;
            case 2:
                jrLog('kamao_my_problem_65');
                this.props.history.push('/encashment/ques');
                break;
            case 3:
                jrLog('kamao_my_shezhi_66');
                this.props.history.push('/encashment/setting');
                break;
        }
    }

    toCardList() {
        jrLog('kamao_my_mybaobao_60');
        if (!localStorage.user_id) {
            this.props.history.push('/encashment/login?goBack=1');
            return false;
        }
        this.props.history.push('/encashment/cardList');
    }

    torecommend() {
        jrLog('kamao_my_myfuli_61');
        if (!localStorage.user_id) {
            this.props.history.push('/encashment/login?goBack=1');
            return false;
        }
        this.props.history.push('/encashment/commandPacket?plat_type=kamaoh5');
    }

    toAccount() {
        // jrLog('kamao_my_myaccout_74');
        // this.props.history.push('/encashment/myAccount');
    }

    render() {
        let mobileStyle = {
            position: 'relative',
            top: '-.5rem'
        }
        return (<div className="mine">
                <title>我的</title>
                <div className="head">
                    <div className="headContent">
                        <div className="flex">
                            <span onClick={this.goBack.bind(this)}><img
                                src={require('../../images/arrows/fanhui@2x.png')} alt=""/></span>
                            <span>我的</span>
                            <span ></span>
                        </div>
                        <div className="userInfo">
                            <div style={localStorage.user_id || localStorage.userId ? {} : {display: 'none'}}
                                 onClick={this.toAccount.bind(this)}>
                                <img src={require('../../images/V2/user.png')} alt=""/>
                                <div className="login">
                                    <div style={mobileStyle}>{localStorage.mobile}</div>
                                    <div style={{display: 'none'}}>活动账户 :
                                        <span>{this.state.balance ? this.state.balance : ''}元</span> <img
                                            src={require('../../images/arrows/16.png')} alt=""/></div>
                                </div>
                            </div>
                            <div onClick={this.toLogin.bind(this)}
                                 style={localStorage.user_id || localStorage.userId ? {display: 'none'} : {}}>
                                <img src={require('../../images/V2/user.png')} alt=""/>
                                <div className="noLogin">未登录
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="tab flex">
                        <div onClick={this.toCardList.bind(this)}><img src={require('../../images/V2/icon_5@1x.png')}
                                                                       alt=""/>
                            <div className="text">我的卡包</div>
                        </div>
                        <div onClick={this.torecommend.bind(this)}><img src={require('../../images/V2/gift.png')}
                                                                        alt=""/>
                            <div className="text">卡猫福利</div>
                        </div>
                    </div>
                    <section>
                        <div className="flex" onClick={this.toNext.bind(this, 0)}>
                            <div><img src={require('../../images/V2/quan_blue@2x.png')} alt=""/></div>
                            <div>我的现金券</div>
                            <div><img src={require('../../images/arrows/8.png')} alt=""/></div>
                        </div>
                        <div className="flex" onClick={this.toNext.bind(this, 1)}>
                            <div><img src={require('../../images/V2/li3_icon_1@2x.png')} alt=""/></div>
                            <div>刷卡收款记录</div>
                            <div><img src={require('../../images/arrows/8.png')} alt=""/></div>
                        </div>
                        <div className="flex" onClick={this.toNext.bind(this, 2)}>
                            <div><img src={require('../../images/V2/li2_icon_4@2x.png')} alt=""/></div>
                            <div>常见问题</div>
                            <div><img src={require('../../images/arrows/8.png')} alt=""/></div>
                        </div>
                        <div className="flex" onClick={this.toNext.bind(this, 3)}>
                            <div><img src={require('../../images/V2/li2_icon_5@2x.png')} alt=""/></div>
                            <div>设置</div>
                            <div><img src={require('../../images/arrows/8.png')} alt=""/></div>
                        </div>
                    </section>

                </div>


            </div>
        )

    }
}

Mine.contextTypes = {
    router: React.PropTypes.object.isRequired
};
const mapStateToProps = (state) => {
    return {
        getUserBalanceData: state.update.getUserBalanceData
    }
}
export  default  connect(mapStateToProps, {getUserBalance})(Mine)