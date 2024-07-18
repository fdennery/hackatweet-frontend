import styles from '../styles/Home.module.css';
import Head from 'next/head'

function Home() {
  return (
    <div>
      <Head> 
        <title> Hackatweet - Home</title> 
        </Head>

    <div className={styles.leftContainer}>
      <span>Logo PlaceHolded</span>
      <div className={styles.logoutContainer}>
        <span>User PlaceHolder</span>
        <button>Logout</button>
      </div>
    </div>

    <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>
      </main>
    </div>
  );
}

export default Home;
