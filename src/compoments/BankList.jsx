import  React from 'react';
import  { connect }from 'react-redux';
import {fetchPost,fetchGet} from 'jrbasic';
import  TitleNav from './plugins/TitleNav/TitleNav';
import {getBankList} from './../redux/action/action';
import LoadView from './common/LoadView';
import {is_weixn,isAppView} from './common/const';
import { SearchBar} from 'antd-mobile';
class  BankList extends  React.Component {
    constructor(props){
        super(props);
        this.state={
            list : [],
            init :true
        }
    }
    componentDidMount(){
        this.props.getBankList({type:this.props.location.query.type});
        // alert(isAppView());
        // alert(is_weixn());
    }
    toSwiper(val){
        localStorage.bankName=val.bank_name;
        localStorage.bankImg = val.bank_icon;
        this.props.history.push('/encashment/onCard?type='+(Number(this.props.location.query.type)-1))
    }

    getList(data){
        // console.log(data);
        let wordList = [];
        data.map((val)=>{
            let _w = val.bank_abbreviate.substr(0,1);
            // console.log(_w);
            if(!~wordList.indexOf(_w)){
                wordList.push(_w);
            }

        })
        if(data.length!==0){
            return(
                <div>
                    <div className="list" style={{display:data.length!==0?'block':'none',top:isAppView()||is_weixn()?'2rem':''}}>
                        {
                            wordList.map((ele,i)=>{
                                return(
                                    <div>
                                        <div className="word">{ele.toUpperCase()}</div>
                                        {data.map((val,index)=>{
                                            return <div className="item" key={index} style={ele===val.bank_abbreviate.substr(0,1)?{}:{display:'none'}}
                                                        onClick={this.toSwiper.bind(this,val)}>
                                                <img src={val.bank_icon?val.bank_icon:require('./../images/Oval 1.png')} alt=""/>
                                                <span> {val.bank_name}</span>
                                            </div>
                                        })}
                                    </div>
                                    )
                            })
                        }


                    </div>
                </div>
            )
        }else{
            return(
                <div className="noData flex" style={{display:data.length===0?'block':'none'}}>
                    <div>没有找到，请换个试试</div>
                </div>
            )
        }

    }
    search(e){
        let {bankListAndIconData }=this.props;
        var reg = new RegExp("[\\u4E00-\\u9FFF]+","g");
        let _data = [];
        if(reg.test(e)){
            console.log(1);
            //是中文
            bankListAndIconData.map((val)=>{
                if(~val.bank_name.indexOf(e)){
                    _data.push(val);
                }
            })
        }else{
            bankListAndIconData.map((val)=>{
                if(~val.bank_abbreviate.indexOf(e)){
                    _data.push(val);
                }
            })
        }
        this.setState({
            list:_data,
            init:false
        })
    }
    render(){
        let {bankListAndIconData }=this.props;
        if(bankListAndIconData==='NOLOAD' || bankListAndIconData == undefined){
            return <LoadView/>
        }

        return(<div className="banklistCount">
                <title>选择银行</title>
                <TitleNav title="选择银行" style={isAppView()||is_weixn()?{display:'none'}:{}}/>
                <div className="search"  style={isAppView()||is_weixn()?{top:0}:{}}>
                    <SearchBar placeholder="输入银行名称或拼音" maxLength={5} onChange={this.search.bind(this)}/>
                </div>
                {this.getList(this.state.list.length!==0?this.state.list:this.state.init?bankListAndIconData:this.state.list)}
            </div>
        )
    }
}

BankList.contextTypes = {
    router: React.PropTypes.object.isRequired
};

const mapStateToProps=(state)=>{
    return{
        bankListAndIconData:state.update.bankListAndIconData
    }
}
export default connect(mapStateToProps,{getBankList})(BankList)