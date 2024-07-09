import {ADIFField, ADIFObject} from "@pilchd/fle"

function phonetic(input: string, miss: string = "something"): string {
    return [...input].map(letter => (
    {
        '/': "stroke",
        '0': "zero",
        '1': "one",
        '2': "two",
        '3': "three",
        '4': "four",
        '5': "five",
        '6': "six",
        '7': "seven",
        '8': "eight",
        '9': "nine",
        'A': "alpha",
        'B': "bravo",
        'C': "charlie",
        'D': "delta",
        'E': "echo",
        'F': "foxtrot",
        'G': "golf",
        'H': "hotel",
        'I': "india",
        'J': "juliet",
        'K': "kilo",
        'L': "lima",
        'M': "mike",
        'N': "november",
        'O': "oscar",
        'P': "papa",
        'Q': "quebec",
        'R': "romeo",
        'S': "sierra",
        'T': "tango",
        'U': "uniform",
        'V': "victor",
        'W': "whiskey",
        'X': "x-ray",
        'Y': "yankee",
        'Z': "zulu",
    }[letter.toUpperCase()] || miss)).join(' ')
}

export default function check(
    object: ADIFObject,
    fields: ADIFField[] = ["QSO_DATE", "MODE", "TIME_ON", "BAND", "FREQ", "CALL"],
    config: {[K in ADIFField]?: (value: string) => string} = {}
) {
    config = {
        "BAND": v => `antenna ${v.replace(/m/, " meters")}`,
        "CALL": v => `callsign ${phonetic(v)}`,
        "FREQ": v => `${v} megahertz`,
        "MODE": v => `working ${v}`,
        "QSO_DATE": v => `${v.substring(0, 4)}-${v.substring(4, 6)}-${v.substring(6, 8)}`,
        "TIME_ON": v => `timer ${v.substring(0, 2)}:${v.substring(2, 4)}`,
        ...config
    }

    return fields
        .map(field => object[field] ? config[field]?.(object[field] as string) : undefined)
        .filter(value => value)
        .join(' ')
}
