import { useParams } from 'react-router-dom';
import articles from './article-content';
import NotFoundPage from './NotFoundPage';

const ArticlePage = () => {
    // const params = useParams();
    // const articleId = params.articleId;
    // const { articleId } = params;
    const { articleId } = useParams();
    const article = articles.find(article => article.name === articleId);

    if (!article) {
        return <NotFoundPage />
    }

    return (
        // Using react Fragment, <></>, since you cannot return more than one top level component
        <>
        <h1 key={article.title}>{article.title}</h1>
        <p key={article.content}>{article.content}</p>
        {/* {article.content.map(paragraph => (
            <p>{paragraph}</p>
        ))} */}
        </>
    );
}

export default ArticlePage;