const dateFormatter = new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "medium",
    timeStyle: "short"
  });
  
export const formatTimestamp = (value) => dateFormatter.format(new Date(value));