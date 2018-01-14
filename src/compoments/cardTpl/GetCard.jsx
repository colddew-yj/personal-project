import  React from 'react';
import  { connect }from 'react-redux';
// import  {Link} from 'react-router';
import {fetchPost,fetchGet} from 'jrbasic';
import { List } from  'antd-mobile';
import {getHotCardList, getHotbanklist } from '../../redux/action/action';
import LoadView from '../common/LoadView';
// import  TitleNav from '../plugins/TitleNav/TitleNav';
// import Concat from './plugins/Concat/Concat';
import {appLogin,isAppView} from './../common/const';

class  GetCard extends  React.Component {
    constructor(props){
        super(props);
    }
    componentDidMount(){
        console.log(isAppView());
        this.props.getHotCardList({city_id:localStorage.city_id?localStorage.city_id:21,type:4});
        this.props.getHotbanklist({city_id:localStorage.city_id?localStorage.city_id:21});
    }

    goBankCards(id,name){
        this.props.history.push('/encashment/getBankCards?bankName='+name+'&id='+id);
    }
    goProcess(){
        this.props.history.push('/encashment/getCardProgress');
    }
    goBank(link){
        if(!localStorage.user_id && !localStorage.userId){
            if(isAppView()){
                try{
                    appLogin();
                }catch (e){
                    alert(e);
                }

            }else{
                this.props.history.push('/encashment/login?goBack=1');
            }

        }else{
            location.href=link;
        }

    }
    toCityList(){
        this.props.history.push('/encashment/cityList');
    }
    back(){
        this.props.history.goBack();
    }
    render(){

        let { getHotCardListData ,getHotbanklistData } = this.props;
        if( getHotCardListData === 'NOLOAD' || getHotCardListData === undefined|| getHotbanklistData === 'NOLOAD' || getHotbanklistData === undefined ){
            return (<LoadView/>)
        }
        const Item = List.Item;
        const Brief = Item.Brief;
        return(<div className="getCard">
                <title>极速办卡</title>
                <div className="flex titleNav">
                    <a href="javascript:;" onClick={this.back.bind(this)}><img src={require('./../../images/arrows/back.png')} alt=""/></a><span>极速办卡</span><a onClick={this.toCityList.bind(this)}>
                    <img src={require('./../../images/V2/icon_position@2x.png')} alt=""/><span>{localStorage.localCity || '杭州'}</span></a>
                </div>
                {/*<TitleNav title="极速办卡"  handler={this.toCityList.bind(this)} opImg="../../images"/>*/}
                <div className="cardShow">
                    <div className="title"><img src={require('../../images/Rectangle 4.png')} alt=""/>热门信用卡</div>
                    <div className="list">
                        {getHotCardListData.map((val,index)=>{
                            return <div className="item" key={index} onClick={this.goBank.bind(this,val.credit_link)}>
                            <img src={val.credit_pic} alt=""/>
                                <div><span className="name">{val.credit_name}</span> </div>
                                <div>{val.credit_desc}</div>
                            </div>
                        })}
                    </div>
                </div>
                <hr/>
                <div className="bankList">
                    <div className="title"><img src={require('../../images/icon_bank.png')} alt=""/>热门银行</div>
                    <div className="list">
                        <List  className="my-list">
                            {getHotbanklistData.map((val,index)=>{
                                return  <Item
                                    arrow="horizontal"
                                    thumb={val.bank_pic}
                                    multipleLine
                                    onClick={this.goBankCards.bind(this,val.id,val.bank_name)} key={index}>
                                    {val.bank_name} <Brief>{val.bank_desc}</Brief>
                                </Item>
                            })}

                        </List>
                    </div>
                </div>
                <div className="goProcess" onClick={this.goProcess.bind(this)}> 办卡进度</div>
            </div>
        )
    }
}

GetCard.contextTypes = {
    router: React.PropTypes.object.isRequired
};
const mapStateToProps=(state)=>{
    return{
        getHotCardListData:state.update.getHotCardListData,
        getHotbanklistData:state.update.getHotbanklistData
    }
}
export  default  connect(mapStateToProps,{getHotCardList,getHotbanklist})(GetCard)
