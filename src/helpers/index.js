
const textCapitalize = (text) => {
    return text.charAt(0).toUpperCase() + text.slice(1);
}

const toMonthYear=(date)=>{
    if(date==="Present") return date;
    const d = new Date(date);
    const year = d.getFullYear();
    const month = d.toLocaleString('en-US', { month: 'long' });
    return month+" "+year;
}

export {textCapitalize,toMonthYear }