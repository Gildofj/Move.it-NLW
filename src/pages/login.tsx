import { useContext, useState, ChangeEvent } from 'react';
import { GetServerSideProps } from 'next';

import { AuthContext } from '../contexts/AuthContext';

import styles from '../styles/pages/Login.module.css';

export default function Login () {
	const { insereUsernameGithub } = useContext(AuthContext);

	const [ usernameGithub, setUsernameGithub ] = useState('');
	const [ isDisabled, setIsDisabled ] = useState(true);

	function handleSubmit () {
		insereUsernameGithub(usernameGithub);
		window.location.pathname = '/';
	}

	function handleInputName (event: ChangeEvent<HTMLInputElement>) {
		setIsDisabled(false);
		setUsernameGithub(event.target.value);
	}

	return (
		<div className={styles.loginContainer} onSubmit={handleSubmit}>
			<img src="/icons/logo-background.svg" alt="Move.it Logo" />

			<div>
				<img src="/logo-full-light.svg" alt="Move.it Logo Title" />

				<form>
					<strong>Bem vindo</strong>

					<div>
						<img src="/icons/github-logo.svg" alt="Github Logo" />
						<p>Faça Login com seu Github para começar</p>
					</div>

					<div>
						<input type="text" placeholder="Digite seu nome" onChange={handleInputName} />
						<button type="submit" disabled={isDisabled}>
							<img src="/icons/arrow-right.svg" alt="Arrow" />
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const { level, currentExperience, challengesCompleted, usernameGithub } = ctx.req.cookies;

	if (usernameGithub) {
		return {
			redirect: {
				destination: '/',
				permanent: false,
			},
		};
	}

	return {
		props: {
			usernameGithub: usernameGithub,
			level: Number(level),
			currentExperience: Number(currentExperience),
			challengesCompleted: Number(challengesCompleted),
		},
	};
};
