import  React from 'react';
import  {connect}from 'react-redux';
import  TitleNav from './plugins/TitleNav/TitleNav';
import LoadView from "./common/LoadView";
// import {fetchHander} from './common/const';
// import empApi from './common/api';
// import { Toast, Icon } from 'antd-mobile';
import {getValidCoupon} from './../redux/action/action';
class ChooseCoupon extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            type:1,
            cashId:-1,
            noCashId:false
        }
    }

    componentDidMount() {
        //将获取的现金券值作为默认选中的值 默认为第一张,没有则选中无现金券
        this.getList();
        let _index = (this.props.location.query.cashIndex);
        _index>-1 && this.setState({
            cashId :_index && Number(_index)
        });
        (!_index || Number(_index)===-1) && this.setState({
            noCashId :true
        })
    }
    getList(){
        this.props.getValidCoupon({
            user_id:localStorage.user_id,
            token:localStorage.h5_token,
            amount:localStorage.amount
        });
    }
    // switchTab(type){
    //     console.log(type);
    //     this.setState({
    //         type:type
    //     })
    //     this.getList(type);
    // }
    handlerTo(){
        this.props.history.push('/encashment/manInstruc');
    }
    setCashId(index,val){
        localStorage.cashId = val.id || '';
        this.setState({
            cashId:index
        });
        if(val.id){
            this.setState({
                noCashId:true
            })
        }else{
            this.setState({
                noCashId:false
            })
        }
        //因为一个订单内,现金券的总数量是不变的,所以将现金券的排列顺序值作为再此选现金券时默认的选中值;
        //将选中的现金券的面值和顺序值作为参数返回到上一个页面
        this.props.history.push('/encashment/confirmPay?cash_desc='+(val.amount||0)+'&cashIndex='+index);
    }

    render() {
        let { getValidCouponData } = this.props;

        if(getValidCouponData==='NOLOAD'){
            return <LoadView/>
        }
        let _index = (this.props.location.query.cashIndex);

        return (<div className="chooseCoupon">

                {/*<title>我的现金券</title>*/}
                <TitleNav title="选择现金券" opText="使用说明"
                          handler={this.handlerTo.bind(this)}></TitleNav>
                <div className="list">
                                <div className="flex">
                                    <span>不使用优惠券</span>
                                    <img src={this.state.noCashId?require('./../images/V2/icon_selected_2_s@2x.png'):
                                        require('./../images/V2/notChoosed.png')} alt=""
                                    onClick={getValidCouponData.num===0?()=>{return false}:this.setCashId.bind(this,-1,"")}/>
                                </div>
                                <div  style={getValidCouponData.list===0?{display:'none'}:{}}>
                                    <div className="title" style={getValidCouponData.num===0?{display:'none'}:{}}>有{getValidCouponData.num}张券可用</div>
                                    <div className="content">
                                        {getValidCouponData.list.map((val,index)=>{
                                            return(
                                                <div className={index>=getValidCouponData.num?'item bg-else':'item'}
                                                     onClick={index>=getValidCouponData.num?()=>{return false}:this.setCashId.bind(this,index,val)}>
                                                    <div className="main flex">
                                                        <div >
                                                            <div>￥<span>{val.amount}</span></div>
                                                            <div>满{val.condition}可用</div>
                                                        </div>
                                                        <div>
                                                            <div>{val.coupon_name}</div>
                                                            <div>有效期至:{val.valid_time}</div>
                                                            <div>{val.coupon_desc}</div>
                                                        </div>
                                                        <div>
                                                            <img src={getValidCouponData.num>=1 && this.state.cashId===index?require('./../images/V2/icon_selected_2_s@2x.png')
                                                                :require('./../images/V2/notChoosed.png')} alt=""/>
                                                        </div>
                                                    </div>
                                                    <div className="remark">
                                                        <div style={(index+1)>getValidCouponData.num?{}:{marginBottom:'.8rem'}}>{(index+1)>getValidCouponData.num?
                                                            <span><img src={require('./../images/V2/gan.png')} alt=""/>不可用原因</span>
                                                            :''}</div>
                                                        <div>{val.reason}</div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                        }
                                    </div>
                                </div>
                    <div className="noData" style={getValidCouponData.list.length!==0?{display:'none'}:{}}>
                        <div>
                            <img src={require('./../images/V2/noData.png')}  alt=""/>

                        </div>
                        <div>很遗憾</div>
                        <div>您暂无可以使用的现金劵</div>
                    </div>
                </div>
                

            </div>
        )

    }
}

ChooseCoupon.contextTypes = {
    router : React.PropTypes.object.isRequired
};
const mapStateToProps=(state)=>{
    return{
        getValidCouponData:state.update.getValidCouponData
    }
}
export  default  connect(mapStateToProps,{getValidCoupon})(ChooseCoupon)