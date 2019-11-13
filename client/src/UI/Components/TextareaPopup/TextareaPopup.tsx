import * as React from 'react';
import { Button } from 'UI';
import { sl } from 'Services';


interface ITextareaPopupProps {
    button?: string;
    textareaData: any;
    onClick?: Function;
}


export const TextareaPopup = function({button, textareaData, onClick}:ITextareaPopupProps) {
    const c = sl(() => require('./TextareaPopup.scss'));
    const textarea: any = React.createRef();
    return (
        <div className={c('container')}>
            <textarea className={c('textarea')} ref={textarea}>{textareaData}</textarea>
            {
                button && <Button onClick={() => onClick(textarea.current.value)}>{button}</Button>
            }
        </div>
    )
};


