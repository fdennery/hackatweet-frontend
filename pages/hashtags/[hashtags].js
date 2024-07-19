import Hashtags from '../../components/Hashtags';
import { useRouter } from 'next/router';

function HashtagsPage () {

    const router = useRouter();
    const { hashtag } = router.query;


    return <Hashtags hashtag={hashtag}/>;
}

export default HashtagsPage;