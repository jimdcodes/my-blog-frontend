import { useParams } from 'react-router-dom';

const ArticlePage = () => {
    // const params = useParams();
    // const articleId = params.articleId;
    // const { articleId } = params;
    const { articleId } = useParams();

    return (
        <h1>This is the article page for the article with id: {articleId}!</h1>
    );
}

export default ArticlePage;