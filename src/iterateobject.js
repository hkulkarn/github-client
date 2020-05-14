import React from 'react';

const visit = (obj, titleVisible = true, level = 0) => {
	const keys = Object.keys(obj);

	return (
		<>
			{keys.map((key) => {
				return obj[key] && typeof obj[key] === 'object' ? (
					<>
						{titleVisible && <h2>{key}</h2>}
						{visit(obj[key], !Array.isArray(obj[key]), level + 1)}
						{level === 0 && <hr />}
					</>
				) : (
					<p key={`${key}-${obj[key]}`}>
						<span
							style={{
								color: '#f0654f',
								padding: '5px 10px',
							}}
						>
							{key}
						</span>
						:{' '}
						{obj[key] &&
							typeof obj[key] === 'string' &&
							(obj[key].indexOf('https:') !== -1 ? (
								<a rel='noopener noreferrer' target='_blank' href={obj[key]}>
									{obj[key]}
								</a>
							) : (
								obj[key]
							))}
					</p>
				);
			})}
		</>
	);
};

export default visit;
