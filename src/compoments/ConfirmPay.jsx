import  React from 'react';
import  {connect}from 'react-redux';
// import  {Link} from 'react-router';
import {fetchPost, fetchGet} from 'jrbasic';
// import {AjaxGet} from 'jrbasic';
import {PLAT, _assign, fetchHander} from './common/const';
// import AlertInfo  from './common/AlertInfo';
// import {creditData} from './common/const';
// import LoadView from './common/LoadView';
import  TitleNav from './plugins/TitleNav/TitleNav';
import {createOrder} from './../redux/action/action';
import emApi from  "./common/api";
import Concat from './plugins/Concat/Concat';
import {jrLog} from './common/const';
class ConfirmPay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            jump: false,
            institution_id:''
        }
        // Object.assign(this.state, alertProps);
    }

    componentDidMount() {
        //获取订单数据
        this.props.createOrder({
            user_id: localStorage.user_id,
            token: localStorage.h5_token,
            trans_amount: localStorage.amount,
            institution_id:localStorage.institution_id
        });
        this.setState({
            institution_id:localStorage.institution_id
        })
    }

    confirm(order_id) {//发起订单
        jrLog('kamao_shuaka_checkquxian_20');
        localStorage.order_id = order_id;
        let d = new Date();
        console.log(d.getHours());
        if (d.getHours() >= 22 || d.getHours() < 1) { //若不是在交易时间之内,需要转到交易时间公告页面
            this.props.history.push('/encashment/dealTime');
        }
        this.setState({//去支付时,隐藏表单内容,显示动画
            jump: true
        });
        fetchHander(emApi.debit, _assign({
            user_id: localStorage.user_id,
            order_no: order_id,
            token: localStorage.h5_token,
            isH5: 1,
            institution_id:this.state.institution_id ,
            coupon_id:localStorage.cashId || ""
        }),'',true).then((data) => {
            /*提交表单*/

            // if(d.getHours()>=22 || d.getHours()<=1){
            //     this.props.history.push('/encashment/dealTime');
            // }else{
            localStorage.cashId="";
            let div = document.createElement('div');
            div.innerHTML = data;
            let _dom = div.getElementsByTagName('form')[0];
            document.body.appendChild(_dom);
            _dom.submit();
            // }


            // form.setAttribute('action', '/jzh/app/appWebReg.action');
            // form.setAttribute('method', 'post');
            // const { fuiouParams } = res.data;
            // for (let item in fuiouParams) {
            //     let input =  document.createElement('input');
            //     input.setAttribute('type', 'hidden');
            //     input.setAttribute('name', item);
            //     input.setAttribute('value', fuiouParams[item]);
            //     form.appendChild(input);
            // }

            //     if(res.status===1){
            //         this.props.history.push('/encashment');
            //     }else{
            //         this.setState({
            //             textVal:res.message,
            //             iconType:2,
            //             showAlert:true,
            //             closeTime:2000
            //         });
            //         this.autoClose();
            // }
        })
    }

    concat(e) {
        setTimeout(() => {
            this.setState({
                showModal: true
            });
        }, 200)

    }

    hideModal() {
        this.setState({
            showModal: false
        });
    }

    // changeShow() {
    //     this.setState({
    //         showAlert: false
    //     })
    // }
    //
    // autoClose() {
    //     window.clearAlert = setTimeout(() => {
    //         this.setState({
    //             showAlert: false
    //         })
    //     }, this.state.closeTime);
    // }

    toAbleCash() {//去现金券页面,cashIndex为之前选过的现金券的
        jrLog('kamao_shuaka_addcard_19');
        this.props.history.push('/encashment/chooseCoupon?cashIndex='+(this.props.location.query.cashIndex||''));
    }

    render() {
        //
        let {createOrderData} = this.props;
        // if ((createOrderData == 'NOLOAD' || createOrderData == undefined)) {
        //     return (<LoadView/>)
        // }
        // let pre =
        // return(
        //     <div  className="confirmPay">
        //         <TitleNav title="信用卡取现" preUrl={'/encashment/swiperCard'} op={true} opImg={require('./../images/concat.png')}  handler={this.concat.bind(this)}></TitleNav>
        //         <div><img src={require("./../images/jump.gif")} alt=""/></div>
        //     </div>
        // )

        return (<div className="confirmPay" style={this.state.jump ? {background: '#fff'} : {}}>
                <title>信用卡取现</title>
                <TitleNav title="信用卡取现" opImg={require('./../images/concat.png')} preUrl="/encashment/swiperCard"
                          handler={this.concat.bind(this)}></TitleNav>
                <div className="desc" style={this.state.jump ? {display: 'none'} : {}}>
                    <span>实际到账金额:</span>
                    <div>
                        <span>￥{createOrderData.actual_amount}</span>
                        <span>支付金额 {createOrderData.trans_amount} 元</span>
                    </div>
                </div>
                <div className="cards" style={this.state.jump ? {display: 'none'} : {}}>
                    <div className="flex">
                        <span>支付信用卡</span>
                        <div>
                            <span>{createOrderData.credit_card_name}</span>
                            <span>(尾号{createOrderData.credit_card_no})</span>
                        </div>
                    </div>
                    <div className="flex">
                        <span>到账储蓄卡</span>
                        <div>
                            <span>{createOrderData.bank_card_name}</span>
                            <span>(尾号{createOrderData.bank_card_no})</span>
                        </div>
                    </div>
                    <div className="flex">
                        <span>预计到账时间</span>
                        <div>
                            <span>{createOrderData.transfer_time}</span>
                        </div>



                    </div>
                    <div className="info">
                        <div> {createOrderData.transfer_tip}</div>
                    </div>
                    <div onClick={this.toAbleCash.bind(this)} className="flex cash">
                        <span><img src={require('./../images/V2/cashCard-3@2x.png')} alt=""/>现金券</span>
                        <div>{(createOrderData.coupon_num !=0 || createOrderData.coupon_num)?
                            (!this.props.location.query.cash_desc? <span className="red">{createOrderData.coupon_num}张券可用</span>: <span className="red">返{(this.props.location.query.cash_desc)}元</span>)
                           :'无券可用'}
                            <img src={require('./../images/V2/Line@2x.png')} alt=""/>
                        </div>
                    </div>

                </div>

                <div className="confirm" style={this.state.jump ? {display: 'none'} : {}}>
                    <button className="btn submigtBtn" onClick={this.confirm.bind(this, createOrderData.order_no)}>取现
                    </button>
                </div>

                <div className="payLoading" style={this.state.jump ? {} : {display: 'none'}}>
                    <img src={require("./../images/jump.gif")} alt=""/>
                    <p>正在为您跳转银联支付页面</p>
                </div>
                <Concat title="客服咨询" hideModal={this.hideModal.bind(this)} showModal={this.state.showModal}/>

                {/*<AlertInfo {...this.state} changeShow={this.changeShow.bind(this)}/>*/}
            </div>
        )

    }
}

ConfirmPay.contextTypes = {
    router: React.PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    return {
        createOrderData: state.update.createOrderData,
    }
}
export default connect(mapStateToProps, {createOrder})(ConfirmPay)