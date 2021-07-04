const validator = {
     isValid: (creditCardNumber) => {
      let cardSplit = creditCardNumber.split("").reverse()
      let suma = 0;
        for(let i=0; i<cardSplit.length; i++ ) {
          if(i%2==1){
            let digito=cardSplit[i]*2;
            if(digito>9){
              digito=(digito-10)+1;
            }
            suma+= digito;
          }else{
            suma+=parseInt(cardSplit[i]);
          }
        }
        return suma % 10 === 0 ? true : false;
    },
    maskify: (creditCardNumber) => {
        if(creditCardNumber.length > 4){
            let cantidad = creditCardNumber.length - 4;
        return "#".repeat(cantidad)+creditCardNumber.substr(-4);
        }else{
            return creditCardNumber
        }
      }
  };
  
  export default validator;
  