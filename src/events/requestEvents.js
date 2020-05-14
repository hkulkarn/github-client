import axios from 'axios';

const requestEvent = ({ owner, repo } = {}) => {
	if (!owner || !repo) {
		return Promise.resolve({ error: 'repo owner and repo name are required' });
	}
	return axios
		.get(`https://api.github.com/repos/${owner}/${repo}/events`)
		.then((res) => res.data);
};
export default requestEvent;
