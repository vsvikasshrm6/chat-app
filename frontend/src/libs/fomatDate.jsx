export const formatMessageDate  = (date)=>new Date(date).toLocaleDateString("en-US",
  {
    hours : "2-digit",
    minute : "2-digit",
    hour12 : false,
  }
) 
