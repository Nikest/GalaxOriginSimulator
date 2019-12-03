const palettes = {
    sea: {
        R: 46,
        G: 70,
        B: 102,
    },
    coast: [
        {
            R: 79,
            G: 134,
            B: 125,
        },
        {
            R: 63,
            G: 103,
            B: 114,
        }
    ],
    snow: {
        R: 245,
        G: 245,
        B: 245,
    },
    desert: [
        {
            R: 244,
            G: 228,
            B: 206,
        },
        {
            R: 236,
            G: 210,
            B: 187,
        },
        {
            R: 236,
            G: 222,
            B: 196,
        },
        {
            R: 209,
            G: 189,
            B: 133,
        },
    ],
    rocky: [
        {
            R: 129,
            G: 116,
            B: 107,
        },
        {
            R: 125,
            G: 104,
            B: 100,
        },
        {
            R: 135,
            G: 116,
            B: 101,
        },
        {
            R: 130,
            G: 109,
            B: 104,
        },
    ],
    regolith: [
        {
            R: 136,
            G: 134,
            B: 132,
        },
        {
            R: 127,
            G: 127,
            B: 127,
        },
        {
            R: 106,
            G: 106,
            B: 106,
        },
        {
            R: 112,
            G: 112,
            B: 112,
        },
    ]
};

function surfacePalette(key) {
    return palettes[key]
}

module.exports = { surfacePalette };

