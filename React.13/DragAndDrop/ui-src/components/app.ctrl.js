import React, {Component} from 'react';

import Actions from '../flux/Actions';
import AppStore from '../flux/App.Store';

import DCtrl from './dnd.ctrl';
import JList from './common/jList';

var AppCtrlSty = {
	padding: '0 10px 0 0'
}
var startLineStyle = {
	color: '#1F1',
	marginLeft: '7px'
}
var overLineStyle = {
	color: '#F11',
	marginLeft: '7px'
}
var endLineStyle = {
	color: '#11F',
	marginLeft: '7px'
}

class AppCtrlRender extends Component {
	binder(...methods) { methods.forEach( (method) => this[method] = this[method].bind(this) ); }

	render() {
		var isMobile = this.state.appData.isMobile;
		var messages = this.state.appData.messages;
		return (
			<div id='AppCtrlSty' style={AppCtrlSty}>
				React 1.3 Drag and Drop
				<br/><br/>
				<div className='FlexBoxWrap'>
					<DCtrl isMobile={isMobile}/>
					<div style={{marginLeft: '10px'}}>
						<span style={startLineStyle}>drag start</span><br/>
						<span style={overLineStyle}>drag over</span><br/>
						<span style={endLineStyle}>drag end</span><br/>
					</div>
					<JList data={messages}/>
				</div>
			</div>
		);
	}
}

var getAppState = function() {
	// console.log('AppCtrl getAppState');
	return {
		appData: AppStore.getAppData()
	};
};

export default class AppCtrl extends AppCtrlRender {
	constructor() {
	  super();
		this.state = getAppState();
	  this.binder('appStoreDidChange');
	}

	componentDidMount() {
		var navPlatform = window.navigator.platform;
		Actions.setWindowDefaults(navPlatform);
	}
	componentWillMount() { AppStore.onAny(this.appStoreDidChange); }
	componentWillUnmount() { AppStore.offAny(this.appStoreDidChange); }
	appStoreDidChange() { this.setState(getAppState()); }
}
