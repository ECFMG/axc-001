import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import type { ReactNode } from 'react';

export default function Home(): ReactNode {
	const { siteConfig } = useDocusaurusContext();
	return (
		<Layout
			title={siteConfig.title}
			description={siteConfig.tagline}
		>
			<main className="container margin-vert--lg">
				<h1>{siteConfig.title}</h1>
				<p>{siteConfig.tagline}</p>
				<p>
					<Link
						className="button button--primary button--lg"
						to="/docs/intro"
					>
						Read the docs
					</Link>
				</p>
			</main>
		</Layout>
	);
}
