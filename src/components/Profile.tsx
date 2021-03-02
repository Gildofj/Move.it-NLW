import { useContext, useEffect, useState } from 'react';
import axios from 'axios';

import { AuthContext } from '../contexts/AuthContext';
import { ChallengesContext } from '../contexts/ChallengesContext';

import styles from '../styles/components/Profile.module.css';

export function Profile () {
	const { level } = useContext(ChallengesContext);
	const { usernameGithub } = useContext(AuthContext);

	const [ name, setName ] = useState('');

	useEffect(
		() => {
			async function getUserGithub () {
				const { data } = await axios.get(`https://api.github.com/users/${usernameGithub}`);
				setName(data.name);
			}

			getUserGithub();
		},
		[ usernameGithub ],
	);

	return (
		<div className={styles.profileContainer}>
			<img src={`https://github.com/${usernameGithub}.png`} alt={name} />
			<div>
				<strong>{name}</strong>
				<p>
					<img src="icons/level.svg" alt="Level" />
					Level {level}
				</p>
			</div>
		</div>
	);
}
