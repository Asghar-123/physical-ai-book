import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import ChatbotWidget from '@site/src/components/ChatbotWidget'; // Import the ChatbotWidget
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro">
            Start Reading the Book 📖
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <HomepageHeader />
      <main>
        <div className="container margin-top--lg">
          <p>Welcome to the AI-Native Textbook on Physical AI & Humanoid Robotics. Dive deep into the world of ROS 2, Gazebo, Isaac Sim, and advanced AI techniques to build and control intelligent robots.</p>
          <p>This book is designed for aspiring AI engineers and roboticists who want to master the fundamentals and cutting-edge applications of physical AI. Explore chapters on robot nervous systems, digital twin creation, AI perception, cognitive planning, and more.</p>
        </div>
      </main>
      <ChatbotWidget /> {/* Add the ChatbotWidget here */}
    </Layout>
  );
}
