import React from 'react';
import { FacebookShareButton as FBShareButton, FacebookIcon } from 'react-share';

const FacebookShareButton = ({ url, quote, hashtag }) => (
    <FBShareButton url={url} quote={quote} hashtag={hashtag}>
        <FacebookIcon size={32} round />
    </FBShareButton>
);

export default FacebookShareButton;
