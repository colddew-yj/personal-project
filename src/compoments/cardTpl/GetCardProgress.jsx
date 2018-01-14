import  React from 'react';
import  { connect }from 'react-redux';
import  {Link} from 'react-router';
import {fetchPost,fetchGet} from 'jrbasic';
import  TitleNav from '../plugins/TitleNav/TitleNav';
// import Concat from './plugins/Concat/Concat';
import {getprogress} from '../../redux/action/action';
import LoadView from '../common/LoadView';
import { List } from  'antd-mobile';
import {appLogin,is_weixn,isAppView} from './../common/const';


class  GetCardProgress extends  React.Component {
    constructor(props){
        super(props);
    }
    componentDidMount(){
        this.props.getprogress();
    }

    goBank(link){
        if(localStorage.user_id || localStorage.userId){
            location.href=link;
        }else{
            appLogin();
        }
    }
    render(){
        let { getprogressData } = this.props;
        if(getprogressData==='NOLOAD' || getprogressData===undefined){
            return <LoadView/>
        }
        const Item = List.Item;
        const Brief = Item.Brief;
        return(<div className="getCardProgress">
                <title>办卡进度</title>
                <TitleNav title="办卡进度" style={isAppView()||is_weixn()?{display:'none'}:{}}/>

                <div className="title"><img src={require('../../images/icon_bank.png')} alt=""/>选择银行</div>
                    <div className="list">
                        {getprogressData.map((val,index)=>{
                            return  <Item
                              arrow="horizontal"
                                thumb={val.bank_pic}
                                onClick={this.goBank.bind(this,val.bank_link)} key={index}>
                                {val.bank_name}
                            </Item>
                        })}
                    </div>
                </div>
        )
    }
}

GetCardProgress.contextTypes = {
    router: React.PropTypes.object.isRequired
};
const mapStateToProps=(state)=>{
    return{
        getprogressData:state.update.getprogressData
    }
}
export  default  connect(mapStateToProps,{getprogress})(GetCardProgress)
