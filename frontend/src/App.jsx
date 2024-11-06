import React from 'react';
import '../src/styles/App.css';
import Ruraq from '../src/storage/img/ruraq maki.svg';

const LoadingPage = () => {
    return (
        <main>
            <div className="main__load">
                <img src={Ruraq}alt="Loading..." />
            </div>
        </main>
    );
};

export default LoadingPage;
