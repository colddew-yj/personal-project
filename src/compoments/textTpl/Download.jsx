import  React from 'react';
import  { connect }from 'react-redux';
import  {Link} from 'react-router';
import { Accordion ,List } from 'antd-mobile';
import {isAppView,is_weixn,PLAT} from '../common/const';
import  TitleNav from '../plugins/TitleNav/TitleNav';

class Download  extends  React.Component {
    constructor(props){
        super(props);

    }
    donwload(){
     if(PLAT()==='ios'){
         location.href=IOSPACK;
     }else{
         location.href=ANDROIDPACK;
     }
    }
    render(){
        return(<div className="download">
                <title>卡猫APP下载</title>
                <TitleNav  title="卡猫APP下载"  style={isAppView()||is_weixn()?{display:'none'}:{}}/>
                <div className="item1">
                    <img src={require('./../../images/V2/kamaoBlue.png')} alt=""/>
                    <div>卡猫3.8.0</div>
                </div>
                <div className="item2">
                    <div>全新界面布局，改变只为从心开始！</div>
                    <div>查信用卡余额、还款提醒、取现一步到位！</div>
                </div>
                <div  className="item3"><button onClick={this.donwload.bind(this)} type="button">立即下载</button></div>
                <div  className="item4">
                    <img src={require('./../../images/V2/Group 2@2xb.png')} alt=""/>
                </div>

            </div>
        )
    }
}

Download.contextTypes = {
    router: React.PropTypes.object.isRequired
};
export  default   Download
