import mockAxios from 'axios';
import requestEvents from './requestEvents';

it('calls github event api and return events', async () => {
	//setup
	mockAxios.get.mockImplementationOnce(() =>
		Promise.resolve({
			data: {},
		})
	);
	// execute
	const data = await requestEvents({
		owner: 'drehimself',
		repo: 'laravel-ecommerce-example',
	});

	expect(data).toBeDefined();
	expect(mockAxios.get).toHaveBeenCalledTimes(1);
});

it('calls github event api with missing params', async () => {
	// execute
	const res = await requestEvents();

	expect(res.error).toBe('repo owner and repo name are required');
	expect(mockAxios.get).toHaveBeenCalledTimes(1);
});
