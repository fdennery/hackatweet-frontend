import styles from '../styles/Trends.module.css'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react';


function Trends(props) {

const router = useRouter();
console.log(props)

console.log('trends props', props)




const handleTrendClick = (hashtag) => {
    router.push(`/hashtags/${hashtag}`)
}

    const trends = props.trends.map((e,i) => {
        return <span className={styles.trend} onClick={() => handleTrendClick (e._id.substring(1))}> <p className={styles.hashtag}>{e._id}</p><p className={styles.tweetCount}>{e.count} Tweets</p></span>

    })

    return (
        <div className={styles.trendsContainer}>
        {trends}

        </div>
    )
}

export default Trends;