export const MONTH_LIST = ['JANUARY','FEBRUARY','MARCH','APRIL','MAY','JUNE','JULY','AUGUST','SEPTEMBER','OCTOBER','NOVEMBER','DECEMBER']

export const sortMonthsDesc = (data) => {
    return data.sort((a, b) => {
        const indexA = MONTH_LIST.indexOf(a.month);
        const indexB = MONTH_LIST.indexOf(b.month);
        return indexB - indexA;
    });
}