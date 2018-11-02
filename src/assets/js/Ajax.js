import env from '../../Enviroment';

export default (path, data) => {
	return new Promise((resolve, reject) => {
		fetch(
			`${ env.api_url }${path}?${Object.keys(data).map(key => key + '=' + data[key]).join('&')}`
		)
		.then(response => response.json())
		.then(response => resolve(response))
		.catch(error => reject(error));
	})
}