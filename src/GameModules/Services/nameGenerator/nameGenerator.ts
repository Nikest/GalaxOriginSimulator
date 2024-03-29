import { rand } from 'Services';

const vowel = ['а', 'о', 'у', 'и', 'е', 'э'];
const consonant = ['б', 'в', 'г', 'д', 'б', 'в', 'г', 'д', 'ж', 'з', 'й', 'к', 'л', 'м', 'н', 'л', 'м', 'н', 'п', 'р', 'с', 'т', 'п', 'р', 'с', 'т', 'ф', 'ч', 'ц', 'ш'];
const ugly: any = [
    ['пм', 'емпа'],
    ['шн', 'нш'],
    ['рф', 'раф'],
    [/^пг/, 'г'],
    [/^гп/, 'п'],
    [/^пф/, 'ф'],
    [/^пн/, 'пон'],
    [/^тд/, 'тод'],
    ['йа', 'я'],
    [/йу/g, 'ю'],
    ['увп', 'ув'],
    ['евп', 'ев'],
    ['цй', 'йц'],
    ['цч', 'ч'],
    ['тц', 'ц'],
    ['пуи', 'пи'],
    ['ипм', 'им'],
    ['ипн', 'ин'],
    ['ипд', 'ид'],
    ['ипб', 'иб'],
    ['опм', 'ом'],
    ['опн', 'он'],
    ['опд', 'од'],
    ['опб', 'об'],
    ['бп', 'б'],
    ['дп', 'д'],
    ['еэ', 'эе']
];

export const nameGenerator = function() {
    return Array(rand(1, 3)).fill(0).map(() => {
        const syllable = Array(rand(1, 3)).fill(0).map(() => {
            return consonant[rand(0, consonant.length - 1)]
        });

        const vowelPosition = rand(1, syllable.length - 1);

        const vowelLength = rand(1, 10) > 3 ? 1 : 2;

        syllable[vowelPosition] = Array(vowelLength).fill(0).map(() => vowel[rand(0, vowel.length - 1)]).join('');

        return syllable.join('');
    }).join('').split('').fill(null, rand(3, 8)).join('');
};

function syllable() {
    const syllableTemplate = Array(rand(1, 3)).fill(0).map(() => {
        return consonant[rand(0, consonant.length - 1)]
    });

    const vowelPosition = rand(1, syllable.length - 1);

    const vowelLength = rand(1, 10) > 3 ? 1 : 2;

    syllableTemplate[vowelPosition] = Array(vowelLength).fill(0).map(() => vowel[rand(0, vowel.length - 1)]).join('');

    return syllableTemplate.join('');
}

function ending(fem?: boolean) {
    const vowelTemplate = fem ? ['а', 'е', 'ая'] : vowel;
    let endingTemplate = Array(rand(1, 3)).fill(0).map(() => {
        return consonant[rand(0, consonant.length - 1)]
    });

    const vowelLength = rand(1, 10) > 3 ? 1 : 2;

    if (endingTemplate.length === 2) {
        const rnd = rand(0, 1);
        endingTemplate[fem ? 1: rnd] = Array(vowelLength).fill(0).map(() => vowelTemplate[rand(0, vowelTemplate.length - 1)]).join('');
    }

    if (endingTemplate.length === 3) {
        const rnd = rand(0, 1);

        if (rnd || fem) {
            endingTemplate = endingTemplate.map((s: string, i): string => {
                if (i === 1) {
                    return s
                }

                return vowelTemplate[rand(0, vowelTemplate.length - 1)]
            })
        } else {
            endingTemplate = endingTemplate.map((s: string, i): string => {
                if (i === 1) {
                    return vowel[rand(0, vowel.length - 1)]
                }

                return s
            })
        }
    }

    if (endingTemplate.length === 1 && fem) {
        endingTemplate[0] = vowelTemplate[rand(0, vowelTemplate.length - 1)];
    }

    return endingTemplate.join('');
}

function prefix() {
    const prefixTemplate = [0, 0].map(() => {
        return consonant[rand(0, consonant.length - 1)]
    });

    const rnd = rand(0, 1);
    prefixTemplate[rnd] = vowel[rand(0, vowel.length - 1)];

    return prefixTemplate.join('')
}

function wordChecking(word: string) {

    let wordRes: string[] = word.split('');

    let countVowel = 0;
    let countConsonant = 0;
    wordRes = wordRes.map((s) => {
        const checkVovel = !!vowel.find(v => v === s);
        const checkConsonant = !!consonant.find(v => v === s);

        countVowel = checkVovel ? countVowel + 1 : 0;
        countConsonant = checkConsonant ? countConsonant + 1 : 0;

        if (countVowel >= 3) {
            return null
        }

        if (countConsonant >= 3) {
            return null
        }

        return s
    });

    countConsonant = 0;
    wordRes = wordRes.map((s, i): string => {
        if (i < wordRes.length - 2) {
            return s
        }
        const check = consonant.find(sc => sc === s);
        countConsonant = check ? countConsonant + 1 : 0;

        if (countConsonant === 2) {
            return null
        }

        return s
    });

    if (wordRes[0] === wordRes[1]) {
        wordRes[1] = null;
    }

    let wordResSTR = wordRes.join('');

    ugly.forEach((keys) => {
        wordResSTR = wordResSTR.replace(keys[0], keys[1])
    });


    return wordResSTR.split('').map((s, i) => i === 0 ? s.toUpperCase() : s).join('')
}

function addSuffix(root: string, suffixes: any[]) {
    const variant: number = rand(1, 4);
    const sL = suffixes.length;
    const suffix = suffixes[rand(0, sL - 1)];

    if (variant === 2) {
        return  root + suffix;
    }

    if (variant === 3) {
        const rootArray = root.split('');
        let result: any = rootArray.filter((s, i) => {
            if (i < rootArray.length - suffix.length) {
                return s
            }

            return false;
        });

        result = [].concat(result, suffix);

        return result.join('')
    }

    return root;
}

export interface INamesStyle {
    getFemale(): string;
    getMale(): string;
    getFamily(): string;
    getPlanetName(): string;
    getStarName(): string;
}

export const getNamesInStyle = function (count: number = 100): INamesStyle {
    const maleEnding = ending();
    const femaleEnding = ending(true);
    const prefixes = Array(10).fill(0).map(() => prefix());
    const roots = Array(count).fill(0).map(() => nameGenerator());
    const suffixes = Array(3).fill(0).map(() => syllable());

    const planetMale = rand(0, 100);
    const starMale = rand(0, 100);

    function randomRoot() {
        return roots[rand(0, roots.length - 1)]
    }

    const getFemale = function () {
        const word = (rand(0, 1) ? prefixes[rand(0, prefixes.length - 1)] : '') + randomRoot() + femaleEnding;
        return wordChecking(word);
    };

    const getMale = function () {
        const word = (rand(0, 1) ? prefixes[rand(0, prefixes.length - 1)] : '') + randomRoot() + maleEnding;
        return wordChecking(word);
    };

    const getFamily = function () {
        const word = randomRoot() + (rand(0, 1) ? randomRoot() : '');
        return wordChecking(word);
    };

    const getPlanetName = function () {
        const word = addSuffix(randomRoot(), suffixes) + (rand(0, 100) <= planetMale ? maleEnding : femaleEnding);
        return wordChecking(word);
    };

    const getStarName = function () {
        const word = addSuffix(randomRoot(), suffixes) + (rand(0, 100) <= starMale ? maleEnding : femaleEnding);
        return wordChecking(word);
    };

    return { getFemale, getMale, getPlanetName, getStarName, getFamily }
};
