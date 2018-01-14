import  React from 'react';
// import  {connect}from 'react-redux';
import  TitleNav from './plugins/TitleNav/TitleNav';
import {fetchPost,fetchGet} from 'jrbasic';
// import LoadView from './common/LoadView';
import emApi from "./common/api";
import {alertProps,_assign,fetchHander,jrLog} from './common/const';
// import AlertInfo  from './common/AlertInfo';
import Concat from './plugins/Concat/Concat';
// import {addGrowingLog} from './common/const';
import { Toast, Icon } from 'antd-mobile';

class IdConfirm extends React.Component {
    componentDidMount() {
        // this.props.getUserInfo(localStorage.user_id, localStorage.token);
    }

    constructor(props) {
        super(props);
        this.state = {
            idNum: localStorage.card_id,
            name: localStorage.name,
            showModal:false,
            closeTime:''
        }
        Object.assign(this.state,alertProps);
    }

    confirm() {
        jrLog('kamao_shenfen_checkPhoto_23');
        let data ={
            identity_num:this.state.idNum?this.state.idNum:localStorage.card_id,
            real_name:this.state.name?this.state.name:localStorage.name,
            uid:localStorage.user_id,
            token:localStorage.h5_token
        }
        Toast.loading('验证中 请稍后',20);
        fetchHander(emApi.editUserIdentityInfo,_assign(data)).then((data)=>{
            Toast.hide();
            this.props.history.push('/encashment/oncard?type=1');
        });
    }
    changeVal(type,event){

        let eventValue =event.target.value.trim();
        console.log(type);
        console.log(eventValue);
        if(type==='idNum'){
            this.setState({
                idNum:eventValue
            })
        } else
        if(type==='name'){
            this.setState({
                name:eventValue
            })
        }

    }
    // changeShow(){
    //     this.setState({
    //         showAlert:false
    //     })
    // }
    // autoClose(res){
    //     window.clearAlert =  setTimeout(()=>{
    //         this.setState({
    //             showAlert:false
    //         });
    //         if(res.message=="您的账号在另外的设备上登录，所以需要重新登录哟"){
    //             this.props.history.push('/encashment/login');
    //         }
    //     },1000);
    // }
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

    render() {
        // let {userInfoData} = this.props;
        // if (userInfoData == 'NOLOAD' || userInfoData == undefined) {
        //     return (<LoadView/>)
        // }
        return (<div className="idConfirm page-gray-bk">
            <title>确认身份</title>
            <TitleNav title="确认身份" opImg={require('./../images/concat.png')} handler={this.concat.bind(this)}></TitleNav>
            <div>
                <div className="title">您的身份信息如下</div>
                <form >
                    <div className="form-group">
                        <label htmlFor="name">姓名</label>
                        <input type="text" name="name" id="name" value={this.state.name  } onChange={this.changeVal.bind(this,'name')}
                               />
                        {/*<span>修改<img src={require('./../images/arrows/8.png')} alt=""/></span>*/}
                    </div>
                    <div className="form-group">
                        <label htmlFor="cardId">身份证号</label>
                        <input type="text" name="cardId" id="cardId" value={this.state.idNum  } onChange={this.changeVal.bind(this,'idNum')}
                                />
                        {/*<span>修改<img src={require('./../images/arrows/8.png')} alt=""/></span>*/}
                    </div>
                </form>
                {/*<div>*/}
                {/*<span>姓名</span>*/}
                {/*<input type="text"/>*/}
                {/*</div>*/}
                {/*<div>*/}
                {/*<span>身份证号</span>*/}
                {/*<input type="text"/>*/}
                {/*</div>*/}
            </div>
            <div className="confirm">
                <button className="btn submigtBtn" onClick={this.confirm.bind(this)}>确认</button>
            </div>
            <Concat title="客服咨询" hideModal={this.hideModal.bind(this)} showModal={this.state.showModal} />
            {/*<AlertInfo {...this.state} changeShow={this.changeShow.bind(this)}/>*/}
        </div>)
    }

}
// const mapStateToProps = (state) => {
//     return {
//         userInfoData: state.update.userInfoData
//     }
// }
export default IdConfirm
