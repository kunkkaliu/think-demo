// invoked in worker

global.G = {
	workers: think.config('workers'),
	exportLimitNum: 1000,
};
