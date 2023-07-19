import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import articles from './article-content';
import CommentsList from '../components/CommentsList';
import AddCommentForm from '../components/AddCommentForm';
import useUser from '../hooks/useUser';
import NotFoundPage from './NotFoundPage';

const ArticlePage = () => {
    const [articleInfo, setArticleInfo] = useState({ upvotes: 0, comments: [] });
    const { articleId } = useParams();

    const { user, isLoading } = useUser();

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

    const addUpvote = async () => {
        const response = await axios.put(`/api/articles/${articleId}/upvote`);
        const updatedArticle = response.data;
        setArticleInfo(updatedArticle);
    }

    if (!article) {
        return <NotFoundPage />
    }

    return (
        // Using react Fragment, <></>, since you cannot return more than one top level component
        <>
        <h1 key={article.title}>{article.title}</h1>
        <div className="upvotes-section">
            {user
                ? <button onClick={addUpvote}>Upvote</button>
                : <button>Log in to upvote</button>}
            <p key={article.title + ": " + article.articleInfo}>This article has {articleInfo.upvotes} upvote(s)</p>
        </div>
        <p key={article.content + article.title}>{article.content}</p>
        {/* {article.content.map(paragraph => (
            <p>{paragraph}</p>
        ))} */}
        {user 
        ? <AddCommentForm
            articleName={articleId}
            onArticleUpdated={updatedArticle => setArticleInfo(updatedArticle)} />
        : <button>Log in to add a comment</button>}
        <CommentsList comments={articleInfo.comments} />
        </>
    );
}

export default ArticlePage;