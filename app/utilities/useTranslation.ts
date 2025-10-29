import en from '../translations/en.json';

type TranslationKeyType = keyof typeof en;

const translateKey: (key: string) => string = (key) => {
    const typedKey = key as TranslationKeyType;
    if (Object.keys(en).includes(typedKey)) {
        return en[typedKey];
    }
    return en['UNKOWN_KEY'];
}

export const useTranslation = () => {
    const translate : (key: string) => string = (key) =>
    {
        return translateKey(key);
    }

    return {translate}
}