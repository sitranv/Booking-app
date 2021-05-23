const helper = () => {
    return {
        formatPrice : (price) => {
            let priceString = ""
            while (price > 999) {
                let num = price % 1000;
                if (num < 10) {
                    num = '00' + num
                } else if (num < 100) {
                    num = '0' + num;
                }
                priceString = '.' + num + priceString;
                price = Math.floor(price/ 1000);
                if (price <= 999) {
                    priceString = price + '' + priceString;
                    break;
                }
            }
            return priceString;
        },

        formatDate : (date) => {
            let temp = new Date(date);
            return new Date(temp.setDate(temp.getDate() + 1)).toJSON().slice(0,10).split('-').reverse().join('/')
        }
    }
}

export default helper;