import  React from 'react';
import {fetchPost, fetchGet} from 'jrbasic';
import emApi from "./common/api";
import  TitleNav from './plugins/TitleNav/TitleNav';
import LoadView from "./common/LoadView";
import {alertProps,_assign,fetchHander} from './common/const';
import AlertInfo  from './plugins/AlertInfo/AlertInfo';
import Concat from './plugins/Concat/Concat';
import {jrLog} from './common/const';
class CardList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            type: 0,
            length: 0,
            list: [],
            noLoad: false
        }
        Object.assign(this.state,alertProps);
    }

    componentDidMount() {
        this.handlerType(0);
    }

    handlerType(type) {
        let data;
        if (type === 0) {
            fetchHander(emApi.getCreditCardList, _assign({user_id:localStorage.user_id,token:localStorage.h5_token})).then((data) => {
                if(data.length!==0){
                    let _d={};
                    for(let i in data){
                        if(data[i].is_default==='1'){
                            _d={defaultCard:data[i],index:i}
                        }
                    }
                    data.splice(_d.index,1);
                    data.unshift(_d.defaultCard);
                }

                this.setState({
                    list: data,
                    type: type,
                    length: data.length,
                    noLoad: true
                })
            })
        } else if (type === 1) {
            fetchHander(emApi.getBankCardList, _assign({user_id: localStorage.user_id,token:localStorage.h5_token})).then((data) => {
                this.setState({
                    list: data,
                    type: type,
                    length: data.length
                })
            })
        }
        // else {
        //     fetchHander(this,emApi.getTradeLog, _assign({user_id: localStorage.user_id,token:localStorage.h5_token})).then((data) => {
        //         this.setState({
        //             list: data,
        //             type: type,
        //             length: data.length
        //         })
        //     })
        // }
    }
    setCard(isDefault,id){
        jrLog('kamao_kabao_zhuka_68');
        if(isDefault==="1"){//判断是否为主卡
            return false;
        }
        fetchHander(emApi.setDefaultCreditCard,_assign({id:id,user_id:localStorage.user_id,token:localStorage.h5_token})).then((data)=>{
            this.setState({
                textVal:'设置成功',
                iconType:1,
                showAlert:true,
                closeTime:1000
            });
            this.autoClose();
            this.handlerType(this.state.type);
        });

    }

    removeCard(isDefault,id){
        if(isDefault==="1"){//判断是否为主卡
            this.setState({
                textVal:"不能直接删除主卡",
                iconType:2,
                showAlert:true,
                closeTime:2000
            });
            this.autoClose();
            return false;
        }
        let _c = confirm('确认删除？');
        if(_c){
            fetchHander(emApi.deleteCreditCard,_assign({id:id,user_id:localStorage.user_id,token:localStorage.h5_token})).then((data)=>{
                this.handlerType(this.state.type);
            })
        }

    }
    changeCard(id){
        jrLog('kamao_kabao_genghuan_69');
        localStorage.preUrl = '/encashment/cardList';
        this.props.history.push('/encashment/oncard?type=0');
    }
    addCard(){
        jrLog('kamao_kabao_addxinyong_67');
        localStorage.preUrl = '/encashment/cardList';
        this.props.history.push('/encashment/oncard?type=1');
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


    render() {
        if (!this.state.noLoad) {
            return <LoadView/>
        }
        return (<div className="cardList">
                <TitleNav title="我的卡包" preUrl="/encashment/mine" op={true} opImg={require('./../images/concat.png')} handler={this.concat.bind(this)}></TitleNav>
                <div className="tabs">
                    <div className={this.state.type===0? 'item checked' : 'item' } onClick={this.handlerType.bind(this,0)}>信用卡</div>
                    <div className={this.state.type===1? 'item checked' : 'item' }  onClick={this.handlerType.bind(this,1)}>储蓄卡</div>
                    {/*<div className={this.state.type===2? 'item checked' : 'item' }  onClick={this.handlerType.bind(this,2)}>交易记录</div>*/}
                </div>
                <div className="list" style={this.state.length === 0 ? {display: 'none'} : {}}>
                    {
                        (this.state.type===0||this.state.type===1)
                            ?
                        this.state.list.map((val, i) => {
                            return (
                                <div className={this.state.type===1||val.is_default==="1"?'card default-card':'card'} key={i}>
                                    <div>
                                        <div className="pic"><img src={val.bank_icon?val.bank_icon:require('./../images/yinhang.png')} alt=""/></div>
                                        <div className="desc">
                                            <span>{val.bank_name}</span>
                                            <span>**** **** **** {val.bank_number&&val.bank_number.substring(val.bank_number.length-4)||val.account_no&&val.account_no.substring(val.account_no.length-4)}</span>
                                        </div>
                                        <div className="op" style={this.state.type === 0 ? {} : {display: 'none'}}>
                                            <span onClick={this.removeCard.bind(this,val.is_default,val.id)}>删除</span>
                                        </div>
                                        <div className="op" style={this.state.type === 0 ? {display: 'none'} : {}}>
                                        </div>
                                    </div>
                                    <div>
                                        <span>{val.name || val.account_name   }</span>
                                        <span style={this.state.type === 0 ? {} : {display: 'none'}} onClick={this.setCard.bind(this,val.is_default,val.id)}>
                                            <img src={val.is_default==="1"?require('./../images/cir2.png'):require('./../images/cir1.png')} alt=""/>
                                            {val.is_default==="1"?'主卡':'设为主卡'} </span>
                                        <span style={this.state.type === 1 ? {} : {display: 'none'}} onClick={this.changeCard.bind(this,val.id)}>更改</span>
                                    </div>
                                </div>
                            )
                        })
                            :
                            this.state.list.map((val, i) => {
                                return (
                                    <div className="record"  key={i}>
                                        <div className="time">{val.trans_date}</div>
                                        <div className="content">
                                            <span>刷卡支付</span>
                                            <span>{val.trans_amount}</span>
                                            <span><img src={require('./../images/Bitmap.png')} alt=""/></span>
                                        </div>
                                    </div>
                                )
                            })
                    }
                    <div className={this.state.type === 0 ? '' : 'hideEle'}>
                        <button type="btn" className="btn submigtBtn" onClick={this.addCard.bind(this)}>+ 添加新的信用卡</button>
                    </div>
                </div>
                <div className="list empty" style={this.state.length !== 0 ? {display: 'none'} : {}}>
                    <img src={require('./../images/empty.png')} alt=""/>
                    <div style={this.state.type === 0 ? { } : {display: 'none'}}>抱歉，您还没有绑定信用卡。</div>
                    <div style={this.state.type === 1 ? {} : {display: 'none'}}>抱歉，您还没有绑定储蓄卡。</div>
                    {/*<div style={this.state.type === 2 ? {} : {display: 'none'}}>抱歉，您还没有交易记录。</div>*/}
                </div>
                <Concat title="客服咨询" hideModal={this.hideModal.bind(this)} showModal={this.state.showModal} />

                <AlertInfo {...this.state} changeShow={this.changeShow.bind(this)} />

            </div>
        )

    }
}

CardList.contextTypes = {
    router : React.PropTypes.object.isRequired
};
export  default   CardList