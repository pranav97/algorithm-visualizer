import React from 'react';

class ResetButton extends React.Component {
    render() {
        return (
            <div className='reset-button'>
                <button className="ui labeled icon button">
                <i className="undo alternate icon"></i>
                </button>
            </div>

        );

    }
}
export default ResetButton;