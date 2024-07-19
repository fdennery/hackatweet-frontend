import styles from '../styles/Trends.module.css'


function Trends(props) {

  console.log(props)


    const trends = props.trends.map((e,i) => {
        return <span className={styles.trend}> <p className={styles.hashtag}>{e._id}</p><p className={styles.tweetCount}>{e.count} Tweets</p></span>

    })

    return (
        <div className={styles.trendsContainer}>
        {trends}

        </div>
    )
}

export default Trends;