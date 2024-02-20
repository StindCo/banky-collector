import {useTranslation} from "react-i18next";

export default function greeting() {
    const { t } = useTranslation()
    return new Date().getHours() < 16 ? t("morning") : t("afternoon")
}
