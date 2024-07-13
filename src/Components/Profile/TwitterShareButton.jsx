import React, { useEffect } from 'react';

const TwitterShareButton = ({ text, url, hashtags, via, size }) => {
  useEffect(() => {
    // Load Twitter for Websites JavaScript
    const script = document.createElement('script');
    script.src = 'https://platform.twitter.com/widgets.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Build the URL with parameters
  const tweetUrl = `https://twitter.com/intent/tweet?${new URLSearchParams({
    text,
    url,
    hashtags: hashtags.join(','),
    via,
  }).toString()}`;

  return (
    <a
      href={tweetUrl}
      className="twitter-share-button"
      data-size={size}
      target="_blank"
      rel="noopener noreferrer"
    >
      Tweet
    </a>
  );
};

export default TwitterShareButton;
