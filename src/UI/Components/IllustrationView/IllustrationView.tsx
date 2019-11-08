import * as React from 'react';
import { cd } from 'Services';
import { Preloader } from 'UI';

import { TexturesGenerator } from 'GameModules/Services';


interface IIllustrationViewProps {
    size: number,
    astroBody: any,
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

    setImagedata = (imageData, ctx) => {
        ctx.putImageData(imageData, 0, 0);
        this.setState({ loaded: true })
    };

    componentDidMount(): void {
        const { astroBody } = this.props;
        const ctx: CanvasRenderingContext2D = this.canvas.current.getContext('2d');

        if (astroBody.class === 'star') {
            TexturesGenerator.makeStarTexturesData(astroBody).then(imageData => this.setImagedata(imageData, ctx));

        } else if (astroBody.class === 'planet') {
            TexturesGenerator.makePlanetTexturesData(astroBody).then(imageData => this.setImagedata(imageData, ctx));

        }
    }
}

