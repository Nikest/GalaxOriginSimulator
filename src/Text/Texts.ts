import { System, Star, Planet, Moon } from 'Astro';
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

export const onColonization = (colonyShipName, system: System, names: INamesStyle) => {
    const textVariantsBegin = [
        `Отправленый ${
            ['сотни лет назад', 'очень давно', 'столетия назад'][rand(0, 2)]
        }, с планеты ${names.getPlanetName()} корабль ${
            ['нашел свое пристанище', 'причалил', 'остановился'][rand(0, 2)]
        } в системе звезды ${ofStar(system.system.centralBody.type[0])}. 
        ${
            [
                `Это корабль под названием ${colonyShipName} с двумя тысячами человек на борту, пребывающих в состоянии анабиоза.`,
                `На борту корабля, что носит название ${colonyShipName} находятся в анабиозе 2 тысячи человек.`,
                `Это ${colonyShipName} - космическое судно, везущее 2 тысячи человек к их новому дому.`
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

    return textVariantsBegin
};
