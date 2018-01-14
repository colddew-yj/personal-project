import  React from 'react';
import  { connect }from 'react-redux';
import  {Link} from 'react-router';
import {getBankcredit} from '../../redux/action/action';
import { List } from  'antd-mobile';
import LoadView from '../common/LoadView';
import {appLogin,is_weixn,isAppView} from './../common/const';
import  TitleNav from '../plugins/TitleNav/TitleNav';


class  GetBankCards extends  React.Component {
    constructor(props){
        super(props);
    }
    componentDidMount(){
        this.props.getBankcredit({city_id:localStorage.city_id?localStorage.city_id:21,bank:this.props.location.query.id,all:1});
    }

    goBank(link){
        if(localStorage.user_id || localStorage.userId){
            location.href=link;
        }else{
            appLogin();
        }
    }
    render(){
        let { getBankcreditData } = this.props;

        if(getBankcreditData==='NOLOAD' || getBankcreditData===undefined){
            return <LoadView/>
        }
        const Item = List.Item;
        const Brief = Item.Brief;
        return(<div className="getBankCards">
                <title>{this.props.location.query.bankName}</title>
                <TitleNav title={this.props.location.query.bankName} style={isAppView()||is_weixn()?{display:'none'}:{}}/>

                <div className="list">
                        <List  >
                            {getBankcreditData.map((val,index)=>{
                                return  <Item
                                    thumb={val.credit_pic}
                                    multipleLine
                                    onClick={this.goBank.bind(this,val.credit_link)}
                                    key={index}>
                                    {<span className="name">{val.credit_name}</span>}  <span className="cardType" style={val.card_grade?{}:{display:'none'}}>
                                    {val.card_grade}</span><Brief>{val.credit_desc}</Brief>
                                    <Brief><span className="desc2">已有 <span>{val.card_num}</span> 人申请</span></Brief>
                                </Item>
                            })}

                        </List>
                    </div>
                </div>
        )
    }
}

GetBankCards.contextTypes = {
    router: React.PropTypes.object.isRequired
};
const mapStateToProps=(state)=>{
    return{
        getBankcreditData:state.update.getBankcreditData
    }
}
export  default  connect(mapStateToProps,{getBankcredit})(GetBankCards)
