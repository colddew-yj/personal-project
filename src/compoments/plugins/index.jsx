import  React from 'react';
import  { connect }from 'react-redux';
import AlertInfo from './AlertInfo/AlertInfo';
import TitleNav from './TitleNav/TitleNav';
import Modal from './Modal/Modal';
import Concat from './Concat/Concat'
class  IndexDemo extends  React.Component {
    constructor(props){
        super(props);
        this.state={
            showModal:false,
            closeDownload:false
        }
    }
    //Modal
    hideModal(event){
        console.log("yc");
    }
    handler(){
        console.log("其他操作");
    }
    //TitleNav:
    toHander(){
        console.log('success');
    }
    //alertInfo:
    changeShow(){
        this.setState({
            showAlert:false
        })
    }
    autoClose(){
        window.clearAlert =  setTimeout(()=>{
            this.setState({
                showAlert:false
            })
        },2000);
    }
    render(){
        return(<div>
                <TitleNav title="信用卡取现" opText="管理" handler={this.toHander.bind(this)} ></TitleNav>
                <AlertInfo {...this.state} changeShow={this.changeShow.bind(this)} />
                <Modal title="测试" content="ceshi测试内容ceshi测试内容ceshi测试内容ceshi测试内容ceshi测试内容" footer={['yes']}
                       hideModal={this.hideModal.bind(this)} handler={this.handler.bind(this)} isBtnClose={false}/>
                <Concat title="测试" content="ceshi测试内容ceshi测试内容ceshi测试内容ceshi测试内容ceshi测试内容" footer={['yes']}
                        hideModal={this.hideModal.bind(this)} handler={this.handler.bind(this)} isBtnClose={false}/>
            </div>
        )

    }

}


IndexDemo.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default IndexDemo