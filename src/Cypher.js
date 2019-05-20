import React, { Component } from 'react'

export default class Cypher extends Component {
	alphanumeric =
		'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

	state = {
		key: 'Lorem',
		text: '',
		encrypted: ''
	}

	onChange = e => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	onEncrypt = () => {
		let cypher = [],
			msg = this.state.text,
			key = this.state.key.replace(/[^a-zA-Z0-9]/gi, ''),
			keyL = key.length,
			alphaL = this.alphanumeric.length,
			buff

		for (let i = 0, l = msg.length; i < l; i++) {
			let k = this.alphanumeric.indexOf(key[i % keyL]) + 1
			let c = this.alphanumeric.indexOf(msg[i]) + 1
			if (!c) {
				cypher.push(msg[i])
				continue
			}

			if (k + c > alphaL) buff = 1
			else buff = 0
			cypher.push(((k + c) % (alphaL + 1)) + buff)
		}

		cypher = cypher
			.map(v =>
				this.alphanumeric.indexOf(this.alphanumeric[v - 1]) === -1
					? v
					: this.alphanumeric[v - 1]
			)
			.join('')
		console.log(msg)
		return cypher
	}

	onDecrypt = () => {
		// let msg = this.state.encrypted,
		// 	cypher = [],
		// 	key = this.state.key.replace(/[^a-zA-Z0-9]/gi, ''),
		// 	keyL = key.length,
		// 	alphaL = this.alphanumeric.length,
		// 	buff
		// for (let i = 0, l = msg.length; i < l; i++) {
		// 	let k = this.alphanumeric.indexOf(key[i % keyL]) + 1
		// 	let c = this.alphanumeric.indexOf(msg[i]) + 1
		// 	if (!c) {
		// 		cypher.push(msg[i])
		// 		continue
		// 	}
		// 	buff = c - k
		// 	cypher.push(buff > 0 ? buff : alphaL + buff)
		// }
		// cypher = cypher
		// 	.map(v =>
		// 		this.alphanumeric.indexOf(this.alphanumeric[v - 1]) === -1
		// 			? v
		// 			: this.alphanumeric[v - 1]
		// 	)
		// 	.join('')
		// return cypher
	}

	render() {
		return (
			<div id='container'>
				<div className='single'>
					<Input
						id='key'
						type='text'
						placeholder='Enter a key like "Hello"'
						value='Lorem'
						onChange={this.onChange}
					/>
					<span> Key</span>
				</div>
				<div className='double'>
					<Textarea
						placeholder='Enter text and click Encrypt'
						id='in'
						type='text'
						name='text'
						onChange={this.onChange}
						value={this.onDecrypt(this.state.text)}
					/>
				</div>
				<div className='double'>
					<Textarea
						placeholder='Enter text and click Decrypt'
						id='out'
						type='text'
						name='encrypted'
						onChange={this.onChange}
						value={this.onEncrypt(this.state.encrypted)}
					/>
				</div>
			</div>
		)
	}
}

const Input = props => <input {...props} />

const Textarea = props => <textarea {...props} />
