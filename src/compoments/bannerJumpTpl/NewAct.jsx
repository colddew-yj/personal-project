import  React from 'react';
import  TitleNav from '../plugins/TitleNav/TitleNav';
import {is_weixn,isAppView} from './../common/const';
import {Toast} from 'antd-mobile';

class  NewAct extends  React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading:false
        }
    }

    // componentDidMount(){
    //     Toast.loading('',60);
    // }
    //
    // handleImageChange(){
    //     console.log('s');
    //     const galleryElement = this.refs.gallery;
    //     console.log(galleryElement);
    //     if(galleryElement){
    //         console.log(galleryElement);
    //         let imgElements = galleryElement.querySelectorAll('img');
    //         for (const img of imgElements) {
    //             if (!img.complete) {
    //                 this.setState({
    //                     loading:true
    //                 })
    //             }else{
    //                 this.setState({
    //                     loading:false
    //                 })
    //             }
    //         }
    //         console.log(galleryElement.querySelectorAll('img'));
    //     }
    //
    //
    // }
    render(){
        // if(!this.state.loading){
        //     console.log('sc');
        //     Toast.hide();
        // }
        return(<div className="newAct">
                <title >首单免刷活动</title>
                <TitleNav title="首单免刷活动" style={isAppView()||is_weixn()?{display:'none'}:{}}/>

              <div style={{fontSize: 0}} ref="gallery">
                  <img  src={require('./../../images/V2/up.png')}
                        alt="" style={{width:'100%'}}/><img src={require('./../../images/V2/down.png')} alt="" style={{width:'100%'}}/>
              </div>
            </div>
        )
    }
}
NewAct.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export  default   NewAct