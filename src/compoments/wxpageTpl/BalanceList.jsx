import  React from 'react';
import {Toast,List} from 'antd-mobile';
import LoadView from './../common/LoadView';
import emApi from './../common/api';
import {fetchPost} from 'jrbasic';
import  {Link} from 'react-router';

const Item = List.Item;
class BalanceList extends React.Component {
    constructor() {
        super();
        this.state = {
            list: []
        }
    }

    componentDidMount() {
        fetchPost(emApi.wxBankList).then((res)=>{
            console.log(res);
            if(res.status===1){
                this.setState({
                    list:res.data
                });
            }else{
                Toast.fail(res.message);
            }
        })
    }
    junmpToBank(url){
        window.location.href=url;
    }

    render() {
        if (this.state.list.length === 0) {
            return <LoadView/>
        }
        return (
            <div className="balanceList">
                <title>查信用卡余额</title>
                <div className="desc">
                    <div>
                        <img src={require('./../../images/bannerJumpImgs/bankList.png')} alt=""/>
                    </div>
                    <div>
                        <div>请从以下选择要</div><div>查询的银行</div>
                    </div>
                </div>
                <List >
                    {
                        this.state.list.map((val,index)=>{
                           return <Item
                                thumb={val.bank_icon}
                                arrow="horizontal"
                                onClick={this.junmpToBank.bind(this,val.jump_url)}
                            >{val.bank_name}</Item>
                        })
                    }
                </List>
            </div>
        )
    }
}
export  default  BalanceList;