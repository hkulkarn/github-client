import React from 'react';
import styles from './SingleEvent.module.scss';

const SingleEvent = ({ event }) => {
	return (
		<div className={styles.event}>
			<div className={styles.type}>{event.type}</div>
			<div className={styles.actor}>
				<div className={styles.avatar}>
					<img alt='avatar' src={event.actor.avatar_url} />
				</div>
				<ul>
					<li>ID: {event.actor.id}</li>
					<li>Login: {event.actor.login}</li>
					<li>Display login: {event.actor.display_login}</li>
				</ul>
			</div>
			<div>
				created at:{' '}
				<span>
					{new Date(event.created_at).toLocaleDateString()}{' '}
					{new Date(event.created_at).toLocaleTimeString()}
				</span>
			</div>
		</div>
	);
};

export default SingleEvent;
