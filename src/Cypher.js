import React, { useState, useEffect } from 'react'

const Cypher = () => {
	const [KEY, setKey] = useState('Lorem')
	const [text, setText] = useState('')
	const [encrypted, setEncrypted] = useState('')

	const set = {
		key: setKey,
		text: setText,
		encrypted: setEncrypted
	}

	const alphanumeric =
		'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 '

	const onChange = e => {
		set[e.target.name](e.target.value)
	}

	useEffect(() => {
		onEncrypt()
	}, [KEY, text])

	useEffect(() => {
		onDecrypt()
	}, [encrypted])

	const onEncrypt = () => {
		let cypher = [],
			msg = text,
			key = KEY.replace(/[^a-zA-Z0-9]/gi, ''),
			keyL = key.length,
			alphaL = alphanumeric.length,
			buff

		for (let i = 0, l = msg.length; i < l; i++) {
			let k = alphanumeric.indexOf(key[i % keyL]) + 1
			let c = alphanumeric.indexOf(msg[i]) + 1
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
				alphanumeric.indexOf(alphanumeric[v - 1]) === -1
					? v
					: alphanumeric[v - 1]
			)
			.join('')

		setEncrypted(cypher)
	}

	const onDecrypt = () => {
		let msg = encrypted,
			cypher = [],
			key = KEY.replace(/[^a-zA-Z0-9]/gi, ''),
			keyL = key.length,
			alphaL = alphanumeric.length,
			buff

		for (let i = 0, l = msg.length; i < l; i++) {
			let k = alphanumeric.indexOf(key[i % keyL]) + 1
			let c = alphanumeric.indexOf(msg[i]) + 1
			if (!c) {
				cypher.push(msg[i])
				continue
			}
			buff = c - k
			cypher.push(buff > 0 ? buff : alphaL + buff)
		}

		cypher = cypher
			.map(v =>
				alphanumeric.indexOf(alphanumeric[v - 1]) === -1
					? v
					: alphanumeric[v - 1]
			)
			.join('')

		setText(cypher)
	}

	return (
		<div id='container'>
			<div className='single'>
				<span id='keyLegend'> Key</span>
				<input
					id='key'
					type='text'
					placeholder='Enter a key like "Hello"'
					value={KEY}
					name='key'
					onChange={onChange}
				/>
			</div>
			<div className='double'>
				<textarea
					placeholder='Enter text to encrypt'
					type='text'
					name='text'
					onChange={onChange}
					value={text}
				/>
			</div>
			<div className='double'>
				<textarea
					placeholder='Enter text to decrypt'
					type='text'
					name='encrypted'
					onChange={onChange}
					value={encrypted}
				/>
			</div>
		</div>
	)
}

export default Cypher
