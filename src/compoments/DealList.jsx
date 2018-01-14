import  React from 'react';
import {fetchPost, fetchGet} from 'jrbasic';
import emApi from "./common/api";
import  TitleNav from './plugins/TitleNav/TitleNav';
import LoadView from "./common/LoadView";
import {alertProps,_assign,fetchHander} from './common/const';
import AlertInfo  from './plugins/AlertInfo/AlertInfo';
import Concat from './plugins/Concat/Concat';
class CardList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            type: 0,
            length: 0,
            list: {},
            noLoad: false,
            monthIndex:0,
            popVisible:false
        }
        Object.assign(this.state,alertProps);
    }

    componentDidMount() {
        this.handlerType(0);
    }

    handlerType(type) {
        fetchHander(emApi.getTradeLog, _assign({user_id: localStorage.user_id,token:localStorage.h5_token})).then((data) => {
            this.setState({
                list: data,
                type: type,
                length: data.length,
                noLoad:true
            })
        })
    }
    concat(e){
        setTimeout(()=>{
            this.setState({
                showModal:true
            });
        },200)

    }
    hideModal(){
        this.setState({
            showModal:false
        });
    }
    changeShow(){
        this.setState({
            showAlert:false
        })
    }
    autoClose(){
        window.clearAlert =  setTimeout(()=>{
            this.setState({
                showAlert:false
            })

        },this.state.closeTime);
    }
    select(index){
        console.log(index);
        if(index===0||index){
            this.setState({
                popVisible:false,
                monthIndex:index
            })
        }else {
            this.setState({
                popVisible:false
            })
        }

    }
    showPop(){
        this.setState({
            popVisible:true
        })
    }
    monthTpl(month){
        return(
            <div className="popModal" style={this.state.popVisible?{}:{display:'none'}}  onClick={this.select.bind(this,'')}>
                <div className="content">
                    <div className="item">
                        <div className="dot-top"></div>
                        {
                            month.map((val,i)=>{
                                return <div key={i}  style={this.state.monthIndex===i?{color:'#498dff'}:{}}
                                            onClick={this.select.bind(this,i)} className="child">{val}</div>
                            })
                        }
                    </div>

                </div>
            </div>

        )
    }
    render() {
        if (!this.state.noLoad) {
            return <LoadView/>
        }
        let month = this.state.list.month;
        let trade = this.state.list.trade;
        return (<div className="cardList dealList">
                <title>刷卡收款记录</title>
                <TitleNav title="刷卡收款记录"   op={true} opImg={require('./../images/concat.png')} handler={this.concat.bind(this)}></TitleNav>
                <div className="month flex">
                    {month[this.state.monthIndex]}
                    <img src={require('./../images/V2/date.png')} alt="" onClick={this.showPop.bind(this)}/>
                </div>
                <div className="list">
                    {trade[this.state.monthIndex].map((ele,i)=>{
                        return(
                            <div className="record">
                                <div className="time">{ele.trans_date}</div>
                                <div className="content">
                                    <span>刷卡支付</span>
                                    <span>{ele.trans_amount}</span>
                                    <span><img src={require('./../images/Bitmap.png')} alt=""/></span>
                                </div>
                            </div>
                        )
                    })}

                </div>
                <div className="list empty" style={trade[this.state.monthIndex].length !== 0 ? {display: 'none'} : {}}>
                    <img src={require('./../images/empty.png')} alt=""/>
                    <div style={trade[this.state.monthIndex].length !== 0 ? {display: 'none'} : {}}>抱歉，您还没有交易记录。</div>
                </div>
                <Concat title="客服咨询" hideModal={this.hideModal.bind(this)} showModal={this.state.showModal} />
                {this.monthTpl(month)}
                <AlertInfo {...this.state} changeShow={this.changeShow.bind(this)} />

            </div>
        )

    }
}

CardList.contextTypes = {
    router : React.PropTypes.object.isRequired
};
export  default   CardList