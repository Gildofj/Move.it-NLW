import { createContext, ReactNode, useEffect, useState } from 'react';
import cookies from 'js-cookie';

interface AuthContextData {
	usernameGithub: string;
	insereUsernameGithub: (username: string) => void;
}

interface AuthProviderProps {
	children: ReactNode;
	usernameGithub: string;
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider ({ children, ...rest }: AuthProviderProps) {
	const [ usernameGithub, setUserNameGithub ] = useState(rest.usernameGithub ?? '');

	useEffect(
		() => {
			cookies.set('usernameGithub', usernameGithub);
		},
		[ usernameGithub ],
	);

	function insereUsernameGithub (username: string) {
		setUserNameGithub(username);
	}

	return <AuthContext.Provider value={{ usernameGithub, insereUsernameGithub }}>{children}</AuthContext.Provider>;
}
