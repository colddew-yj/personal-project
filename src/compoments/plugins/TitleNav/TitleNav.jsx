import  React from 'react';
import  { connect }from 'react-redux';
import  {Link} from 'react-router';
import {fetchPost,fetchGet} from 'jrbasic';
import { AjaxGet } from 'jrbasic'
import './style.less';
class  TitleNav extends  React.Component {
    constructor(props){
        super(props);
    }
    //顶部导航栏:
    //属性           描述                                                    默认值
    /*
     * preUrl:     返回的地址                                                   历史上一页
     * title:       标题名   (必填)                                                 ''
     * handler:        右上角回调方法                                            客服操作
     * opUrl:           右上角链接地址                                             刷新
     * opImg:          右上角图片路径                                           客服图标
     * opText           右上角文字                                                无
     * style
     *
     * */
    goBack(){
        this.props.preUrl? window.location.replace('/#'+this.props.preUrl):window.history.go(-1);

    }
    goRefresh(){
        if(this.props.handler){
            this.props.handler();
        }else{
            this.props.opUrl?(window.location.href=this.props.opUrl): "";
        }

    }
    render(){
        return(
            <div className="titleNav" style={this.props.style}>
                <a href="javascript:;" onClick={this.goBack.bind(this)}><img src={require('./img/back.png')} alt=""/>
                    <span></span>
                </a>
                <span>{this.props.title}</span>
                <a href="javascript:;"
                   onClick={this.goRefresh.bind(this)}><img style={this.props.opText?{display:'none'}:{}}
                                                            src={this.props.opImg?this.props.opImg:null} alt=""/>
                    {this.props.opText?this.props.opText:''}
                </a>
            </div>
        )
    }

}

TitleNav.contextTypes = {
    router: React.PropTypes.object.isRequired
};
export  default  TitleNav