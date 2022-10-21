// IMPORT DATA
import it from '../data/it.json' assert { type: "json" }
import de from '../data/de.json' assert { type: "json" }
import sr from '../data/sr.json' assert { type: "json" }
import ko from '../data/ko.json' assert { type: "json" }
import tr from '../data/tr.json' assert { type: "json" }
import pl from '../data/pl.json' assert { type: "json" }
import ic from '../data/ic.json' assert { type: "json" }
import ch from '../data/ch.json' assert { type: "json" }
import ar from '../data/ar.json' assert { type: "json" }


// GET RANDOM INDEX
const makeArr = (data, num) => {
    let arr = []
    for (let i = 0; i < num; i++) {
        arr.push(data[Math.floor(Math.random() * 500)])
    }
    return arr
}
const sendData = (lang, num) => {
    // console.log(lang)
    switch (lang) {
        case 'ko-KO':
            return makeArr(ko, num)
        case 'sr-SR':
            return makeArr(sr, num)
        case 'hu-HU':
            return makeArr(hu, num)
        case 'is-IS':
            return makeArr(ic, num)
        case 'pl-PL':
            return makeArr(pl, num);
        case 'it-IT':
            return makeArr(it, num)
        case 'de-DE':
            return makeArr(de, num)
        case 'tr-TR':
            return makeArr(tr, num)
        case 'ar-AR':
            return makeArr(ar, num)
        case 'zh-ZH':
            return makeArr(ch, num)
        default:
            return makeArr(it, num)
    }
}

export default sendData