import Head from 'next/head';
import { GetServerSideProps } from 'next';

import { Profile } from '../components/Profile';
import { CompletedChallenges } from '../components/CompletedChallenges';
import { ExperienceBar } from '../components/ExperienceBar';
import { Countdown } from '../components/Countdown';
import { ChallengeBox } from '../components/ChallengeBox';
import { CountdownProvider } from '../contexts/CountdownContext';

import styles from '../styles/pages/Home.module.css';
import { ChallengesProvider } from '../contexts/ChallengesContext';

interface HomeProps {
	level: number;
	currentExperience: number;
	challengesCompleted: number;
}

export default function Home (props: HomeProps) {
	return (
		<ChallengesProvider
			level={props.level}
			currentExperience={props.currentExperience}
			challengesCompleted={props.challengesCompleted}
		>
			<div className={styles.container}>
				<Head>
					<title>Inicio | Move.it</title>
				</Head>

				<ExperienceBar />

				<CountdownProvider>
					<section>
						<div>
							<Profile />
							<CompletedChallenges />
							<Countdown />
						</div>
						<div>
							<ChallengeBox />
						</div>
						<div />
					</section>
				</CountdownProvider>
			</div>
		</ChallengesProvider>
	);
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const { level, currentExperience, challengesCompleted, usernameGithub } = ctx.req.cookies;

	if (!usernameGithub) {
		return {
			redirect: {
				destination: '/login',
				permanent: false,
			},
		};
	}

	return {
		props: {
			usernameGithub,
			level: Number(level),
			currentExperience: Number(currentExperience),
			challengesCompleted: Number(challengesCompleted),
		},
	};
};
