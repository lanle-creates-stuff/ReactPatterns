import React, {Component} from 'react';
import lodash from 'lodash';

var defaultCountSty = {
	backgroundColor: '#33045B',
	height: '12px',
	marginRight: '5px',
	marginTop: '4px',
	width: '100%'
}

var defaultIndexSty = {backgroundColor: '#874C08', height: '6px', borderTop: '3px solid #33045B', width: '1%'}
var centerSty = {marginLeft: 'auto', marginRight: 'auto', marginTop: '-33px'}

class JProgressBarRender extends Component {
	render() {
		if (!this.props.data) return null;
		var count = this.props.data.count;
		var index = this.props.data.index + 1;
		var percentage = Math.floor(index/count * 100);

		let countSty = this.props.countSty ? this.props.countSty : defaultCountSty;
		let indexSty = this.props.indexSty ? this.props.indexSty : defaultIndexSty;
		indexSty.width = percentage + '%';
		countSty.backgroundColor = this.props.countColor ? this.props.countColor : '#33045B';
		indexSty.backgroundColor = this.props.indexColor ? this.props.indexColor : '#874C08';
		indexSty.borderTopColor = countSty.backgroundColor;

		let barRender = (
			<div id='countSty' style={countSty}>
				<div id='indexSty' style={indexSty}></div>
			</div>
		);

		var progressRender = '';
		let position = lodash.has(this.props, 'position') ? this.props.position : 'center';
		switch (position) {
			case 'center': progressRender = (
				<div id='JProgressBar' style={{width: '100%'}}>
					{barRender}<br/>
					<div style={{textAlign: 'center', width: '100%'}}>
						<div style={centerSty}>{index}&nbsp;/&nbsp;{count}</div>
					</div>
				</div>
			); break;
			case 'after': progressRender = (
				<div id='JProgressBar' className='FlexBox' style={{width: '100%'}}>
					{barRender}
					{index}&nbsp;/&nbsp;{count}
				</div>
			); break;
			case 'before': progressRender = (
				<div id='JProgressBar' className='FlexBox' style={{width: '100%'}}>
					{index}&nbsp;/&nbsp;{count}&nbsp;
					{barRender}
				</div>
			); break;
			case 'beforenafter': progressRender = (
				<div id='JProgressBar' className='FlexBox' style={{width: '100%'}}>
					{index}&nbsp;
					{barRender}
					&nbsp;{count}
				</div>
			); break;
			case 'none': progressRender = (
				<div id='JProgressBar' style={{width: '100%'}}>
					{barRender}
				</div>
			); break;
		}
		return progressRender;
	}
}

export default class JProgressBar extends JProgressBarRender {}
