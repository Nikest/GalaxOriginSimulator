import { System } from 'GameModules/Astro';
import { INamesStyle, rand } from 'Services';

const ofStar = (starType) => {
    const typesOf = {
        M: 'красного карлика',
        K: 'оранжевого карлика',
        G: 'желтого карлика',
        F: 'белой звезды',
        A: 'яркой белой звезды',
        B: 'голубого гиганта',
        O: 'синего гиганта',
    };

    return typesOf[starType]
};

const starLight = (starType) => {
    const typesOf = {
        M: 'кроваво красный свет',
        K: 'мягкий оранжевый свет, похожий на лучи заходящего солнца',
        G: 'солнечный свет',
        F: 'белый свет',
        A: 'голубовато-белый',
        B: 'голубой свет, словно от дневного неба',
        O: 'необычный свет, глубокое синее сияние, словно лучи солнца пробиваются в глубине моря',
    };

    return typesOf[starType]
};

export const onColonization = (colonyShipName, system: System, names: INamesStyle) => {
    const planetOrigin = names.getPlanetName();
    const character = {
        sex: rand(0, 1),
        firstName: '',
        lastName: '',
    };
    character.firstName = character.sex ? names.getMale() : names.getFemale();
    character.lastName = names.getFamily();

    const textVariantsBegin = [
        `Отправленый ${
            ['сотни лет назад', 'очень давно', 'столетия назад'][rand(0, 2)]
        }, с планеты ${planetOrigin} корабль ${
            ['нашел свое пристанище', 'причалил', 'остановился'][rand(0, 2)]
        } в системе звезды ${ofStar(system.system.centralBody.type[0])}. 
        ${
            [
                `Это корабль под названием ${colonyShipName} с двумя тысячами человек на борту, пребывающих в состоянии анабиоза`,
                `На борту корабля, что носит название ${colonyShipName} находятся в анабиозе 2 тысячи человек`,
                `Это ${colonyShipName} - космическое судно, везущее 2 тысячи человек к их новому дому`
            ][rand(0, 2)]
        }`,
        `В бескрайних просторах вокруг ${ofStar(system.system.centralBody.type[0])} ${
            ['нашел свое пристанище', 'причалил', 'остановился'][rand(0, 2)]
        } ${
            [
                `космический корабль по имени ${colonyShipName}, везущий 2 тысячи человек в состоянии анабиоза`,
                `корабль ${colonyShipName}, везущий 2 тысячи колонистов`,
                `колониальный корабль ${colonyShipName} с двумя тысячами пассажиров на борту`
            ][rand(0, 2)]
        }. Он был запушен ${
            ['сотни лет назад', 'очень давно', 'столетия назад'][rand(0, 2)]
        } с планеты ${names.getPlanetName()}`
    ][rand(0, 1)];

    const textMiddle = [
        `${
            ['Первым проснулся', 'Первой проснулась'][character.sex]
        } ${character.firstName} ${character.lastName} и первое что ${['он увидел','она увидела'][character.sex]} это ${
            starLight(system.system.centralBody.type[0])
        } заливавший стены и пол анабиозного отсека`
    ];

    return [textVariantsBegin, textMiddle].join(('. \n'))
};
