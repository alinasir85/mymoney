export const MONTH_LIST = ['January','February','March','April','May','June','July','August','September','October','November','December']

export const sortMonthsDesc = (data) => {
    return data.sort((a, b) => {
        const indexA = MONTH_LIST.indexOf(a.month);
        const indexB = MONTH_LIST.indexOf(b.month);
        return indexB - indexA;
    });
}