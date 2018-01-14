import React, { Component } from 'react';
class LoadView extends Component{

      componentDidMount() {
         let timeTip = 1;
         window.loadingTimeRun = setInterval(function () {
            timeTip ++ ;
             if(timeTip > 30) {
             window.clearInterval(window.loadingTimeRun);
             window.location.href="/#/error?desc="+encodeURI("网络错误，请稍后重试");
         }
         },1000)
     }

     componentWillUnmount() {
        window.clearInterval(window.loadingTimeRun);
     }

    render(){
        return<div className="loadMask">
        </div>
    }
}

export default LoadView;