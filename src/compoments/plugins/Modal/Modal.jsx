import  React from 'react';
import './style.less';
class  Modal extends  React.Component {
    constructor(props){
        super(props);
    }

    hide() {
        this.props.hide();
    }

    stopBul(e) {
        console.log('ss');
        e.stopPropagation();
        // e.preventDefault();
        // e.nativeEvent.stopImmediatePropagation();
        // window.event?event.cancelBubble=true:event.stopPropagation();
    }
    render(){
        return(
            <div className="dialog" onClick={this.hide.bind(this)} style={this.props.visible?{}:{display:'none'}}>
                <div id="content" onClick={this.stopBul.bind(this)} className={this.props.contentClass?this.props.contentClass:'content'}>
                    {
                        this.props.getContentTpl
                    }
                </div>
            </div>
        )
    }

}

Modal.contextTypes = {
    router: React.PropTypes.object.isRequired
};
export  default  Modal