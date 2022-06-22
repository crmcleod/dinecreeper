import React, { useState, useEffect } from 'react';
const Modal = ({ restartGame }) => {
    return (
        <div id='modal'>
            <div id='winner'>
                <div>

                    <h2>
                        Congratulations you managed to avoid everyone!
                    </h2>
                    <button onClick={() => restartGame()}>
                        Try Again?
                    </button>
                </div>
            </div>
        </div>
    )
}
export default Modal