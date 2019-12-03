import * as React from 'react';
import { cd, TexturesGenerator, requester } from 'Services';


interface IIllustrationViewProps {

}


interface IIllustrationViewState {
    loaded: boolean;
}

@cd(() => require('./TestTexture.scss'))
export class TestTexture extends React.Component<IIllustrationViewProps, IIllustrationViewState> {
    state = { loaded: false };

    canvas = React.createRef<HTMLCanvasElement>();

    data = {
        size: 700,
        min: 0,
        max: 255,
    };

    onInput = (name) => {
        return (e) => {
            this.data[name] = parseFloat(e.target.value)
        }
    };

    render(c?) {
        return (
            <div className={c('container')}>
                <canvas className={c('container')} ref={this.canvas} width={700} height={700}/>

                <label>
                    <span>octaves</span>
                    <input type="number" onInput={this.onInput('octaves')}/>
                </label>
                <br/>
                <label>
                    <span>amplitude</span>
                    <input type="number" onInput={this.onInput('amplitude')}/>
                </label>
                <br/>
                <label>
                    <span>frequency</span>
                    <input type="number" onInput={this.onInput('frequency')}/>
                </label>
                <br/>
                <label>
                    <span>persistence</span>
                    <input type="number" onInput={this.onInput('persistence')}/>
                </label>
                <br/>
                <button onClick={this.onSend}>Send</button>
            </div>
        )
    }

    onSend = () => { console.log(this.data);

    };

    componentDidMount(): void {
        const ctx = this.canvas.current.getContext('2d');

        /*requester.getSocket().on('randomTexture', ({data}) => {
            const pixels = Uint8ClampedArray.from(data);

            const imageData = new ImageData(pixels, 700, 700);

            ctx.putImageData(imageData, 0, 0);
        })*/
    }
}
