// components/news/NewsList.js
import React from 'react';

const NewsList = ({ articles }) => {
  if (!articles || articles.length === 0) {
    return <div className="text-center py-6">No news articles available</div>;
  }
  
  return (
    <div className="space-y-4">
      {articles.map((article, index) => (
        <div key={index} className="border-b pb-4 last:border-b-0">
          <h3 className="text-lg font-semibold mb-2">
            <a 
              href={article.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-blue-600 transition"
            >
              {article.title}
            </a>
          </h3>
          
          <p className="text-gray-600 mb-2">{article.description}</p>
          
          <div className="flex items-center text-sm text-gray-500">
            <span>{new Date(article.pubDate).toLocaleDateString()}</span>
            <span className="mx-2">•</span>
            <span>{article.source_id}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NewsList;