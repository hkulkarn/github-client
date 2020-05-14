import React, { useState, useMemo } from 'react';
import styles from './Events.module.scss';
import requestEvents from './requestEvents';
import Loader from '../Loader/Loader';
import ListEvents from './ListEvents';

const Events = () => {
	const [params, setParams] = useState({
		owner: '',
		repo: '',
		eventType: '',
	});
	const [response, setResponse] = useState({ loading: false, errored: false });

	const handleChange = (e) => {
		setParams({ ...params, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setResponse({ ...response, loading: true, errored: false });

		requestEvents(params)
			.then((data) => setResponse({ loading: false, errored: false, data }))
			.catch((e) => setResponse({ errored: e }));
	};

	return (
		<div className={styles.eventsPage}>
			<form style={{ textAlign: 'center' }} onSubmit={handleSubmit}>
				<div className={styles.formGroup}>
					<label htmlFor='owner'>Owner </label>
					<input
						id='owner'
						onChange={handleChange}
						value={params.owner}
						name='owner'
						placeholder='Enter owner name'
						required={true}
					/>
				</div>
				<div className={styles.formGroup}>
					<label htmlFor='repo'>Repo</label>
					<input
						id='repo'
						onChange={handleChange}
						value={params.repo}
						name='repo'
						placeholder='Enter repo name'
						required={true}
					/>
				</div>
				<button className={styles.fetch}>Fetch Events</button>
			</form>

			<div className={styles.eventResults}>
				{response.loading && <Loader />}
				{response.errored && 'Repo Was Not Found'}
				{response.data && response.data.length > 0 && (
					<ListEvents events={response.data} />
				)}
				{response.data &&
					response.data.length === 0 &&
					'There are no events in this repo'}
			</div>
		</div>
	);
};

export default Events;
