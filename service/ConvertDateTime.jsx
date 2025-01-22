import moment from "moment";
import { moveSyntheticComments } from "typescript";

// Resets the time portion of the date and formats it as MM/DD/YYYY
export const FormatDate = (timestamp) => {
    const date = new Date(timestamp);
    date.setHours(0, 0, 0, 0);
    return moment(date).format('ll'); // Return formatted date string
};

// Formats the date into MM/DD/YYYY
export const formatDateForText = (date) => {
    return moment(date).format('ll');
};

export const formatTime=(timestamp)=>{

    const date = new Date(timestamp);
    const timeString=date.toLocaleTimeString([],{
        hour:'2-digit',
        minute:'2-digit'
    })

    return timeString
}



export const getDatesRange = (startdate, endDate) => {
    const start = moment(startdate, 'll'); // Adjust format to your input
    const end = moment(endDate, 'll');
    
    if (!start.isValid() || !end.isValid()) {
      console.error('Invalid date format');
      return [];
    }
  
    const dates = [];
    
    while (start.isSameOrBefore(end)) {
      dates.push(start.format('ll')); // Format the output
      start.add(1, 'days');
    }
    
    return dates;
  };


export const GetDateRangeToDisplay =() => {

    const dateList =[];

    for(let i=0; i<=7;i++)
    {
        dateList.push({
            date:moment().add(i,'days').format('DD') ,
            day:moment().add(i,'days').format('dd') ,
            formattedDate:moment().add(i,'days').format('ll')
        })
    }
    return dateList;
}


export const GetPrevDateRangeToDisplay =() => {

    const dates =[];

    for(let i=0; i<=7;i++)
    {
        const date=moment().subtract(i,'days');

        dates.push ({
            date:date.format('DD'),
            day:date.format('dd'),
            formattedDate:date.format('ll')
        })
    }
    return dates;
}