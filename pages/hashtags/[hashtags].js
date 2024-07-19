import Hashtags from '../../components/Hashtags';
import { useRouter } from 'next/router';

function HashtagsPage () {

    const router = useRouter();
    const { hashtags } = router.query;
    console.log('query' , router.query)


    return <Hashtags hashtag={hashtags}/>;
}

export default HashtagsPage;