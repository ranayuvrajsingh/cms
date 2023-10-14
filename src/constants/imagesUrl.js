import {AppLogo, CloseIcon} from "../assets/svgs";

const iconsBaseUrl = '../../../../../assets/icons';
const imagesBaseUrl = '../../../../../assets/images';

export const imagesUrl = {
    icons: {
        //main header
        dashboard: `${iconsBaseUrl}/dashboard.svg`,
        city: `${iconsBaseUrl}/city.svg`,
        content: `${iconsBaseUrl}/content.svg`,
        category: `${iconsBaseUrl}/category.svg`,
        component: `${iconsBaseUrl}/component.svg`,
        bell: `${iconsBaseUrl}/bell.svg`,

        //
        cancelBlackBorder: `${iconsBaseUrl}/cancel.svg`,
        cancelBlackBackground: <CloseIcon/>,
        cancelWhite: <CloseIcon width={18} height={18} color={'#C9C4C4FF'}/>,
        company: `${iconsBaseUrl}/company.svg`,
        caretDown: `${iconsBaseUrl}/caret-down.svg`,
        cancel: `${iconsBaseUrl}/cancel.svg`,
        checkCircleBlue: `${iconsBaseUrl}/check-circle-blue.svg`,
        checkCircle: `${iconsBaseUrl}/check-circle.svg`,
        checkCirleLight: `${iconsBaseUrl}/check-circle-light.svg`,
        warning: `${iconsBaseUrl}/warning.svg`,
        cloudUpload: `${iconsBaseUrl}/cloud-upload.svg`,
        backArrow: `${iconsBaseUrl}/back-arrow.svg`,
        appLogo: <AppLogo width={100} height={40}/>,
    },
    images: {
        companyLogo: `${imagesBaseUrl}/company_logo.png`,
        noCompanies: `${imagesBaseUrl}/no_companies.svg`,
    },
};
