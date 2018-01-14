import  React from 'react';
import  {connect}from 'react-redux';
import {getDefaultCreditCard} from './../redux/action/action';
import  TitleNav from './plugins/TitleNav/TitleNav';
import Concat from './plugins/Concat/Concat';
import { fetchHander , setPreUrl } from './common/const';
import empApi from './common/api';
import LoadView from './common/LoadView';
import {Toast, Icon} from 'antd-mobile';
import { jrLog } from './common/const';


class SwiperCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            amount: '0',
            showList: false,
            bankList: [],
            defaultCardIndex: '',
            institution_id:''
        }
    }

    componentDidMount() {
        //清除上一页返回的银行信息
        this.setState({
            institution_id:localStorage.institution_id
        })

        if (localStorage.bankName) {
            localStorage.bankName = "";
            localStorage.bankImg = "";

        }
        localStorage.cardNum = "";
        //兼容app的userId,token
        if (localStorage.userId) {
            localStorage.user_id = localStorage.userId;
            localStorage.userId = '';
        }
        if (localStorage.token) {
            localStorage.h5_token = localStorage.token;
            localStorage.token = '';
        }
        this.props.getDefaultCreditCard({//获取默认信用卡信息
            user_id: localStorage.user_id ? localStorage.user_id : '',
            token: localStorage.h5_token ? localStorage.h5_token : '',
            institution_id:localStorage.institution_id
        });
        if (this.state.amount === '0.00' && localStorage.amount) {//将用户输入的金额缓存
            this.setState({
                amount: localStorage.amount
            })
        }
    }

    next(is_identity, is_credit, is_bank) {
        /*
        * 下一步的操作判断: 用户已登录(登录后返回到这个页面) -> 用户输入的金额大于后台返回的最小值 -> 身份验证 ->  绑定信用卡,绑定储蓄卡 (绑定后后返回到这个页面) -> 去取现
        * */
        jrLog('kamao_shuaka_clickquxian_17');
        if (!localStorage.user_id || !localStorage.h5_token) {
            this.props.history.push('/encashment/login');
        } else if (!localStorage.amount || localStorage.amount < this.props.defaultCreditCardData.perCardMinLimit) {
            Toast.fail('输入金额不能小于' + this.props.defaultCreditCardData.perCardMinLimit + '元', 2);
        } else if (is_identity == 0) {//未验证身份
            this.props.history.push('/encashment/cardIdValid');
        } else if (is_credit == 0) {//未验证信用卡
            this.props.history.push('/encashment/oncard?type=1');
        } else if (is_bank == 0) {//未验证储蓄卡
            this.props.history.push('/encashment/oncard?type=0');
        } else {//确定取现
            this.props.history.push('/encashment/confirmPay');
        }
    }

    concat(event) {
        setTimeout(() => {
            this.setState({
                showModal: true
            });
        }, 200);
    }

    hideModal() {
        this.setState({
            showModal: false
        });
    }

    getNum(e) {//设置数字键盘输入的值显示到金额区 ,需在后台返回的额度内,且要同步localStrage里的金额数据
        let _state = e.target.value;
        let _n = (_state.split('.')).length;
        if (_n > 2) {
            return false;
        }
        if (this.state.amount === '0' && !localStorage.amount) {
            var s = _state.substring(1, _state.length);
            this.setState({
                amount: s
            });
            localStorage.amount = s;
            return false
        }
        if (String(this.state.amount).indexOf('.') !== -1) {
            let _index = _state.indexOf('.');
            let length = _state.substring(_index + 1).length;
            if (length > 2) {
                _state = parseInt(Number(_state) * 100) / 100;
            }
        }
        let _dayCardLimit = this.props.defaultCreditCardData.dayCardLimit;
        let sumAmount = this.props.defaultCreditCardData.sumAmount;
        let cardNum = Number(this.props.defaultCreditCardData.perCardLimit);
        let payedNum = Number(_dayCardLimit > sumAmount ? sumAmount : _dayCardLimit);
        let _sum = Number(payedNum > cardNum ? cardNum : payedNum);

        if (Number(_state) > sumAmount) {
            Toast.fail('银行卡日取现不能超过5万,请换卡重试', 2);
            return false;
        }
        if (Number(_state) > cardNum) {
            Toast.fail('单笔取现金额不能超过2万', 2);
            return false;
        }

        localStorage.amount = Number(_state) > _sum ? _sum : _state
        this.setState({
            amount: localStorage.amount
        });

    }

    toHander() {
        // let _url = !localStorage.user_id ? "/encashment/login" : "/encashment/ques";
        this.props.history.push('/encashment' +
            '' +
            '' +
            '/ques');
    }

    changCard(val,isnew) {
        jrLog('kamao_shuaka_change_15');
        if (val === 1) {//更换信用卡
            Toast.loading('loading', 15);
            fetchHander(empApi.getCreditCardList, {//获取信用卡列表
                user_id: localStorage.user_id,
                token: localStorage.h5_token
            }).then((data) => {
                Toast.hide();
                for (let i in data) {
                    if (data[i].is_default === '1') {
                        this.setState({
                            bankList: data,
                            showList: true,
                            defaultCardIndex: i
                        });
                    }
                }

                this.setState({
                    bankList: data,
                    showList: true
                });
            })

        } else {//更改储蓄卡-即重新绑储蓄卡
            localStorage.preUrl = '/encashment/swiperCard';
            this.props.history.push('/encashment/onCard?type=0'+'&isnew='+isnew|| '');
        }

    }

    addCard(type,is_identity,isnew) {
        console.log(is_identity);
        //增加卡
        jrLog('kamao_shuaka_addcard_18');
        if (!localStorage.user_id || !localStorage.h5_token) {
            this.props.history.push('/encashment/login');
            return false;
        }else if (is_identity == 0) {//未验证身份

            localStorage.preUrl = setPreUrl();
            this.props.history.push('/encashment/cardIdValid');
            return false;

        }

        if (!localStorage.user_id) {
            this.props.history.push('/encashment/login');
        } else {
            localStorage.preUrl = '/encashment/swiperCard';
            this.props.history.push('/encashment/onCard?type=' + type+'&isnew='+isnew||'');
        }

    }

    hideList(e) {
        this.setState({
            bankList: [],
            showList: false
        });
    }

    stopBul(e) {
        e.stopPropagation();
    }

    chooseCreditCard(val, index) {//选择信用卡
        console.log(index);
        Toast.loading('loading', 20);
        fetchHander(empApi.setDefaultCreditCard, {
            id: val.id,
            user_id: localStorage.user_id,
            token: localStorage.h5_token
        }).then((data) => {
            Toast.hide();
            this.setState({
                defaultCardIndex: index,
                bankInfo: {
                    img: val.bank_icon,
                    name: val.bank_name,
                    num: val.bank_number.slice(-4)//只显示后四位
                }
            });
        })
    }

    clearNum() {
        this.setState({
            amount: '0',
        });
        localStorage.amount = "";
    }

    render() {
        let data = this.props.defaultCreditCardData;
        if (data === 'NOLOAD') {
            return <LoadView />
        }
        let img_add = {
            width: '.7rem'
        }
        return (<div className="swiperCard">
                <title>刷卡收款</title>
                <TitleNav title="刷卡收款" preUrl={this.props.location.query.preUrl ?"": "/encashment"} opText="常见问题" handler={this.toHander.bind(this)}></TitleNav>
                <div className="cards">
                    <div className="flex">
                        <div className="label">支付信用卡</div>
                        <div className="input">
                            <img
                                src={data.is_credit === 1 ? (!this.state.bankInfo ? data.bank_icon : this.state.bankInfo.img) : require('./../images/V2/Oval@2x.png')}
                                style={data.is_credit === 1 ? {} : img_add} alt=""/>
                            <span className="cardInfo">
                                <span onClick={data.is_credit === 1 ? () => {
                                    return false
                                } : this.addCard.bind(this, 1,data.is_identity,'')}>
                                    {data.is_credit === 1 ? (!this.state.bankInfo ? data.bank_name : this.state.bankInfo.name) : '添加信用卡卡号'}
                                    </span>
                                <span
                                    style={data.is_credit === 1 ? {} : {display: 'none'}}>({!this.state.bankInfo ? data.bank_number : this.state.bankInfo.num})</span>
                            </span>

                        </div>
                        <div className="change" onClick={data.is_credit === 1 ? this.changCard.bind(this, 1,'') : () => {
                            return false
                        }}>
                            {data.is_credit === 1 ? '更换' : ''}
                        </div>
                    </div>
                    <div className="flex">
                        <div className="label">到账储蓄卡</div>
                        <div className="input">
                            <img src={data.is_bank === 1 ? data.debit_bank_icon : require('./../images/V2/Oval@2x.png')}
                                 alt="" style={data.is_bank === 1 ? {} : img_add}/>
                            <span className="cardInfo">
                                <span onClick={data.is_bank === 1 ? () => {
                                    return false
                                } : this.addCard.bind(this, 0,data.is_identity,1)}>
                                    {data.is_bank === 1 ? data.debit_bank_name : '添加储蓄卡卡号'}</span>
                                <span
                                    style={data.is_bank === 1 ? {} : {display: 'none'}}>({data.debit_bank_number})</span>
                            </span>

                        </div>
                        <div className="change" onClick={data.is_bank === 1 ? this.changCard.bind(this, 0,0) : () => {
                            return false
                        }}>{data.is_bank === 1 ? '更换' : ''}</div>
                    </div>
                </div>

                <div className="payNum">
                    <div className="title">支付金额(元)</div>
                    <div className="num flex">
                        <input type="tel" autoFocus onChange={this.getNum.bind(this)}
                               value={localStorage.amount ? localStorage.amount : this.state.amount}/>
                        <img src={require('./../images/V2/Group 2@2x.png')} alt="" onClick={this.clearNum.bind(this)}/>
                    </div>
                    <div className="fee"> {data.fee}  </div>
                </div>
                <div className="next">
                    <button onClick={this.next.bind(this, data.is_identity, data.is_credit, data.is_bank)}>去支付</button>
                </div>
                {this.bankListTpl()}
                <Concat title="客服咨询" hideModal={this.hideModal.bind(this)} showModal={this.state.showModal}/>

            </div>
        )

    }
    //底部信用卡列表
    bankListTpl() {
        return (
            <div className="banklist" style={this.state.showList ? {} : {display: 'none'}}
                 onClick={this.hideList.bind(this)}>
                <div className="content" onClick={this.stopBul.bind(this)}>
                    <div className="title flex">
                        <img onClick={this.hideList.bind(this)} src={require('./../images/V2/icon_close@2x.png')}
                             alt=""/><span>选择付款卡号</span>
                        <span></span>
                    </div>
                    <div className="list">
                        {this.state.bankList.map((val, index) => {
                            return (
                                <div key={index} className="flex"
                                     onClick={this.chooseCreditCard.bind(this, val, index)}>
                                    <img src={val.bank_icon ? val.bank_icon : require('./../images/Oval 1.png')}
                                         alt=""/>
                                    <span>{val.bank_name} <span>({val.bank_number.slice(-4)})</span></span>
                                    <img src={require('./../images/V2/Rectangle 3@2x.png')} alt=""
                                         style={this.state.defaultCardIndex == index ? {} :
                                             {visibility: 'hidden'}
                                         }/>
                                </div>
                            )
                        })}
                    </div>
                    <div className="add" onClick={this.addCard.bind(this, 1)}>
                        + 添加新的信用卡
                    </div>
                </div>
            </div>
        )
    }
}

SwiperCard.contextTypes = {
    router: React.PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    return {
        defaultCreditCardData: state.update.defaultCreditCardData,

    }
}
export default connect(mapStateToProps, {getDefaultCreditCard})(SwiperCard)