import React from 'react';

const Loading = () => {
    return (
        <div className='container'>
            <div class="d-flex justify-content-center">
                <div class="spinner-border mt-5 " role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
        </div>
    );
};

export default Loading;