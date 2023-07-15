import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import articles from './article-content';
import NotFoundPage from './NotFoundPage';

const ArticlePage = () => {
    const [articleInfo, setArticleInfo] = useState({ upvotes: 0, comments: [] });
    const { articleId } = useParams();

    useEffect(() => {
        const loadArticleInfo = async () => {
            const response = await axios.get(`/api/articles/${articleId}`);
            const newArticleInfo = response.data;
            setArticleInfo(newArticleInfo);
        }
        loadArticleInfo();
    }, []);

    // const params = useParams();
    // const articleId = params.articleId;
    // const { articleId } = params;
    const article = articles.find(article => article.name === articleId);

    if (!article) {
        return <NotFoundPage />
    }

    return (
        // Using react Fragment, <></>, since you cannot return more than one top level component
        <>
        <h1 key={article.title}>{article.title}</h1>
        <p key={article.title + ": " + article.articleInfo}>This article has {articleInfo.upvotes} upvote(s)</p>
        <p key={article.content + article.title}>{article.content}</p>
        {/* {article.content.map(paragraph => (
            <p>{paragraph}</p>
        ))} */}
        </>
    );
}

export default ArticlePage;