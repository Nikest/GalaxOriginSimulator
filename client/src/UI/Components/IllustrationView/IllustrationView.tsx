import * as React from 'react';
import { cd, TexturesGenerator } from 'Services';
import { Preloader } from 'UI';


interface IIllustrationViewProps {
    size: number,
    astroBody: any,
    hash: string;
    colorArray?: number[];
}


interface IIllustrationViewState {
    loaded: boolean;
}

@cd(() => require('./IllustrationView.scss'))
export class IllustrationView extends React.Component<IIllustrationViewProps, IIllustrationViewState> {
    state = { loaded: false };
    canvas = React.createRef<HTMLCanvasElement>();

    render(c?) {
        const { size } = this.props;
        const { loaded } = this.state;
        return (
            <>
                { !loaded && <Preloader/> }
                <div className={c(`container ${!loaded ? 'hidden' : ''}`)}>
                    <canvas className={c('container')} ref={this.canvas} width={size} height={size}/>
                </div>
            </>
        )
    }

    makeImageData = () => {
        const uint8ClampedArray = Uint8ClampedArray.from(this.props.colorArray);
        const imageData = new ImageData(uint8ClampedArray, 300, 300);
        const ctx: CanvasRenderingContext2D = this.canvas.current.getContext('2d');

        ctx.putImageData(imageData, 0, 0);

        this.setState({ loaded: true });
    };

    /*setImagedata = (imageData, ctx) => {
        ctx.putImageData(imageData, 0, 0);
        this.setState({ loaded: true })
    };

    makeTexture = () => {
        const { astroBody } = this.props;
        const ctx: CanvasRenderingContext2D = this.canvas.current.getContext('2d');

        if (astroBody.class === 'star') {
            TexturesGenerator.makeStarTexturesData(astroBody).then(imageData => this.setImagedata(imageData, ctx));

        } else if (astroBody.class === 'planet') {
            TexturesGenerator.makePlanetTexturesData(astroBody).then(imageData => this.setImagedata(imageData, ctx));
        } else {
            TexturesGenerator.makePlanetTexturesData(astroBody).then(imageData => this.setImagedata(imageData, ctx));
        }
    };*/

    componentDidUpdate(prevProps: Readonly<IIllustrationViewProps>, prevState: Readonly<IIllustrationViewState>, snapshot?: any): void {
        if (!this.state.loaded) {
            if( this.props.colorArray ) {
                this.props.colorArray.length !== 0 ? this.makeImageData() : false;
            }
        }
    }
}

