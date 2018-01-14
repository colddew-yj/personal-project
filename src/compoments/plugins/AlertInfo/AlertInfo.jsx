import  React from 'react';
import  {Link} from 'react-router';
import './style.less';
class  AlertInfo extends  React.Component {
    constructor(props){
        super(props);
        this.state={
            showAlert:false,
            iconType:0  , //0 loading  ,  1  success , 2 false
            iconStatus:true,
            textVal:'',
            extendStyle:{},
            autoClose:true
        }
    }
    hide(event){
        if(this.props.iconType!==0){
            this.props.changeShow();
            window.event?event.cancelBubble=true:event.stopPropagation();
        }
    }
    //信息提示框:
    //本组件使用场景很宽泛,相对比较复杂,若是简单需求,参考antd-mb 的modal
    //属性           描述                                                    默认值
    /*
    * showAlert:     是否显示弹框                                             false
    * extendStyle:    额外的样式(如:距离顶部的距离padding-top)                 {}
    * iconType:        图片类型:0/undefiend:loading;1:成功;2:失败             0
    * iconStatus:       是否显示图片                                          false
    * textVal:          文字内容                                            ""
    *
    * hide=>changeShow:          点击周边区域自动隐藏
    *
    * 如需自动关闭 请在外层使用:
    *
            * autoClose(){
                 window.clearAlert =  setTimeout(()=>{
                     this.setState({
                         showAlert:false
                     })
                 },2000);
             }
    * */

    render(){
        return(
            <div className={this.props.showAlert?'alertInfo':'hideEle'} onClick={this.hide.bind(this)} >
                <div style={(this.props.extendStyle==={}||!this.props.extendStyle)?{}:this.props.extendStyle}>
                    <img src={!this.props.iconType?require('./img/load.gif'):(this.props.iconType===1?require('./img/r.png'):require('./img/w.png'))}
                         alt="" style={this.props.iconStatus?{}:{display:'none'}}/>
                    <div className="text" >{this.props.textVal}</div>
                </div>
            </div>
        )
    }
}

export  default  AlertInfo