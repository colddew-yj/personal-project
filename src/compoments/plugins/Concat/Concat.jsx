import  React from 'react';
import './style.less';

class  Concat extends  React.Component {
    constructor(props){
        super(props);
        // this.state={
        //     autoClose:true
        // }
    }
    hideEle(){

        console.log("隐藏");
        this.props.hideModal();
        try {
            window.event?event.cancelBubble=true:event.stopPropagation();
        }catch(e){
            console.log(e);
        }
    }
    handler(index){
        if(index===0){
            this.props.hideModal();
        }else{
            try{
                this.props.handler();
            }catch (e){
                console.log(e);
            }
        }
    }
    // stopEvent(){
    //     window.event?event.cancelBubble=true:event.stopPropagation();
    // }

    render(){
        return(
            <div className="concat"  style={this.props.showModal?{display:'block'}:{display:'none'}} >
                <div className="concatDialog" >
                    <div className="header">
                        <span style={this.props.isBtnClose?{display:'none'}:{}}>{}</span><span>{this.props.title}</span><span style={this.props.isBtnClose?{display:'none'}:{}} onClick={this.hideEle.bind(this)}>&#215;</span>
                     </div>
                    <div className="body" style={this.props.isBtnClose?{marginBottom: '2.4rem'}:{}}>
                        <div className="imgs">
                            <div><a href="https://kefu.easemob.com/webim/im.html?tenantId=20888"><img src={require('./../../../images/2e.png')} alt=""/><span>在线客服</span></a></div>
                            <div><a href='tel:4006662017'><img src={require('./../../../images/3er.png')} alt=""/><span>电话客服</span></a></div>
                        </div>
                        <div className="timeD">工作时间：周一至周六 </div>
                        <div className="timeD">9:00-12:00     14:00-18:00</div>
                    </div>
                    <div className="footer" style={!this.props.isBtnClose?{display:'none'}:{}}>{
                        !this.props.footer ?
                            <div>
                                <div onClick={this.handler.bind(this,0)}>取消</div>
                                <div onClick={this.handler.bind(this,1)}>确定</div>
                            </div>
                            :
                            <div>{
                                this.props.footer.map((val,key)=>{
                                    return   <div key={key} onClick={this.handler.bind(this,key)}>{val}</div>
                                })
                            }</div>
                    }
                    </div>

                </div>
         </div>
        )
    }
}

export  default  Concat