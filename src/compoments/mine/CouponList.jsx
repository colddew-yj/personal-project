import  React from 'react';
import  {connect}from 'react-redux';
import  TitleNav from '../plugins/TitleNav/TitleNav';
import LoadView from "../common/LoadView";
// import {fetchHander} from '../common/const';
// import empApi from '../common/api';
// import { Toast, Icon } from 'antd-mobile';
import {getCoupon} from '../../redux/action/action';
class CouponList extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            type:1
        }
    }

    componentDidMount() {
       this.getList(1);
    }
    getList(type){
        this.props.getCoupon({
            user_id:localStorage.user_id,
            token:localStorage.h5_token,
            coupon_code:type
        });
    }
    switchTab(type){
        console.log(type);
        this.setState({
            type:type
        })
        this.getList(type);
    }
    handlerTo(){
        this.props.history.push('/encashment/manInstruc');
    }
    toSwiper(){
        this.props.history.push('/encashment/swiperCard?institution_id=21&preUrl=1');
    }
    render() {
        let { getCouponData } = this.props;
        if(getCouponData==='NOLOAD'){
            return <LoadView/>
        }
        return (<div className="couponList">
                <title>我的现金券</title>
                <TitleNav title="我的现金券" opText="使用说明"
                          handler={this.handlerTo.bind(this)}></TitleNav>
                <div className="tab flex" >
                    <div onClick={this.switchTab.bind(this,1)} style={this.state.type===1?{color:'#498dff'}:{}}>未使用</div>
                    <div onClick={this.switchTab.bind(this,2)}  style={this.state.type===2?{color:'#498dff'}:{}}>已使用</div>
                    <div onClick={this.switchTab.bind(this,3)}  style={this.state.type===3?{color:'#498dff'}:{}}>已失效</div>
                </div>
                <div className="list" style={getCouponData.list===0?{display:'none'}:{}}>
                    {getCouponData.map((val,index)=>{
                        return(
                            <div key={index} className={this.state.type===1?'flex use':'flex'}>
                                <div className="item-1">
                                    <div>{val.value}</div>
                                    <div>满{val.condition}可用</div>
                                </div>
                                <div className="item-2"  style={this.state.type!==1?{paddingLeft: '.7rem'}:{}}>
                                    <div>{val.coupon_name}</div>
                                    <div>有效期至 <span>{val.over_time}</span></div>
                                    <div>{val.coupon_desc}</div>
                                </div>
                                <div className="item-3">
                                    <img src={this.state.type===2?require('./../../images/V2/coup_be.png'):require('./../../images/V2/coup_invalid.png')}
                                         alt="" style={this.state.type===1?{display:'none'}:{}}/>
                                    <div style={this.state.type===1?{}:{display:'none'}}>
                                        <div style={val.left_day>5?{display:'none'}:{}}>{val.left_day>1 ?<i>剩余{val.left_day}日</i>: <i>最后一天</i>}</div>
                                        <button onClick={this.toSwiper.bind(this)}>立即使用</button>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className="noData" style={getCouponData.length!==0?{display:'none'}:{}}>
                    <img src={require('./../../images/V2/noData.png')}/>
                    <div>很遗憾</div>
                    <div style={this.state.type!==1?{display:'none'}:{}}>您暂无可以使用的现金劵</div>
                    <div style={this.state.type!==2?{display:'none'}:{}}>没有使用过的现金劵</div>
                    <div style={this.state.type!==3?{display:'none'}:{}}>您还没有已失效的现金劵</div>
                </div>

            </div>
        )

    }
}

CouponList.contextTypes = {
    router : React.PropTypes.object.isRequired
};
const mapStateToProps=(state)=>{
    return{
        getCouponData:state.update.getCouponData
    }
}
export  default  connect(mapStateToProps,{getCoupon})(CouponList)