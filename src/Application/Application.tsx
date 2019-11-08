import * as React from 'react';

import { ErrorHandler } from './ErrorHandler';
import { Initializer } from './Initializer';
import { Core } from 'UI';

export const Application = function () {
    return (
        <ErrorHandler>
            <Initializer>
                <Core/>
            </Initializer>
        </ErrorHandler>
    )
};
