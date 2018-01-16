import {
	ACCOUNT_TYPE_MEMBER,
	ACCOUNT_TYPE_ADMIN,
	ACCOUNT_TYPE_SUPER_ADMIN
} from '../store/consts';

export function getPath(role) {
	if (role === ACCOUNT_TYPE_MEMBER) {
		return '/user';
	}
	if (role === ACCOUNT_TYPE_ADMIN) {
		return '/admin';
	}
	if (role === ACCOUNT_TYPE_SUPER_ADMIN) {
		return '/special'
	}
	return '/';
}

export function push (path, push, props) {
	if (!path) {
		console.error('Path is not defined');
	}
	return props ? push(path, props) : push(path);
}
