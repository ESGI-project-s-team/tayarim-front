import React, {useEffect, useState} from 'react';

interface DateFormatterProps {
    date: string;
    theLanguage: string;
}

const DateFormatterEnFr: React.FC<DateFormatterProps> = ({date, theLanguage}) => {
    const [formattedDate, setFormattedDate] = useState('');

    const formatDate = (date: string, language: string) => {
        const dateObject = new Date(date);
        const year = dateObject.getFullYear();
        const month = (`0${dateObject.getMonth() + 1}`).slice(-2); // Adding leading zero
        const day = (`0${dateObject.getDate()}`).slice(-2); // Adding leading zero

        if (language === 'en') {
            return `${year}/${month}/${day}`; // yyyy/mm/dd
        } else {
            return `${day}/${month}/${year}`; // dd-mm-yyyy
        }
    };

    useEffect(() => {
        const formatted = formatDate(date, theLanguage);
        setFormattedDate(formatted);
    }, [date, theLanguage]);

    return <span>{formattedDate}</span>;
};

export default DateFormatterEnFr;
